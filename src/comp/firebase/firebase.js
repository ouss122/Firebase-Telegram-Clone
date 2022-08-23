
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,getAuth, updateProfile,signOut, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { addNewUser } from "./storage";
const firebaseConfig = {

    apiKey: "apiKey",
  
    authDomain: "authDomain",
  
    projectId: "projectId",
  
    storageBucket: "storageBucket",
  
    messagingSenderId: "messagingSenderId",
  
    appId: "appId"
  
  };


  

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

export async function createAcc(email,password){
    let result =await createUserWithEmailAndPassword(auth,email,password);
    await addNewUser(result.user.uid);
    return result;
  }
export function signIn(email,password){
    return signInWithEmailAndPassword(auth,email,password);
}
export function updateUsern(user,username){
  return updateProfile(user,{
    displayName:username
  })
}

export  function signout(){
    return signOut(auth);
}
export function getCurrentUser(fun){
   return onAuthStateChanged(auth,fun)
}