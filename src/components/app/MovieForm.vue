<template>
<BoxComponent>
  <h3>Yangi kino qoshish</h3>
    <form  class="add-movie d-flex" @submit.prevent>
        <Input type="text"
               class=" new-add-movie"
               placeholder="Kino qo'shish"
               v-model="name"
        />
      <Input type="number"
             class=" new-add-movie"
             placeholder="Kino qo'shish2"
             v-model="viewers"
      />
        <PrimaryButton type="submit" class=" btn-outline-dark" @click="addMovies">Qoshish</PrimaryButton>
    </form>
</BoxComponent>
</template>

<script>

export default {
  data () {
    return {
      name: "",
      viewers: "",
    }
  },

  methods : {
    addMovies(){
      if (!this.name || !this.viewers) return
        const newMovies = {
          name: this.name,
          viewers: this.viewers,
          favourite: false,
          like: false,
          id: Date.now(),
        }

    this.$emit('create', newMovies);
      this.name = ''
      this.viewers = ''
    }
  }
}
</script>
<style scoped>

</style>