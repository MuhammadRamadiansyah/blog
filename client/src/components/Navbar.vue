<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand logo-decoration swing"><router-link to="/">MyBlogs!</router-link></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item disabled">
          <a class="nav-link"><span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item disabled">
          <a class="nav-link"></a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled"></a>
        </li>
      </ul>
        <!-- Button trigger Login modal -->
      <button type="button" class="btn btn-outline-primary navbar-button" data-toggle="modal" data-target="#loginModal" v-if="!isLogin">
        Login
      </button>
      <button type="button" class="btn btn-outline-danger navbar-button" v-else @click="logout">
        Logout
      </button>
        <!-- Button trigger Register modal -->
      <button type="button" class="btn btn-outline-primary navbar-button" data-toggle="modal" data-target="#registerModal">
        Register
      </button>

    </div>
    <!-- Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputName1">Name </label>
                <input type="text" name="newName" class="form-control" id="newName" aria-describedby="NameHelp" placeholder="Enter name" v-model="newName">
                <small id="nameHelpRegis" class="form-text text-muted"></small>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name="newEmail" class="form-control" id="newEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="newEmail">
                <small id="emailHelpRegis" class="form-text text-muted"></small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" name="new_password" class="form-control" id="newPassword" placeholder="Password"  v-model="newPassword">
                <small id="passwordHelpRegis" class="form-text text-muted"></small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1"> Confirm Password</label>
                <input type="password" name="confirm_password" class="form-control" id="newConfirm" placeholder="Password" v-model="newConfirmPassword">
                <small id="passwordConfirmHelpRegis" class="form-text text-muted"></small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" @click="register" :class="{disabled: checkValidation()}" >Submit</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="login">Sign in</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'navbar',
  data () {
    return {
      newEmail: '',
      newPassword: '',
      newConfirmPassword: '',
      newName: '',
      isEmail: false,
      isPassword: false,
      isConfirm: false,
      isName: false,
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      if (this.checkValidation) {
        axios.post('http://localhost:3000/users/signup', {email: this.newEmail, password: this.newPassword, name: this.newName, role: 'user'})
          .then((response) => {
            swal({
              title: 'Good job!',
              text: 'Congratulations sign up success!',
              icon: 'success',
              button: 'Ok!'
            })
              .then((result) => {
                // this.newName = ''
                // this.newEmail = ''
                // this.newConfirmPassword = ''
                // this.newPassword = ''
                // $('#registerModal').modal('toggle')
                location.reload()
              })
            this.$router.push('/')
          })
          .catch((err) => {
            swal('Register failed', err.message, 'failed')
          })
      } else {
        swal('Harus diisi semuanya dulu', 'failed')
      }
    },
    checkValidation () {
      if (this.isEmail && this.isConfirm && this.isPassword && this.isName) return false; return true
    },
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      setTimeout(() => {
        this.$router.push('/')
        location.reload()
      }, 2000)
    },
    logout () {
      swal({
        title: 'Are you sure?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.$store.commit('logout')
            swal('Success logout!', {
              icon: 'success'
            })
            setTimeout(() => {
              this.$router.push('/')
            }, 2000)
          } else {
            swal('You still login')
          }
        })
    }
  },
  watch: {
    newEmail: function () {
      // eslint-disable-next-line
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      let checkEmail = re.test(String(this.newEmail).toLowerCase())
      if (checkEmail) {
        $('#emailHelpRegis').text('correct email').css('color', 'green')
        $('#newEmail').css({'border-color': 'green', 'border-solid': 'bold', 'border-width': '3px'})
        this.isEmail = true
      } else {
        $('#emailHelpRegis').text('wrong email').css('color', 'red')
        $('#newEmail').css({'border-color': 'red', 'border-solid': 'bold', 'border-width': '3px'})
        this.isEmail = false
      }
    },
    newPassword: function () {
      if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(String(this.newPassword))) {
        $('#passwordHelpRegis').text('correct password').css('color', 'green')
        $('#newPassword').css({'border-color': 'green', 'border-solid': 'bold', 'border-width': '3px'})
        this.isPassword = true
      } else {
        $('#passwordHelpRegis').text('password must contain at least 1 uppercase, 1 lowercase, and 1 number').css('color', 'green')
        $('#newPassword').css({'border-color': 'red', 'border-solid': 'bold', 'border-width': '3px'})
        this.isPassword = false
      }
    },
    newConfirmPassword: function () {
      if (this.newConfirmPassword === this.newPassword && this.newConfirmPassword !== '') {
        $('#passwordConfirmHelpRegis').text('password match').css('color', 'green')
        $('#newConfirm').css({'border-color': 'green', 'border-solid': 'bold', 'border-width': '3px'})
        this.isConfirm = true
      } else {
        $('#passwordConfirmHelpRegis').text('password not match').css('color', 'red')
        $('#newConfirm').css({'border-color': 'red', 'border-solid': 'bold', 'border-width': '3px'})
        this.isConfirm = false
      }
    },
    newName: function () {
      if (this.newName.length > 6) {
        $('#nameHelpRegis').text('name correct').css('color', 'green')
        $('#newName').css({'border-color': 'green', 'border-solid': 'bold', 'border-width': '3px'})
        this.isName = true
      } else {
        $('#nameHelpRegis').text('name must be at least 7 characters').css('color', 'red')
        $('#newName').css({'border-color': 'red', 'border-solid': 'bold', 'border-width': '3px'})
        this.isName = false
      }
    }
  },
  computed: mapState([
    'isLogin'
  ]),
  created () {
    this.$store.commit('checkLogin')
    this.$store.dispatch('getAllTags')
    if (this.$store.state.isLogin) {
      this.$store.dispatch('getUserData')
    }
  }
}
</script>

<style>

.navbar-button {
  margin: 0px 5px;
}

.logo-decoration a:link    {
  text-decoration:  none;
  font-weight:      bold;
}

@-webkit-keyframes swing
{
    15%
    {
        -webkit-transform: translateX(5px);
        transform: translateX(5px);
    }
    30%
    {
        -webkit-transform: translateX(-5px);
       transform: translateX(-5px);
    }
    50%
    {
        -webkit-transform: translateX(3px);
        transform: translateX(3px);
    }
    65%
    {
        -webkit-transform: translateX(-3px);
        transform: translateX(-3px);
    }
    80%
    {
        -webkit-transform: translateX(2px);
        transform: translateX(2px);
    }
    100%
    {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
}
@keyframes swing
{
    15%
    {
        -webkit-transform: translateX(5px);
        transform: translateX(5px);
    }
    30%
    {
        -webkit-transform: translateX(-5px);
        transform: translateX(-5px);
    }
    50%
    {
        -webkit-transform: translateX(3px);
        transform: translateX(3px);
    }
    65%
    {
        -webkit-transform: translateX(-3px);
        transform: translateX(-3px);
    }
    80%
    {
        -webkit-transform: translateX(2px);
        transform: translateX(2px);
    }
    100%
    {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
}

.swing:hover
{
        -webkit-animation: swing 1s ease;
        animation: swing 1s ease;
        -webkit-animation-iteration-count: 1;
        animation-iteration-count: 1;
}
</style>
