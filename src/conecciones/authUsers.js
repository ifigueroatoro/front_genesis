import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

 
export default function AuthUser(){
   const navigate=useNavigate();

     const getToken=()=>{
        const tokenString=sessionStorage.getItem('token');
        const userToken=JSON.parse(tokenString);
        return userToken;
    }

    const getUser=()=>{
        const userString=sessionStorage.getItem('user');
        const user_datail=JSON.parse(userString);
        return user_datail;
    }
 
    const[token,setToken]=useState(getToken());
    const[user,settUser]=useState(getUser());

     const saveToken=(user,token)=>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));
        setToken(token);
        settUser(user);
        navigate('/dashboard');
    }

 

    const logout=()=>{
        sessionStorage.clear();
        navigate('/');

    }

    const http=axios.create({
        
        baseURL:"https://github.com/ifigueroatoro/back_genesis.git/",
      //  baseURL:"http://localhost/back_genesis/public/api/",
     //   baseURL:"http://190.163.158.117/back_genesis/public/api/",
        headers:{
            "Content-type" : "application/json", 
             Authorization : token ? `Bearer ${token}` :''  
        }
    });

 
    return{

        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout,
        }

}