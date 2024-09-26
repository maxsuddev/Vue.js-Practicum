<template>
  <BoxComponent>
    <h1>Barcha kinolar soni : {{ moviesCount }}</h1>
    <h1>Ko'rilgan kinolar soni : {{ filterMovies }}</h1>
  </BoxComponent>
</template>

<script>
export default {
  props: {
    moviesCount:{
      type: Number,
      required: true,
    },
    filterMovies: {
      type: Number,
      required: true
    }
  }

}
</script>
<style scoped>
.app-info {


}
</style>