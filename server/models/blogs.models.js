const mongoose = require('mongoose')
const Schema = mongoose.Schema


let blogSchema = new mongoose.Schema({
  user: {
      type: Schema.Types.ObjectId,
      ref: "posts"
    },
  title: {
      type: String,
    },
  text: {
      type: String,
    }
  },{
    timestamps: true
})

let Blogs = mongoose.model('Blogs', blogSchema)

module.exports = Blogs