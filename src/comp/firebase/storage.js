import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, } from "firebase/firestore";
import { setUserGrp } from "../../features/TelegramSlice";
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
const firebaseConfig = {

    apiKey: "apiKey",
  
    authDomain: "authDomain",
  
    projectId: "projectId",
  
    storageBucket: "storageBucket",
  
    messagingSenderId: "messagingSenderId",
  
    appId: "appId"
  
  };


const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage();

const groups=collection(db,'groups');

export async function addGroupe(name,color,uid,group){
  let result=await addDoc(groups,{
     time:serverTimestamp(),
       name,
       color,
       owner:uid
   }); 
  //  updateDoc(doc(db,'groups',result.id),{
  //   id:result.id
  //  })
  let docu=doc(db,'users',uid);
  await updateDoc(docu,{
    groups:[...group,result.id]
  });
  return result
}
export function getGroups(uid,dispatch,fun){
  let docu=doc(db,'users',uid);
  onSnapshot(docu,(snapshot)=>{
    if (snapshot.exists()){
      dispatch(setUserGrp(snapshot.data().groups));
      let group=snapshot.data().groups;
      if (group.length===0){
         fun([]);
      }else{
        onSnapshot(groups,(snapshot)=>{
          let documents=snapshot.docs.filter((e)=>group.includes(e.id));
          fun(documents);
        })
      }
    }
  });

}
export function getNGroups(group,fun){
  if (group.length===0){
    onSnapshot(groups,(snapshot)=>{
      if (!snapshot.empty){
        fun(snapshot.docs);
      }
    })
  }else{
    onSnapshot(groups,(snapshot)=>{
      if (!snapshot.empty){
        let documents=snapshot.docs.filter((e)=>!group.includes(e.id));
      fun(documents);
      }
    })

  }

}

export function addUser(uid,group,docId){
       let docu=doc(db,'users',uid);
     return  updateDoc(docu,{
      groups:[...group,docId]
     })
}
export function addMessage(docId,name,uid,message,image){
    let coll=collection(db,'groups',docId,'messages');
   return addDoc(coll,{
        time:serverTimestamp(),
        name,
        uid,
        message,
        image
    })
}

export function getMessages(docId,fun){
  let coll=collection(db,'groups',docId,'messages');
  let collQ=query(coll,orderBy('time'));
  onSnapshot(collQ,(snapshot)=>{
      fun(snapshot);
  });
}
export function addNewUser(uid){
  let docu=doc(db,'users',uid);
  return setDoc(docu,{
    groups:[]
  })
}

export  function delRoom(uid,id,group){
  let docu=doc(groups,id);
  let docu2=doc(db,'users',uid);
  updateDoc(docu2,{
    group:[...group.filter((e)=>e!==id)]
  })  
  return deleteDoc(docu);
}

export function LeaveGr(uid,id,groups){
  let docu=doc(db,'users',uid);
  return updateDoc(docu,{
    groups:groups.filter((e)=> e!==id)
  })
}
export function delMess(gid,id){
  let docu=doc(db,'groups',gid,'messages',id);
  return deleteDoc(docu);
}
export function editMessage(id,gid,message){
  console.log(message);
  let docu=doc(db,'groups',gid,'messages',id);
  return updateDoc(docu,{
    message:message
  })
}

export function addImage(file,docId,name,uid){
  let imRef=ref(storage,'images/'+uuidv4());
  uploadBytes(imRef,file).then((e)=>{
    getDownloadURL(imRef).then((result)=>{
      addMessage(docId,name,uid,null,result);
    })
  })
}

export function delImage(url){
  let imRef=ref(storage,url);
  return deleteObject(imRef);
}
