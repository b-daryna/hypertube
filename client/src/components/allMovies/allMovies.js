import {mapGetters} from 'vuex'
import ListOfFilms from '../ListOfFilms.vue'
import $ from 'jquery'

export default {
    name: 'AllMovies',
    data() {
        return {
            selectedYear: '',
            selectedRating: '',
            rightDrawer: false,

        }
    },
    computed: {
        ...mapGetters([
            'getAllMovies'
        ])
    },
    mounted: function () {
        this.updateYear();
        this.updateRating()
    },
    methods: {
        dropdownToggle(e) {
            let style = e.target.nextElementSibling.style.display;
            if (!style || style === 'none') {
                e.target.nextElementSibling.style.display = 'block'
            } else {
                e.target.nextElementSibling.style.display = 'none'
            }
        },
        updateYear() {
            this.selectedYear = $('#myYear').val()
        },
        updateRating() {
            this.selectedRating = $('#myRating').val()
        }
    },
    components: {
        ListOfFilms
    }
}

//  $.ajax({
//    url: 'https://archive.org/details/moviesandfilms',
//    method: 'GET',
//    success: function (response) {
//      $('.some-selector').html(response)
//    }
//  })
