<template>
    <div class="movieItem">
        <div class="col-md-10" style="margin: 0 auto;">

            <div class="col-sm-4 fl-left">
                <img :src="require('@/assets/torrent_files/' + movie.image)" class="image"></div>
            <div class="col-sm-7 fl-right">
                <h2>{{ movie.title }}</h2>
                <p>{{movie.description}}</p>
                <p>
                    <span><b>Year:</b> {{movie.year}}</span>
                    <span><i class="fas fa-star" style="color: yellow"></i> {{movie.rating}}</span>
                </p>
                <p><b>Cast:</b> {{movie.cast}}</p>
                <p><b>Genre:</b> {{movie.genre}}</p>
                <modal name="hello-world">
                    <vue-plyr>
                        <video poster="poster.png" src="video.mp4">
                            <source src="video-720p.mp4" type="video/mp4" size="720">
                            <source src="video-1080p.mp4" type="video/mp4" size="1080">
                            <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default>
                        </video>
                    </vue-plyr>
                </modal>
                <button @click="show">Watch movie <i class="fas fa-play"></i>

                </button>

            </div>
        </div>
    </div>

</template>

<script>
  import {mapGetters} from 'vuex'

  const movieService = require('../../services/MovieService')

  export default {
    name: 'MovieDescription',
    computed: {
      ...mapGetters({
        movies: 'getAllMovies'
      }),
    },
    data() {
      return {
        movie: this.$store.state.films[this.$route.params.id],
        video: {
          sources: [{
            src: '../assets/img/trailers.mp4',
            type: 'video/mp4'
          }],
          options: {
//            autoplay: true,
            volume: 0.6,
//            poster: 'http://covteam.u.qiniudn.com/poster.png'
          }
        }
      }
    },
    methods: {
      show() {
        this.$modal.show('hello-world');
      },
      hide() {
        this.$modal.hide('hello-world');
      }
    }

  }
</script>

<style scoped>

    h2 {
        color: #42b983;
    }

    img {
        max-height: none;
    }

    .movieItem {
        overflow: auto;
    }

    p {
        color: #fff;
    }

    button {
        border: 1px solid #2c504c;
        padding: 0.5em;
    }

    button:hover {
        background-color: lightgrey;
    }

    .v--modal-overlay {
        background: rgba(0, 0, 0, 0.8);
    }

    .v--modal {
        left: 0;
        width: 60%;
        min-height: 30em;
        margin: 0 auto;
    }


</style>
