import { useEffect, useState } from "react";
import { addUser, getNGroups } from "../firebase/storage";
import PopUp from "../popup";
import { useSelector } from "react-redux";
import Loading from "../auth/loading";
function JoinGr({setJoinGr}) {
    let user=useSelector((state)=>state.TeleR.user);
    let group=useSelector((state)=>state.TeleR.userGr);
    let [groups,setGroups]=useState([]);
    let [loading,setLoading]=useState(true);
    useEffect(()=>{
        getNGroups(group,(data)=>{
            setGroups(data);
            setLoading(false);
        })
    },[]);
    function addToGr(docId){
        addUser(user.uid,group,docId).then(()=>{
            setJoinGr(false);
        })
    }
    let [grSearch,setGrSearch]=useState('');
    let groups1=[]
    if (grSearch===''){
        groups1=groups
    }else{
      groups1=groups.filter((e)=>e.data().name.includes(grSearch))
    }
    return ( <PopUp setPopUp={setJoinGr}>
         <input autoFocus={true} onChange={(e)=>setGrSearch(e.target.value) } placeholder="search" className= 'bg-[#f1f1f1] dark:bg-[#242f3d] px-2 text-black/75 dark:text-white/60 mx-2 rounded-md w-11/12 outline-none h-7' type="text" />
         <div className="  pt-10">
                  {loading?<div className="flex justify-center items-center">
                    <Loading/>
                  </div>:groups.length===0?<h1 className="text-black dark:text-white/70 text-center" >
                         There is available groups to join
                  </h1>:groups1.length===0?
                  <h1 className="text-black dark:text-white/70 text-center" >
                  No result found
               </h1>:groups1.map((e)=>{
                         let data=e.data();
                         return (
                            <div
                            key={e.id}
                            onClick={()=>{
                                addToGr(e.id)
                            }}
                            className='flex rounded-xl items-center cursor-pointer py-4 hover:bg-gray-200 dark:hover:bg-white/10 ' >
                              <div 
                              className='rounded-full h-12 ml-2 w-12'
                              style={{
                                backgroundColor:data.color
                              }}
                              ></div>
                              <h1 className='dark:text-white/70  w-4/5 px-3 py-4 ' >
                            {data.name}
                          </h1>
                            </div>
                         )
                   })}
         </div>
    </PopUp> );
}

export default JoinGr;