import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogs: [],
    tags: [],
    user: '',
    isLogin: false,
    blogDetail: '',
    allBlogs: []
  },
  mutations: {
    getUserData (state, payload) {
      state.user = payload
    },
    checkLogin (state) {
      if (localStorage.getItem('token')) state.isLogin = true
    },
    getAllTags (state, payload) {
      state.tags = payload
    },
    newPost (state, payload) {
      state.blogs.push(payload)
    },
    logout (state) {
      state.user = ''
      state.isLogin = false
      localStorage.removeItem('token')
      location.reload()
    },
    getBlogData (state, payload) {
      state.blogDetail = payload
    },
    getAllBlogs (state, payload) {
      state.allBlogs = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      axios.post('http://localhost:3000/users/signin', {email: payload.email, password: payload.password}, {})
        .then((response) => {
          swal({
            title: 'Good job!',
            text: 'Congratulations sign in success!',
            icon: 'success',
            button: 'Ok!'
          })
            .then((result) => {
              localStorage.setItem('token', response.data.token)
              commit('getUserData', response.data.user)
            })
        })
        .catch((err) => {
          swal('Login failed', err.message, 'failed')
        })
    },
    getAllTags ({ commit }) {
      axios.get('http://localhost:3000/users/tags')
        .then((response) => {
          commit('getAllTags', response.data.tags)
        })
        .catch((err) => {
          swal('Get all tags failed', err.message, 'failed')
        })
    },
    newPost ({commit}, payload) {
      console.log(payload)
      axios.post('http://localhost:3000/users/add', {title: payload.title, content: payload.content, tag: payload.tag, status: payload.privateStatus}, {headers: {token: localStorage.getItem('token')}})
        .then((response) => {
          swal({
            title: 'Good job!',
            text: 'Congratulations for your new post',
            icon: 'success',
            button: 'Ok!'
          })
            .then((result) => {
              let payload = {
                blog: response.data.result
              }
              commit('newPost', payload)
            })
        })
        .catch((err) => {
          swal('Add post failed', err.message, 'failed')
        })
    },
    getUserData ({commit}) {
      axios.get('http://localhost:3000/users', {headers: {token: localStorage.getItem('token')}})
        .then((response) => {
          commit('getUserData', response.data.user)
        })
        .catch((err) => {
          swal('get data user failed', err.message, 'failed')
        })
    },
    getBlogData ({commit}, payload) {
      axios.get(`http://localhost:3000/users/post/${payload}`, {headers: {token: localStorage.getItem('token')}})
        .then((response) => {
          commit('getBlogData', response.data.blog)
        })
        .catch((err) => {
          swal('get data user failed', err.message, 'failed')
        })
    },
    editPost ({commit}, payload) {
      axios.put(`http://localhost:3000/users/post/edit/${payload.id}`, {title: payload.title, content: payload.content, status: payload.privateStatus, tag: payload.tag}, {headers: {token: localStorage.getItem('token')}})
        .then((response) => {
          swal({
            title: 'Good job!',
            text: 'Congratulations for editting your post',
            icon: 'success',
            button: 'Ok!'
          })
        })
        .catch((err) => {
          swal('get data user failed', err.message, 'failed')
        })
    },
    deletePost ({commit}, payload) {
      axios.delete(`http://localhost:3000/users/post/delete/${payload}`, {headers: {token: localStorage.getItem('token')}})
        .then((response) => {
          console.log(response.data)
        })
        .catch((err) => {
          swal('delete data failed', err.message, 'failed')
        })
    },
    getAllBlogsData ({commit}) {
      axios.get('http://localhost:3000/users/posts')
        .then((response) => {
          commit('getAllBlogs', response.data.blogs)
        })
        .catch((err) => {
          swal('get all posts failed', err.message, 'failed')
        })
    }
  }
})
