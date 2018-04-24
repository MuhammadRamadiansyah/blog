<template>
  <div class="row">
    <div class="col-8">
      <div class="tab-content" id="nav-tabContent">
        <router-view/>
      </div>
    </div>
    <div class="col-4">
      <div class="list-group menuNav" id="list-tab" role="tablist">
        <a class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" role="tab" aria-controls="home"><router-link to="/">Home</router-link></a>
        <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" role="tab" aria-controls="profile"><router-link to="/myblogs">MyBlogs</router-link></a>
        <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list"  role="tab" aria-controls="settings"><router-link to="/newBlogs">Add New Post</router-link></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu-blogs'
}
</script>

<style>

.menuNav a:link    {
  text-decoration:  none;
  font-weight:      bold;
}
.menuNav a:visited {
  text-decoration:  none;
  font-weight:      bold;
  background-color: #ddd;
  color: #00008B;
  }
.menuNav a:hover   {
  text-decoration:  none;
  font-weight:      bold;
  background-color:#F0F8FF;
  color:#0000CD;
  }
.menuNav a:active  {
  text-decoration:  none;
  font-weight:      bold;
  background-color:#6495ED;
  color: white;
  }

</style>
