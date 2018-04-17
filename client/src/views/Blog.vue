<template>
  <div class="container">
    <div class="row">
      <Category class="col-lg-3" />
      <BlogLists class="col-lg-9" />
    </div>
  </div>
</template>

<script>

import Category from '@/components/Category.vue'
import BlogLists from '@/components/BlogLists.vue'

export default {
  name: 'blog',
  components: {
    Category,
    BlogLists
  }
}
</script>

<style>

</style>
