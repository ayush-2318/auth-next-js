"use client"
import axios from "axios"
import Link from 'next/link'
import { useRouter } from "next/navigation"
import React , { useState } from "react"
import {toast} from 'react-hot-toast'


export default function Profile(){
    const router=useRouter()
    const [data,setData]=useState('nothing')
    const logout =async()=>{
        try {
            const response=await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
            
        } catch (error:any) {
            console.log(error.message)
        }
    }

    const getUserDetails=async ()=>{
        const res=await axios.get('/api/users/me');
        console.log(res.data)
        setData(res.data.data._id);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <h2 className="padding rounded bg-green-500">
                {data==='nothing' ? "nothng":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <p className="text-center">Profile</p>
            <hr/>
            <button onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white
                font-bold py-2 px-4 rounded">
                    Logout
            </button>
            <button onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white
                font-bold py-2 px-4 rounded">
                    GetDetails
            </button>
        </div>
    )
}