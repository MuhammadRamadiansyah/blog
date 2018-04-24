<template>
  <div style="margin: 0px 15px;">
    <div v-if="isLogin">
      <h1>My New Story</h1>
      <form>
        <div class="form-group">
          <label for="exampleInputTitle1">Title: </label>
          <input type="text" class="form-control" id="exampleInputTitle1" aria-describedby="titleHelp" placeholder="Enter title" v-model="newTitle">
        </div>
        <form>
          <div class="row">
            <div class="col">
              <select class="custom-select my-1 mr-sm-2" id="newPostTag1">
                <option class="disabled" aria-placeholder="Select an option" value="null">Select an option</option>
                <option v-for="(tag, index) in tags" :key="index" :value="tag.category">{{tag.category}}</option>
              </select>
            </div>
            <div class="col">
              <select class="custom-select my-1 mr-sm-2" id="newPostPrivate">
                <option class="disabled" aria-placeholder="Select an option" value="null">Select a privacy for your post</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>
          </div>
        </form>
        <div class="form-group">
          <label for="text"> Descriptions</label>
          <textarea class="form-control" rows="20" id="description" placeholder="Enter your story here" v-model="newContent"></textarea>
        </div>
        <button type="button" class="btn btn-primary btn-block" @click="post">Submit</button>
      </form>
    </div>
    <div v-else>
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Attention!</h4>
        <p>You dont't have an access to access this page</p>
        <hr>
        <p class="mb-0">Whenever you need to, please register yourself.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'new-blogs',
  data () {
    return {
      newContent: '',
      newTitle: ''
    }
  },
  methods: {
    post () {
      let content = this.newContent
      let title = this.newTitle
      let tag = $('#newPostTag1').val()
      let privateStatus = $('#newPostPrivate').val()
      this.$store.dispatch('newPost', {
        title,
        content,
        tag,
        privateStatus
      })
      setTimeout(() => {
        this.$router.push('/myblogs')
      }, 2000)
    }
  },
  computed: mapState([
    'tags',
    'isLogin'
  ]),
  created () {
    this.$store.commit('checkLogin')
    this.$store.dispatch('getAllTags')
  }
}
</script>

<style>

</style>
