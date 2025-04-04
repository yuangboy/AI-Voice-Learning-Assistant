
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import {UserData} from "../convex/users";
import {api} from "../convex/_generated/api";
import { UserContext } from "./_context/UseContext";
import { useUser } from "@stackframe/stack"
 

export function AuthProvider({children}){

  const  [userData,setUserData]=useState();

const user=useUser();
const CreateUser=useMutation(api.users.UserData);

useEffect(()=>{
    console.log("user: ",user);
    user && handleUserData();       
  },[user]);
  

const handleUserData=async()=>{ 
  const result=await CreateUser({
    name:user?.displayName,
    email:user?.primaryEmail
  });
  console.log("result page: ",result);
  setUserData(result);

}

    return (
        <div>
            <UserContext.Provider value={{userData,setUserData}}>  
            {children}
            </ UserContext.Provider>
        </div>
    )

};