import { ApolloServer,gql } from "apollo-server";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import resolvers from "./resolvers.js";
import typeDefs from "./schemaGql.js";
import mongoose from "mongoose";
import { JWT_SECRET, MONGO_URI } from "./config.js";
import jwt from 'jsonwebtoken'

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongo db")
})

mongoose.connection.on("error",(err)=>{
    console.log("error connecting",err)
})

//import models first
import "./models/Quotes.js";
import "./models/User.js";


//this is a middleware
const context=({req})=>{
    //first these lines of code will run before going to any resolver
    const {authorization} = req.headers
    if(authorization){
        //retriving userId from token.
       const {userId}= jwt.verify(authorization,JWT_SECRET)
       return {userId}
    }
    }


//let create instance of apollo server 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

//lets listen
server.listen().then(({url})=>{
    console.log(`server sun rha ha at ${url}`)
});