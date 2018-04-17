const router = require('express').Router()
const { getAllTags, signin, signup, myPosts, newPost, editPost, deletePost, reportPost, getAllPosts, getAllReportPost, deleteReportPost, acceptReportPost} = require('../controllers/controller_user')
const { authLogin, authAdmin } = require('../middlewares/auth')

router.get('/', authLogin, myPosts)
router.get('/posts', getAllPosts)
router.get('/tags', getAllTags)
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/add', authLogin, newPost),
router.put('/post/:id', authLogin, editPost)
router.delete('/post/:id', authLogin, deletePost)
router.patch('/post/:id', authLogin, reportPost)
router.get('/report/post', authLogin, authAdmin, getAllReportPost)
router.delete('/report/post/:id', authLogin, authAdmin, deleteReportPost)
router.patch('/report/post/:id', authLogin, authAdmin, acceptReportPost)


module.exports = router