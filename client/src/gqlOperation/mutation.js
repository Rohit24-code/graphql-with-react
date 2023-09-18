import {gql} from '@apollo/client'
export const SIGNUP_USER= gql`
mutation  createUser($userNew:UserInput!){
    user:signUpUser(userNew:$userNew){
      firstName
  }
  }
`