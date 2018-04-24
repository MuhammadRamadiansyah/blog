import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Timeline from './views/Timeline.vue'
import NewBlogs from './views/NewBlogs.vue'
import MyStory from './views/MyStory.vue'
import DetailBlog from './views/DetailBlog.vue'
import EditBlog from './views/EditBlog.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Timeline
    },
    {
      path: '/myblogs',
      name: 'myblogs',
      component: MyStory
    },
    {
      path: '/newBlogs',
      name: 'new-blogs',
      component: NewBlogs
    },
    {
      path: '/myStory/:id',
      name: 'editblog',
      props: true,
      component: EditBlog
    },
    {
      path: '/myStory/:id',
      name: 'detailBlog',
      props: true,
      component: DetailBlog
    }
  ]
})
