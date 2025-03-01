import React, { Children, createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, updateCurrentUser } from "firebase/auth";


export const AuthContext=createContext();
const auth=getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginwithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            // console.log(currentUser);
            setUser(currentUser)
            setLoading(false);
        })
        return()=>{
            return unsubscribe();

        }
    },[])

    const authInfo={
        
        user,
        createUser,
        loginwithGoogle,
        loading
    }
    return(
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider