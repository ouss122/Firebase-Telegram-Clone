import {useDispatch, useSelector} from 'react-redux'
import Loading from '../auth/loading';
import { motion } from 'framer-motion';
import { useEffect,useState } from 'react';
import { getGroups } from '../firebase/storage';
import { selectRoom } from '../../features/TelegramSlice';



function ShowGr({grSearch}) {
    let user=useSelector((state)=>state.TeleR.user);
    const selected=useSelector((state)=>state.TeleR.selectedRoom);
    let [groups,setGroups]=useState(null);
    let dispatch=useDispatch();
    useEffect(()=>{
      
        getGroups(user.uid,dispatch,(docs)=>{
            setGroups(docs);           
        });
       
      },[]);
    function emptyGr(){
      setTimeout(()=>{
        dispatch(selectRoom(null));
      },500)
      return (
         <div className='text-black dark:text-white/70 flex justify-center items-center h-full'>
          You don't have any group 
          <br />
          Join or create one from the menu
        </div>
      )
    }
    let groups1=[]
    if (grSearch!==''){
      groups1=groups.filter((e)=>e.data().name.includes(grSearch))
    }else{
      groups1=groups
    }
    return ( 
        <div className="bg-white dark:bg-[#17212b] h-full overflow-y-scroll pb-20 w-full" >
         {(groups===null)?(
          <div  className='flex justify-center items-center h-full ' >
            <Loading/>
          </div>
         ):groups.length===0?emptyGr()
         :groups1.length===0?
         <div className='text-black dark:text-white/70 flex justify-center items-center h-full'>
            No result found
       </div>
         :(
          <div className='mt-1'>
            {groups1.map((e)=>{
              let data=e.data();
              return (
                <motion.div
                key={e.id}
                initial={{
                x:'-100vw',
               }}
               animate={{
                x:0
               }}
                onClick={()=>{
                  if (selected===null || selected.id!==e.id){
                    dispatch(selectRoom({name:data.name,id:e.id,color:data.color,owner:data.owner}))
                  }
                }}
                className={'flex items-center cursor-pointer py-2 hover:bg-black/10 dark:hover:bg-white/10 '+(selected===null?'':selected.id===e.id?'bg-[#6eaed6] dark:bg-[#2b5278]':'')} >
                  <div 
                  className='rounded-full h-12 ml-2 w-12'
                  style={{
                    backgroundColor:data.color
                  }}
                  ></div>
                  <h1 className='dark:text-white/70  text-black/80 w-4/5 px-3 py-4 ' >
                {data.name}
              </h1>
                </motion.div>
              )
            })}
          </div>
         )}
    
        </div>
     );
}

export default ShowGr;