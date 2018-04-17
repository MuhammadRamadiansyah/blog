<template>

  <div class="list-group">
    <button type="button" class="list-group-item list-group-item-action" :class="{active: active}" v-for="(category,index) in categories" :key="index" @click="active_category">
      {{category.category}}
    </button>
  </div>

</template>

<script>

import axios from 'axios'

export default {
  name: 'category',
  data () {
    return {
      active: false,
      categories: []
    }
  },
  methods: {
    listCategories () {
      console.log('boom')
    },
    active_category () {
      this.active = false
    }
  },
  created () {
    axios.get('http://localhost:3000/users/tags')
      .then(responses => {
        this.categories = responses.data.tags
      })
      .catch(err => {
        console.log(err)
        alert('cannot load tags')
      })
  }
}
</script>

<style>

</style>
