const router = require('express').Router()
const { getBlog, getAllTags, signin, signup, myPosts, newPost, editPost, deletePost, reportPost, getAllPosts, getAllReportPost, deleteReportPost, acceptReportPost, addTags} = require('../controllers/controller_user')
const { authLogin, authAdmin } = require('../middlewares/auth')

router.get('/', authLogin, myPosts)
router.get('/posts', getAllPosts)
router.get('/tags', getAllTags)
router.post('/signup', signup)
router.post('/signin', signin)

router.post('/add', authLogin, newPost)
router.get('/post/:id', authLogin, getBlog)
router.put('/post/edit/:id', authLogin, editPost)
router.delete('/post/delete/:id', authLogin, deletePost)
router.patch('/post/report/:id', authLogin, reportPost)

router.get('/report/post', authLogin, authAdmin, getAllReportPost)
router.delete('/report/post/:id', authLogin, authAdmin, deleteReportPost)
router.patch('/report/post/:id', authLogin, authAdmin, acceptReportPost)
router.post('/addTags', addTags)


module.exports = router 