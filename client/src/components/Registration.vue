<template>
    <div>
        <!-- name -->
        <panel title="Registration Form">

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Login</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Login" name="login" v-model="form.login" autocomplete="off">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">First Name</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="First Name" name="name" v-model="form.name" autocomplete="off">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Last Name</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Last Name" name="lastName" v-model="form.lastName" autocomplete="off">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Email</label>
                <div class="col-sm-8">
                    <input type="email" class="form-control" placeholder="email@example.com" name="email" v-model="form.email" autocomplete="off">
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" placeholder="Password" name="passwd" v-model="form.password" autocomplete="off">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Confirm Password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" autocomplete="off">
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-12 col-form-label errors" v-html="error"></label>
            </div>


            <div class="field has-text-right row">
                <v-btn color="success" class="button submit" type="button" @click="register">Submit</v-btn>
            </div>
        </panel>
    </div>
</template>

<script>
  import AuthenticationService from '../../services/AuthenticationService'
  import Panel from './Panel'

  export default {
    name: 'Registration',
    components: {
      Panel
    },
    data() {
      return {
        isSubmitted: false,
        isError: false,
        errorHeader: 'error.invalidFields',
//        errors: [],
        // types: this.getTypes(),
        submitting: false,
        form: {
          name: '',
          lastName: '',
          email: '',
          login: '',
          password: '',
          msg: 'yo'
        },
        error: null
      }
    },
    methods: {

      //Why use async and await??????

      async register() {
        try {
          const response = await AuthenticationService.register({
            login: this.form.login,
            name: this.form.name,
            lastName: this.form.lastName,
            email: this.form.email,
            password: this.form.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
        } catch (error) {
          this.error = error.response.data.error
        }


      }
    }
  }

</script>

<style>
    .errors {
        color: red;
    }
</style>