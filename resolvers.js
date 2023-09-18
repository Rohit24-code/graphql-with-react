import mongoose from "mongoose";
import { quotes,users } from "./fakedb.js";
import {randomBytes} from 'crypto';
import bcrpyt from 'bcryptjs';
//import User modal that gives list of all users inside User.
import { User } from "./models/User.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { Quote } from "./models/Quotes.js";



//resolvers is some thing which  works as brain
// as client will Query then what we will give 
// is given by resolvers
const resolvers={
    Query:{
        users:async()=>await User.find({}),
        //arg comes form user(_id:ID!):User the _id we have ins_ide it.
        user:async(parent,args)=>await User.findOne({_id:args?._id}),
        // this populate gives out all quotes and make by as object having _id and firstName.
        quotes:async()=>await Quote.find({}).populate("by","_id firstName"),
        quote:async(_,{by})=>await Quote.find({by})
    },

    //to get quotes of that user while calling user we 
    // need to resolve it ins_ide User type.
    //this user will be all users list and then we filter only quotes of 
    // particular user
    User:{
        quotes:async(user)=>await Quote.find({by:user._id})
    },

    //Mutation is like post put delete
    Mutation:{
        //first argument is parent and second is actual thing what we pass
        signUpUser:async(_,{userNew})=>{
          const user=await User.findOne({email:userNew.email})

          if(user){
            throw new Error("User already exist with that email")
          }
          else{
          let hashedPassword=await bcrpyt.hash(userNew.password,10);

          const newUser =  new User({
            ...userNew,
            password:hashedPassword
          })
          return await newUser.save();
          }
        },
        signInUser:async(_,{userSignIn})=>{
          const user= await User.findOne({email:userSignIn.email})

          if(!user){
            throw new Error("user does not exist with that email")
          }

          const isMatched = await bcrpyt.compare(userSignIn.password,user.password);

          if(!isMatched){
            throw new Error("invalid user , email or password is invalid")
          }
          else{
            const token = jwt.sign({userId:user._id},JWT_SECRET);
            return {token};
          }

          },
          //third params is from context that runs before resolver and gives userId;
          createQuote:async(_,{name},{userId})=>{
          // user can create quote if user is logged in
          // before reaching this we have to check for it using middlware
          if(!userId){
            throw new Error("you are not logged in")
          }
          else{
            const newQuote = new Quote({
              name,
              by:userId
            });

            await newQuote.save();
            return "Quote saved successfully"
          }
  
            },
    }

}

export default resolvers;