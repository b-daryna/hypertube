<template>
    <div class="profile">
        <panel title="Profile">
            <div class="col-sm-4 fl-left">
                <img :src="photo" class="uploading-image"/>
                <input style="display: none;" accept="image/*"
                       type="file" @change="uploadImage" ref="fileInput">
                <div class="field has-text-right row">
                    <div class="col-md-12">
                        <button class="button submit" @click="$refs.fileInput.click()">Upload image</button>
                    </div>
                </div>
            </div>
            <div class="col-sm-8 fl-right">
                <!-- name -->
                <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Login</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" name="login" v-model="login">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-4 col-form-label">First Name</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" name="name" v-model="firstName">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Last Name</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" name="lastName" v-model="lastName">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Email</label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" name="email" v-model="email">
                    </div>
                </div>

                <div class="form-group row m-b">
                    <label class="col-sm-4 col-form-label">Password</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" name="passwd" v-model="password">
                    </div>
                </div>
                <div class="field has-text-right row" style="margin-top: 8em">
                    <div class="col-md-12">
                        <v-btn type="submit" color="success" class="button is-danger submit">Save changes</v-btn>
                    </div>
                </div>
            </div>
        </panel>

    </div>
</template>

<script>
  import Panel from './Panel'

  export default {
    name: 'Profile',
    components: {
      Panel
    },
    data() {
      return {
        msg: 'Welcome elcome test',
        login: 'princess',
        firstName: 'Miss',
        lastName: 'Queen',
        password: '',
        email: 'myemail@gmail.com',
        photo: null
      }
    },
    methods: {
      uploadImage(e) {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
          this.photo = e.target.result;
//          console.log(this.photo)
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
        color: #42b983;
        text-align: center;
    }

</style>
