<template>
    <div class="movies">
        <v-toolbar>
            <v-spacer>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>
                    </div>
                </div>
            </v-spacer>
            <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                <v-icon>menu</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer
                temporary
                v-model="rightDrawer"
                app
        >
            <v-list>
                <h4 class="col-sm-12">Filter by:</h4>
                <v-list-tile>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" @click="dropdownToggle">
                            Genre
                        </button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item">Comedy</li>
                            <li class="dropdown-item">Horror</li>
                            <li class="dropdown-item">Drama</li>
                        </ul>
                    </div>
                </v-list-tile>
                <v-list-tile>
                    <div class="dropdown">
                        <button class="btn btn-secondary slider-button" type="button">
                            Year:
                        </button>
                        <div class="slidecontainer">
                            <span>{{selectedYear}}</span>
                            <input type="range" min="1960" max="2018" value="2018" class="slider" id="myYear" @change="updateYear">
                        </div>
                    </div>
                </v-list-tile>
                <v-list-tile>
                    <div class="dropdown">
                        <button class="btn btn-secondary slider-button" type="button">
                            Rating:
                        </button>
                        <div class="slidecontainer">
                            <span><i class="fas fa-star"></i>{{selectedRating}}</span>
                            <input type="range" min="1" max="10" value="7" class="slider" id="myRating" @change="updateRating">
                        </div>
                    </div>
                </v-list-tile>
                <h4 class="col-md-12">Sort by:</h4>

                <v-list-tile>
                    <div class="dropdown">
                        <button class="btn btn-secondary" type="button">
                            Name
                        </button>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-secondary" type="button">
                            Rating
                        </button>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-secondary" type="button">
                            Year
                        </button>
                    </div>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <list-of-films :films="getAllMovies"></list-of-films>

    </div>
</template>

<script src="./allMovies.js"></script>

<style>
    h4 {
        font-weight: normal;
        color: #42b983;
        float: left;
    }

    ul {
        list-style-type: none;
        padding: 0;
        z-index: 2;
    }

    a {
        color: #42b983;
    }

    .slider-button:hover {
        cursor: default;
        background-color: #6c757d;
    }

    .movies > .v-toolbar {
        width: 90%;
        margin: 0 auto;
    }

</style>
