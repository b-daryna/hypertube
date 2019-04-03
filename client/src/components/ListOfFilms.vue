<template>
  <div class="container">
    <div class="films">
      <div class="clearfix">
        <film-item v-for="(filmItem, index) in films" :key="index" :filmItem="filmItem" :index="index"></film-item>
      </div>
    </div>

  </div>

</template>

<script>
  import FilmItem from './FilmItem.vue'

  export default {
    name: 'ListOfFilms',
    props: ['films'],
    components: {
      FilmItem
    }
  }
</script>

<style>
  .clearfix:after {
    content: " ";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }

  .container {
    width: 100%;
    color: #4C5263;
    padding: 2em;
  }

  .films {
    width: 100%;
  }

</style>
