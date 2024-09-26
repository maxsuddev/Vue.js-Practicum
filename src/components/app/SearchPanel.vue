<template>
  <BoxComponent>
<Input placeholder="Kinolarni qidirish"
       v-model="term"
       @input="changeData"
/>
  </BoxComponent>
</template>


<script>
import BoxComponent from "@/ui-componenet/BoxComponent.vue";
import Input from "@/ui-componenet/Input.vue";

export default {
  components: {Input, BoxComponent},
  props: {
    updateTerm: {
      type: Function,
      required: true,
    },

  },
  data() {
    return {
      term: ''
    }
  },
  methods: {
    changeData(event) {
      this.term = event.target.value;
      this.updateTerm(this.term);
    }
  }

}
</script>
<style scoped>

</style>