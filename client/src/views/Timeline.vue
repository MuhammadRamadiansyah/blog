<template>
    <div >
      <div class="card hover-style" style="margin: 0px 20px 20px 20px" v-for="(tag, index) in tags" :key="index">
        <div class="card-header">
          {{tag.category.toUpperCase()}}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <a class="list-group-item list-group-item-action flex-column align-items-start" v-for="(blog, index) in filterBlogs(tag._id)" :key="index" style="margin: 15px 0px; border: 3px solid #6495ED; border-style: inset;">
              <h5 class="mb-1" style="text-align: center;"><span class="fa fa-trash-o" aria-hidden="true"  @click="deleteBlog(blog)" v-show="isAdmin"></span></h5>
              <div class="d-flex w-100 justify-content-between">
                <small class="mb-1">{{getDate(blog)}}</small>
                <span class="fa fa-unlock" aria-hidden="true" v-if="checkPrivacy(blog)"></span>
                <span class="fa fa-lock" aria-hidden="true" v-else></span>
              </div>
              <h5 class="mb-1">{{blog.title}}</h5>
              <br>
              <p class="mb-1 readmore">{{blog.summary}} ... <router-link :to="{name: 'detailBlog', params: {id: blog._id}}">READ MORE</router-link> </p>
              <h4 class="blockquote-footer">{{blog.user.name}}</h4>
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'timeline',
  data () {
    return {
      userInfo: '',
      privacy: false,
      isAdmin: false
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
    getDate (blog) {
      let newDate = new Date(blog.createdAt)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()
      newDate = `${month} ${day}, ${year}`
      return newDate
    },
    filterBlogs (tagId) {
      return this.$store.state.allBlogs.filter(blog => blog.tag._id === tagId && blog.status === 'public')
    },
    deleteBlog (blog) {
      console.log(blog)
    }
  },
  computed: mapState([
    'user',
    'tags'
  ]),
  created () {
    this.$store.dispatch('getAllTags')
    this.$store.dispatch('getAllBlogsData')
    if (localStorage.getItem('token') && localStorage.getItem('role')) {
      if (localStorage.getItem('role') === 'admin') {
        this.isAdmin = true
      }
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

.hover-style a:link    {
  text-decoration:  none;
  font-weight:      bold;
}
.hover-style a:visited {
  text-decoration:  none;
  font-weight:      bold;
  background-color: #ddd;
  color: #00008B;
  }
.hover-style a:hover   {
  text-decoration:  none;
  font-weight:      bold;
  background-color:#F0F8FF;
  color:#0000CD;
  }
.hover-style a:active  {
  text-decoration:  none;
  font-weight:      bold;
  background-color: black;
  color: white;
  }

</style>
