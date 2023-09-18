//create schema

import { gql } from "apollo-server-core";

//Query is written as what the client will query
// if he query greet we will return a string
//! is used for madatory


const typeDefs = gql`
type Query{
    users:[User]
    user(_id:ID!):User
    quotes:[QuoteWithName]
    quote(by:ID!):[Quotes]
}

type Mutation{
    signUpUser(userNew:UserInput!):User
    signInUser(userSignIn:UserSignInInput!):Token
    createQuote(name:String!):String
}

type User{
    _id:ID!
    firstName:String!
    lastName:String!
    email:String!
    password:String!
    quotes:[Quotes]
}

type Quotes{
    name:String
    by:ID
}

type Token{
    token:String
}

type QuoteWithName{
    name:String
    by:IdName
}

type IdName{
 _id:String
 firstName:String
}

input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}

input UserSignInInput{
    email:String!
    password:String!
}

input createNewQuote{
    name:String!
    by:ID!
}
`
export default typeDefs;