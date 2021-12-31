const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
    {
        namecategory:{type:String,required:true},
        image:{type:String,required:true},
        status:{type:String,default:"Còn bán"}
    },
    { timestamps: true }
)
module.exports = mongoose.model("Category",CategorySchema)