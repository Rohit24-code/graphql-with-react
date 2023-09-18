import mongoose from "mongoose";
const quotesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        //this is for reference to user modal
        ref:"User"
    }
})

export const Quote=mongoose.model("Quote",quotesSchema);
