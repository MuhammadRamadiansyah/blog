<template>
  <div style="margin: 0px 15px;">
    <h1>My Story</h1>
    <form>
      <div class="form-group">
        <label for="exampleInputTitle1">Title: </label>
        <input type="text" class="form-control" id="exampleInputTitle1" aria-describedby="titleHelp" placeholder="Enter title" v-model="blogDetail.title">
      </div>
      <form>
        <div class="row">
          <div class="col">
            <select class="custom-select my-1 mr-sm-2" id="editPostTag1">
              <option class="disabled" aria-placeholder="Select an option" value="null">Select an option</option>
              <option v-for="(tag, index) in tags" :key="index" :value="tag.category">{{tag.category}}</option>
            </select>
          </div>
          <div class="col">
            <select class="custom-select my-1 mr-sm-2" id="editPostPrivate">
              <option class="disabled" aria-placeholder="Select an option" value="null">Select a privacy for your post</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>
      </form>
      <div class="form-group">
        <label for="text"> Descriptions</label>
        <textarea class="form-control" rows="20" id="description" placeholder="Enter your story here" v-model="blogDetail.content"></textarea>
      </div>
      <button type="button" class="btn btn-primary btn-block" @click="edit">EDIT ARTICLES</button>
      <button type="button" class="btn btn-danger btn-block" @click="deleteBlog">DELETE ARTICLES</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import $ from 'jquery'
import swal from 'sweetalert'

export default {
  data () {
    return {
      editTitle: '',
      editContent: ''
    }
  },
  props: ['id'],
  methods: {
    edit () {
      let content = this.blogDetail.content
      let title = this.blogDetail.title
      let tag = $('#editPostTag1').val()
      let privateStatus = $('#editPostPrivate').val()
      this.$store.dispatch('editPost', {
        id: this.id,
        title,
        content,
        tag,
        privateStatus
      })
      setTimeout(() => {
        this.$router.push('/myblogs')
      }, 2000)
    },
    deleteBlog () {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover your article?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.$store.dispatch('deletePost', this.id)
            swal('Success delete article!', {
              icon: 'success'
            })
            setTimeout(() => {
              this.$router.push('/myblogs')
            }, 2000)
          } else {
            swal('Cancel delete article')
          }
        })
    }
  },
  computed: mapState([
    'tags',
    'user',
    'blogDetail'
  ]),
  created () {
    this.$store.dispatch('getBlogData', this.id)
  }
}
</script>

<style>

</style>
