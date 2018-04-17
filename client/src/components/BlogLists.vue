<template>
  <div class="list-group">
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" v-for="(blog,index) in blogs" :key="index">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">List group item heading</h5>
        <small>3 days ago</small>
      </div>
      <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
      <small>Donec id elit non mi porta.</small>
    </a>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'blogLists',
  data () {
    return {
      blogs: []
    }
  },
  created () {
    axios.get('http://localhost:3000/users/posts')
      .then(responses => {
        console.log(responses.data.blogs)
        this.blogs = responses.data.blogs
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>

</style>
