<template>
    <router-link :to="'/movies/' + index" :key="$route.fullPath">

        <div class="elem" @click="showCurrentMovie(filmItem)">
            <div>
                <img :src="require('@/assets/torrent_files/' + filmItem.image)" class="image"></div>
            <p class="film-title">{{filmItem.title}}</p>
            <p class="year">
                <span>year: {{filmItem.year}}</span><br>
                <span><i class="fas fa-star"></i> {{filmItem.rating}}</span>
            </p>

        </div>
    </router-link>

</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'FilmItem',
        props: ['filmItem', 'index'],
        data() {
            return {}
        },
        methods: {
            ...mapActions([
                'currentMovie'
            ]),

            showCurrentMovie(filmItem) {
                this.currentMovie(filmItem)
            }
        }
    }

</script>

<style>
    .elem {
        float: left;
        width: 16.5%;
        padding: 0.5em 0.5em;
        margin-bottom: 1em;
        background-color: #1b171b;
        border: 2px solid #302930;
    }

    .elem > div {
        height: 20em;
    }

    .elem:hover {
        border: 2px solid #fff;
        cursor: pointer;
    }

    .image {
        display: block;
        width: 100%;
        max-height: 30em;
    }

    .film-title {
        font-weight: bold;
        margin: 0.35em 0;
        height: 2.5em;
    }

    .year {
        margin: 0.35em 0;
        font-size: 0.9em;
        color: #143928
    }

    p {
        color: #42b983;
    }

</style>
