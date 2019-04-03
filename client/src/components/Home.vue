<template>
  <div>
    <video autoplay muted loop id="myVideo">
      <source src="../assets/img/trailers.mp4" type="video/mp4">
    </video>
  </div>

</template>

<script>
  export default {
    name: 'Home'
  }
</script>

<style scoped>
  #myVideo {
    position: fixed;
    right: 0;
    top: 64px;
    min-width: 100%;
    min-height: 100%;
  }

</style>
