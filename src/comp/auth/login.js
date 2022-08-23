import { createAcc, signIn, updateUsern } from "../firebase/firebase";
import {setUser} from '../../features/TelegramSlice';


export   function Log(email,password,username,signUp,setLoading,setError,dispatch,setValidate){
    if ((username.length!==0 || !signUp)  && email.length!==0 &&password.length>=6){
      setLoading(true);
      setError(null);
       if (signUp){
         
         createAcc(email,password).then((e)=>{
           updateUsern(e.user,username).then(()=>{
              dispatch(setUser({
                uid:e.user.uid,
                name:e.user.displayName
              }))
           })
         }).catch((error)=>{
           setLoading(false);
          let index=error.message.indexOf('auth/')+5
           setError(error.message.slice(index,error.message.length-2).replaceAll('-',' '));

         })
       }else{
         signIn(email,password).then((e)=>{
            dispatch(setUser({
                uid:e.user.uid,
                name:e.user.displayName
              }))
         }).catch((error)=>{
          setLoading(false)
          let index=error.message.indexOf('auth/')+5
            setError(error.message.slice(index,error.message.length-2).replaceAll('-',' '));
            
         });
       }
    }else{
        setValidate(true)
    }
   
}