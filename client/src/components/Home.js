import React, { useEffect } from 'react'
import { GET_ALL_QUOTES } from '../gqlOperation/queries';
import { useQuery } from '@apollo/client';

export default function Home() {
    // how we do without appolo client the problem with it is 
    // that syntax is bigger and every time you visit page again call is made 

    // we cache this data using appolo client 
    // useEffect(()=>{
    //   fetch(`http://localhost:4000`,{
    //     method:'post',
    //     headers:{
    //         'Content-type':"application/json"
    //     },
    //     // over here we pass the query params in body after stringify.
    //     body:JSON.stringify({
    //         query:`
    //         query getAllQuotes{
    //             quotes{
    //               name,
    //               by{
    //               _id,
    //               firstName
    //             }
    //             }
    //           }
    //         `,
    //     })
    //   }).then((res)=>res.json())
    //   .then(data=>console.log(data))
    // },[])

    const {loading,error,data} =useQuery(GET_ALL_QUOTES)

    if(loading) return <h1>Loading</h1>
    if(error){
        console.log(error)
    }
    return (
        <div className="container">
            {
                data.quotes.map((quote)=>{
                    return (
                        <blockquote>
                        <h6>{quote?.name}</h6>
                        <p className="right-align">{quote.by.firstName}</p>
                       </blockquote>
                    )
                })
            }
        </div>
    )
}