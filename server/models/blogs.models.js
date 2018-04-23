const mongoose = require('mongoose')
const Schema = mongoose.Schema


let blogSchema = new mongoose.Schema({
  user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
  title: {
      type: String,
    },
  content: {
      type: String,
    },
  report: {
      type: Boolean,
    },
  private: {
    type: Boolean,
  },
  tags:[{
      type: Schema.Types.ObjectId,
      ref: "tags"
    }]
  },{
    timestamps: true
})
blogSchema.pre('remove', function(next){

  this.model('tags').update(
    {blogs: this._id}, 
    {$pull: {blogs: this._id}}, 
    {multi: true},
    next,
  )

  this.model('users').update(
      {_id:  {$in: this.user}}, 
      {$pull: {blogs: this._id}}, 
      {multi: true},
      next,
  );
 


});

blogSchema.post('remove', function(deleteData){
  
  // this.model('tags').update(
  //   {blogs: this._id}, 
  //   {$pull: {blogs: this._id}}, 
  //   {multi: true},
  // )
})
let Blogs = mongoose.model('blogs', blogSchema)

module.exports = Blogs