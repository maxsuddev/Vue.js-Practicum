<template>
  <div class="font monospace">
    <div class="content">
      <AppInfo :moviesCount="movies.length" :filterMovies="movies.filter(c => c.favourite).length" />
      <div class="search-panel">
        <SearchPanel :updateTerm="updateTerm" />
        <AppFilter :filterMovies="filterMovies" :filterName="filter" />
      </div>
      <BoxComponent v-if="!movies.length && !is_loading">
        <p class="text-center fs-3 text-danger">No data found</p>  
      </BoxComponent>
      <BoxComponent v-else-if="is_loading">
        <LoaderComponent />
      </BoxComponent>
      <MovieList
        v-else
        :movies="onFilter(onSearch(movies, term), filter)"
        @toggle="onToggleHandler"
        @onDelete="onDelete"
      />
      <BoxComponent>
        <nav aria-label="pagination">
          <ul class="pagination">
            <li v-for="pageNumber in totalPage"
              :key="pageNumber"
              :class="{'active': pageNumber === page}"
              @click="changePage(pageNumber)">
              <span class="page-link">{{ pageNumber }}</span>
            </li>
          </ul>
        </nav>
      </BoxComponent>
      <MovieForm @createMovies="createMovies" />
    </div>
  </div>
</template>

<script>
import AppInfo from "@/components/app/AppInfo.vue";
import SearchPanel from "@/components/app/SearchPanel.vue";
import AppFilter from "@/components/app/AppFilter.vue";
import MovieList from "@/components/app/MovieList.vue";
import MovieForm from "@/components/app/MovieForm.vue";
import axios from "axios";

export default {
  components: {
    MovieForm,
    MovieList,
    AppFilter,
    SearchPanel,
    AppInfo,
  },
  data() {
    return {
      movies: [],
      term: '',
      filter: 'all',
      is_loading: false,
      page: 1,
      totalPage: 0,
      limit: 10,
      totalMovies: 0, 
    };
  },
  methods: {

    async createMovies(item) {
  try {
    const result = await axios.post('http://127.0.0.1:8000/api/movies', item);
    console.log(result.data.data);
    this.movies.push(result.data.data);

    this.fetchMovies();
  } catch (error) {
    alert(error)
    }
},

    onToggleHandler({ id, prop }) {
      this.movies = this.movies.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      });
    },
    async onDelete(id) {
      try{
        console.log(id)
        const result = await axios.delete( `http://127.0.0.1:8000/api/movies/${id}`);
        console.log(result)
        this.movies = this.movies.filter(a => a.id !== id);
      }catch(error){
        alert(error)
      }
    },
    onSearch(array, term) {
      if (term.length === 0) {
        return array;
      }
      return array.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
    },
    updateTerm(term) {
      this.term = term;
    },
    onFilter(array, filter) {
      switch (filter) {
        case 'popular':
          return array.filter(c => c.like);
        case 'mostViewers':
          return array.filter(c => c.viewers >= 500);
        default:
          return array;
      }
    },
    filterMovies(filter) {
      this.filter = filter;
    },
    async fetchMovies() {
      this.is_loading = true;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/movies", {
          params: {
            _limit: this.limit,
            _page: this.page,
          }
        });
        this.totalPage = Math.ceil(response.data.data.total / this.limit);
        this.movies = response.data.data.data;
        this.totalMovies = response.data.data.total; // Total movie count
      } catch (error) {
        alert(error.message);
      } finally {
        this.is_loading = false;
      }
    },
    changePage(page) {
      this.page = page;
    },
  },
  watch: {
    page (){
    this.fetchMovies();
    }

  },
  mounted() {
    this.fetchMovies();
  },

};
</script>

<style>
.content {
  width: 1000px;
  min-height: 700px;
  background-color: white;
  margin: 0 auto;
  padding: 5rem 0;
}
.search-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  box-shadow: 15px 15px 15px rgb(0, 0, 0, 0.15);
}
</style>
