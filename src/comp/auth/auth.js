import { useState,useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ShowError from "./showError";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../firebase/firebase";
import { Log } from "./login";
import {setUser} from '../../features/TelegramSlice';
import Loading from "./loading";
function Auth() {
    let dispatch=useDispatch();
    let user=useSelector((state)=>state.TeleR.user);
    let [signUp,setSignUp]=useState(false);
    let [username,setUsername]=useState('');
    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');
    let butVar={
        hover:{
            scale:1.1,
        }
    }
    let inputV={
        hidden:{
            x:-400,
            opacity:0
        },
        visible:{
            x:0,
            opacity:1
        }
    }
    let [onValidate,setValidate]=useState(false);
    function setV(setF,v){
        setValidate(false);
        setF(v)
    }
    
    let [loading,setLoading]=useState(true);
    let [error,setError]=useState(null);
    useEffect(()=>{
        if(user===null){
            let unsubscribe= getCurrentUser((snapshot)=>{
                if (snapshot!==null){
                    dispatch(setUser({
                        name:snapshot.displayName,
                        uid:snapshot.uid
                       }))
                }
                setLoading(false);

                unsubscribe();
              });
        }else{
            setLoading(false);
        }
      
    },[])
    return ( <div className="dark:bg-[#17212b] w-auto h-screen flex justify-center items-center flex-col" >
       {!loading?<div className="flex justify-center items-center flex-col" >
        <div className="mb-4 text-white/70">
           {error}
        </div>
       <AnimatePresence>
          {signUp && (
            <div>
                <motion.input value={username} onChange={(e)=>setV(setUsername,e.target.value)} variants={inputV} initial={error?'':'hidden'} animate={error?'':'visible'} exit='hidden' placeholder="Username" className="bg-[#0e1621] py-4  text-white/80 px-2  w-72 h-7 rounded-2xl  "  type="text"   ></motion.input>
                <ShowError text={onValidate && username.length===0?'Username is required':''}/>
            </div>
          )}
        </AnimatePresence>
         <input value={email} onChange={(e)=>setV(setEmail,e.target.value)} placeholder="Email" className="bg-[#0e1621] py-4   text-white/80 px-2  w-72 h-7 rounded-2xl  "  type="text"  />
         <ShowError text={onValidate && email.length===0 ?'Email is required':''}/>
         <input value={password}  onChange={(e)=>setV(setPassword,e.target.value)} placeholder="Password" className="bg-[#0e1621] py-4 text-white/80 px-2  w-72 h-7 rounded-2xl   "  type="password" />
         <ShowError text={onValidate && password.length<6 ?'Password must be at least 6 digits':''}/>
         <motion.button onClick={()=>Log(email,password,username,signUp,setLoading,setError,dispatch,setValidate)}  variants={butVar} whileHover='hover' className="text-white/75 my-4 dark:hover:bg-[#0e162183]  dark:bg-[#0e1621cc] px-10 py-0.5 rounded-xl" >{signUp?'Sign Up':'Log in'}</motion.button>
         <motion.button onClick={()=>{
            setError(null);
            setValidate(false);
            setSignUp(!signUp) }} variants={butVar} whileHover='hover' className="dark:bg-white px-20 hover:dark:bg-white/75 rounded-2xl py-1 dark:text-[#17212b] " >{signUp?'Have an account?':"Create account"}</motion.button>
       </div>:(
        <Loading/>
       )}
    </div> );
}

export default Auth;