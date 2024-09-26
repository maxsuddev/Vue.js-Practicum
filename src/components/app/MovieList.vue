<template>
<BoxComponent>
<ul class="list-group  d-flex">
  <MovieListItem v-for="movie in movies" :movie="movie"
                 :key="movie.id"
                 @onToggle="$emit('toggle', $event)"
                  @onDelete="$emit('onDelete', movie.id)"/>
</ul>
</BoxComponent>
</template>

<script>


import MovieListItem from "@/components/app/MovieListItem.vue";

export default {
  components: { MovieListItem},

  props:{
    movies:{
      type: Array,
      required: true
    }
  },
}
</script>
<style scoped>


</style>