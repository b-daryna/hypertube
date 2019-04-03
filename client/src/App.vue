<template>
    <v-app>
        <v-toolbar>
            <a href="/#/"><img id="logo" src="./assets/img/logo.png"/></a>
            <v-toolbar-title>
                <span class="v-btn__content">HYPERTUBE</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn v-if="$store.state.isUserLoggedIn" flat to="/movies">Movies</v-btn>
                <v-btn v-if="$store.state.isUserLoggedIn" flat to="/profile">Profile</v-btn>
                <v-btn v-if="!$store.state.isUserLoggedIn" flat to="/login">Login</v-btn>
                <v-btn v-if="!$store.state.isUserLoggedIn" flat to="/register">Sign up</v-btn>
                <v-btn v-if="$store.state.isUserLoggedIn" flat @click="logout">Logout</v-btn>
                <v-btn icon>
                    <v-container fluid grid-list-xl>
                        <v-layout wrap align-center>

                            <v-flex xs12 sm6 d-flex>
                                <!--<v-select-->
                                        <!--:items="items"-->
                                        <!--label="Outline style"-->
                                        <!--outline-->
                                <!--&gt;</v-select>-->
                            </v-flex>

                        </v-layout>
                    </v-container>
                    <!--<v-icon>En</v-icon>-->
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-content>
            <router-view class="template"/>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
//    import vSelect from 'vue-select'

    export default {
        name: 'App',
        components: {
//            vSelect
        },
      methods: {
          logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({path: '/'})
          }
      },
        data() {
            return {
                fixed: false,
                items: ['En', 'Fr', 'Ru', 'Ukr']
            }
        }
    }
</script>
