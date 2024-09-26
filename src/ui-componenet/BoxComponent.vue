<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BoxComponent',
}
</script>
<style scoped>
.box{
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 4px;
  background-color: #fcfaf5;
  boreder-radius: 4px;
  box-shadow: 15px 15px 15px rgb(0,0,0,0.15);
}
</style>