<template>
  <div class="list-group blogNav">
      <a class="list-group-item list-group-item-action flex-column align-items-start" style="margin: 0px 20px 20px 20px; border: 3px solid #6495ED; border-style: inset;">
        <div class="d-flex w-100 justify-content-between">
          <small class="mb-1">{{getDate(blogDetail)}}</small>
          <span class="fa fa-unlock" aria-hidden="true" v-if="checkPrivacy(blogDetail)"></span>
          <span class="fa fa-lock" aria-hidden="true" v-else></span>
        </div>
        <h5 class="mb-1">{{blogDetail.title}}</h5>
        <br>
        <p class="mb-1 readmore">{{blogDetail.content}}</p>
        <h4 class="blockquote-footer">{{user.name}}</h4>
      </a>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'detail',
  data () {
    return {
      content: ''
    }
  },
  props: ['id'],
  computed: mapState([
    'user',
    'blogDetail'
  ]),
  methods: {
    getDate (blog) {
      let newDate = new Date(blog.createdAt)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()
      newDate = `${month} ${day}, ${year}`
      return newDate
    },
    checkPrivacy (blog) {
      if (blog.status === 'private') {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this.$store.dispatch('getBlogData', this.id)
  }
}
</script>

<style>

</style>
