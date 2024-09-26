<template>
  <div class=" font monospace">
    <div class="content">
      <AppInfo  :moviesCount="movies.length" :filterMovies="movies.filter(c => c.favourite).length" />
      <div class="search-panel">
        <SearchPanel :updateTerm="updateTerm" />
        <AppFilter :filterMovies="filterMovies" :filterName="filter" />
      </div>
          <MovieList :movies="onFilter(onSearch(movies, term), filter)"  @toggle="onToggleHandler"  @onDelete="onDelete" />
      <div v-if="filter === 'all'">Filter</div>
        <MovieForm @create="create" v-else="filter === 'popular'" />

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
import PrimaryButton from "@/ui-componenet/PrimaryButton.vue";

export default {
  components: {
    PrimaryButton,
    MovieForm,
    MovieList,
    AppFilter,
    SearchPanel,
    AppInfo
  },
  data (){
    return {
      movies: [

      ],
      term: '',
      filter: 'all',
    }
  },
  methods: {

    create(item) {
      this.movies.push(item);
    },

    onToggleHandler({id, prop}) {
      this.movies = this.movies.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}; // Bu - Spread operatori (...) obyekt yoki massivning barcha elementlarini yangi obyekt yoki massiv ichiga "tarqatish" imkonini beradi.
        }
        return item;
      });
    },
    onDelete(id) {
      this.movies = this.movies.filter(a => a.id !== id);
    },
    onSearch(array, term) {
      if (term.length === 0) {
        return array;
      }
      return array.filter(c => c.name.toLowerCase().indexOf(term) > -1);
    },
    updateTerm(term) {
      this.term = term
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
      this.filter = filter
    },
    async fetchMovies() {
      try {
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=20");
        this.movies = data.map(item => ({
          id: item.id,
          name: item.title,
          like: false,
          favourite: false,
          viewers: item.id * 23,
        }));

      } catch (error) {
        alert(error.message)
      }
    },

  },
  mounted() {
    this.fetchMovies();
  }
}
</script>
<style>

.content{
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
  box-shadow: 15px 15px 15px rgb(0,0,0,0.15);

}
</style>/