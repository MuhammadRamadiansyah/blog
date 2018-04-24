<template>
    <div>
      <div v-if="isLogin">
        <a class="list-group-item list-group-item-action flex-column align-items-start" v-for="(blog, index) in user.blogs" :key="index" style="margin: 0px 20px 20px 20px; border: 3px solid #6495ED; border-style: inset;" @click="getDetail(blog)">
            <div class="d-flex w-100 justify-content-between">
              <small class="mb-1">{{getDate(blog)}}</small>
              <span class="fa fa-unlock" aria-hidden="true" v-if="checkPrivacy(blog)"></span>
              <span class="fa fa-lock" aria-hidden="true" v-else></span>
            </div>
            <router-link :to="{name: 'editblog', params: {id: blog._id}}" >
              <h5 class="mb-1">{{blog.title}}</h5>
            </router-link>
            <br>
            <p class="mb-1 readmore">{{blog.summary}} ... <router-link :to="{name: 'detailBlog', params: {id: blog._id}}">READ MORE</router-link> </p>
            <h4 class="blockquote-footer">{{user.name}}</h4>
        </a>
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

export default {
  name: 'myblogs',
  data () {
    return {
      userInfo: '',
      privacy: false
    }
  },
  methods: {
    checkPrivacy (blog) {
      if (blog.status === 'private') {
        return false
      } else {
        return true
      }
    },
    getDetail (blog) {
      this.$router.push({ path: `/myStory/${blog._id}` })
    },
    getDate (blog) {
      let newDate = new Date(blog.createdAt)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()
      newDate = `${month} ${day}, ${year}`
      return newDate
    }
  },
  computed: mapState([
    'user',
    'isLogin'
  ]),
  created () {
    if (this.$store.state.isLogin) {
      this.$store.dispatch('getUserData')
    }
  }
}
</script>

<style>

.header-blog-container {
  display: flex;
}

.header-blog-privacy {
  justify-self: flex-start;
}

.blogNav a:link    {
  text-decoration:  none;
  font-weight:      bold;
}
.blogNav a:visited {
  text-decoration:  none;
  font-weight:      bold;
  background-color: #ddd;
  color: #00008B;
  }
.blogNav a:hover   {
  text-decoration:  none;
  font-weight:      bold;
  background-color:#F0F8FF;
  color:#0000CD;
  }
.blogNav a:active  {
  text-decoration:  none;
  font-weight:      bold;
  background-color: black;
  color: white;
  }

</style>
