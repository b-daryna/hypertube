<template>
    <form id="signup-form" class="col-sm-8">
        <div>
            <v-toolbar flat dense color="#f0f8ff" style="text-align:center;">
                <v-toolbar-title style="margin: 0 auto">{{title}}</v-toolbar-title>
            </v-toolbar>
        </div>
        <div>
            <slot>No content yet</slot>
        </div>
    </form>
</template>

<script>

  export default {
    name: 'Panel',
    props: [
      'title'
    ]
  }
</script>

<style scoped>

</style>