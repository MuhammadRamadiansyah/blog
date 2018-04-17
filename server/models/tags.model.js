const mongoose = require('mongoose')
const Schema = mongoose.Schema


let tagSchema = new mongoose.Schema({
  category: {
      type: String,
    },
  blogs:[{
      type: Schema.Types.ObjectId,
      ref: "blogs"
    }]
  },{
    timestamps: true
})

let Tags = mongoose.model('tags', tagSchema)

module.exports = Tags