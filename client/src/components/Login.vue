<template>
    <div>
        <panel title="Login">
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Email</label>
                <div class="col-sm-8">
                    <input type="email" class="form-control" placeholder="Email" name="email" v-model="email"/>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" placeholder="Password" name="passwd"
                           v-model="password"/>
                </div>
            </div>
            <div class="m-b row" style="padding-left: 15px">
                <span href="#">If you're not registered please </span>
                <a href="/#/register" class="button" style="margin-left: 1em">Sign up</a>
            </div>
            <div class="m-b row">
                <a class="col-sm-4 col-sm-offset-8" href="#">Forgot password?</a>
            </div>

            <div class="field has-text-right row">
                <v-btn color="success" class="button submit" type="button" @click="login({path: '/movies'})">Submit</v-btn>
            </div>
        </panel>
    </div>

</template>

<script>
  import AuthenticationService from '../../services/AuthenticationService'
  import Panel from './Panel'

  export default {
    name: 'Login',
    components: {
      Panel
    },
    data() {
      return {
        password: '',
        email: '',
        error: null
      }
    },
    methods: {
      async login(route) {
        try {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push(route)
//          this.$router.push({
//            name: 'songs'
//          })
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
</script>
