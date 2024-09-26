<template>
<div class="btn-group">
  <PrimaryButton v-for="btn in filterButton" :key="btn.name"
          class="btn"
          :class="[filterName === btn.name ? ' btn-dark' : ' btn-outline-dark']"
          @click="getFilterMovies(btn.name)"
          type="button">
          {{ btn.title }}
  </PrimaryButton>
</div>
</template>
<script>

export default {
  props: {
    filterMovies: {
      type: Function,
      required: true,
    },
    filterName: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      filter: "",
      filterButton: [
        {
          title: "Barcha kinolar",
          name: "all",
        },
        {
          title: "Mashxur  kinolar",
          name: "popular",
        },  {
          title: "Ko'p ko'ri'gan kinolar",
          name: "mostViewers",
        },

      ]
    }
  },
  methods: {
    getFilterMovies(filter) {
      this.fiter = filter
      this.filterMovies(this.fiter)
    }
  }
}
</script>
<style scoped>

</style>