<template>
  <div class=" font monospace">
    <div class="content">
      <AppInfo  :moviesCount="movies.length" :filterMovies="movies.filter(c => c.favourite).length" />
      <div class="search-panel">
        <SearchPanel :updateTerm="updateTerm" />
        <AppFilter :filterMovies="filterMovies" :filterName="filter" />
      </div>
          <MovieList :movies="onFilter(onSearch(movies, term), filter)"  @toggle="onToggleHandler"  @onDelete="onDelete" />
        <MovieForm @create="create"/>

    </div>
  </div>
</template>

<script>

import AppInfo from "@/components/app/AppInfo.vue";
import SearchPanel from "@/components/app/SearchPanel.vue";
import AppFilter from "@/components/app/AppFilter.vue";
import MovieList from "@/components/app/MovieList.vue";
import MovieForm from "@/components/app/MovieForm.vue";
export default {
  components: {
    MovieForm,
    MovieList,
    AppFilter,
    SearchPanel,
    AppInfo
  },
  data (){
    return {
      movies: [
        {
          name: 'jbvjfbknf',
          viewers: 1234,
          favourite: true,
          like:false,
          id: 1
        },
        {
          name: 'qwer',
          viewers: 134,
          favourite:false,
          like:false,
          id: 2
        },  {
          name: 'ekdnk',
          viewers: 124,
          favourite:false,
          like:true,
          id: 3
        },
        {
          name: 'asdff',
          viewers: 34,
          favourite:true,
          like:true,
          id: 4
        }
      ],
      term: '',
      filter: 'all',
    }
  },
  methods: {

    create(item){
      this.movies.push(item);
    },

    onToggleHandler({ id, prop }) {
      this.movies = this.movies.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }; // Bu - Spread operatori (...) obyekt yoki massivning barcha elementlarini yangi obyekt yoki massiv ichiga "tarqatish" imkonini beradi.
        }
        return item;
      });
    },
    onDelete(id) {
      this.movies = this.movies.filter(a => a.id !== id);
    },
    onSearch(array, term) {
      if (term.length === 0){
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
    }
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