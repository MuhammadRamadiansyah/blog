const router = require('express').Router()
const { signin, signup, getAllPosts, newPost} = require('../controllers/controller_user')

router.get('/', getAllPosts)
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/add/post', newPost)

module.exports = router