const { mongo } = require("mongoose")

const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        nameproduct:{type:String,required:true},
        category_id:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
        image:{type:String,required:true},
        price:{type:Number,required:true},
        desc:{type:String,required:true},
        status:{type:String,default:"Còn"},
    }
    
)
module.exports = mongoose.model("Product",ProductSchema);
