'use client'
import { error } from 'console';
import email from 'next-auth/providers/email';
import passage from 'next-auth/providers/passage';
import React from 'react'
import { useState } from 'react';

export default function TestJWT() {
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState(null);
    const [unAuthorized, setAuthorized] = useState(false);
    //handleLogin
    const handleLogin = async()=>{
        const email = "sokcheatsrorng@gmail.com";
        const password = "Cheat12345";

        fetch(process.env.NEXT_PUBLIC_API_URL+'/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        }).then((res)=> res.json()).then((data)=>
            {
                console.log("Data JWT: ",data)
                setAccessToken(data.accessToken)
                setUser(data.user)
            }
          
         )
        .catch((err)=>{
            console.log(err)
        })
    }
    //handlePartialUpdate
    const handlePartialUpdate=async()=>{
       const body={
        name:"Mazda CX-5 New"
       }

    //   fetch API for update partialUpdate 
    const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/${430}`,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body:JSON.stringify(body)
    }
    )
    if(res.status == 401){
        setAuthorized(true);
    }
    const  data =await res.json();
    console.log(data)

    }
    //handleRefreshToken
    const handleRefreshToken = async()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh`,{
            method:"POST",
            credentials:"include",
            body:JSON.stringify({})
        }).then((res)=> res.json())
        .then((data)=> 
            {
                console.log("Data Refresh Token: ",data)
                setAccessToken(data.accessToken);
            }
    )
        .catch((err)=> console.log(err))
    }

  return (
    <main className='h-screen grid place-content-center'>
        <h1 className='text-2xl'>TEST HANDLE LOGIN</h1>
        {/*button login */}
        <button onClick={handleLogin} className="p-4 rounded-2xl bg-blue-700 border my-5 text-2xl text-gray-200">
            Login
        </button>
        {/* button update partial data */}
        <button onClick={handlePartialUpdate} className="p-4 rounded-2xl bg-blue-700 border my-5 text-2xl text-gray-200">
            Partial Update
        </button>
        {/* button refresh token */}
        {unAuthorized && (
            <button onClick={handleRefreshToken} className="p-4 rounded-2xl bg-blue-700 border my-5 text-2xl text-gray-200">
            Refresh Token
        </button>
        )
        }


        
    </main>
  )
}
