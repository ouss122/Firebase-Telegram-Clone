import { useEffect, useState,useRef } from 'react';
import { useDispatch } from 'react-redux';
import BackArrow from '../../assets/arrow';
import MessTyping from './messageTyping';
import { useSelector } from 'react-redux';
import {selectRoom, setEditing} from '../../features/TelegramSlice';
import {  delRoom, getMessages, LeaveGr } from '../firebase/storage';
import Loading from '../auth/loading';
import MessageStyle from './messStyle';
import EditMess from './editMess';
import ShowImage from './showImage';
import { motion } from 'framer-motion';

function SelectedR() {
    const selected=useSelector((state)=>state.TeleR.selectedRoom);
    let user=useSelector((state)=>state.TeleR.user);  
    let groups=useSelector((state)=>state.TeleR.userGr);
    let editing =useSelector((state)=>state.TeleR.editing);
    let [messages,setMessages]=useState([]);
    let [loading,setLoading]=useState(true);
    let ref=useRef();
    let dispatch=useDispatch();
    useEffect(()=>{
        dispatch(setEditing(null));
        if (selected!==null){
               if(!loading){
            setLoading(true)
        }
        getMessages(selected.id,(snapshot)=>{
             setMessages(snapshot.docs);
             setLoading(false);
        })
        }
        
     
    },[selected]);
    function handleClick(){
       if (selected.owner!==user.uid){
         LeaveGr(user.uid,selected.id,groups).then(()=>{
            dispatch(selectRoom(null));
         })
       }else{
        delRoom(user.uid,selected.id,groups).then(()=>{
            dispatch(selectRoom(null));
        })
       }
    }
    return ( 
        <motion.div
             exit={window.innerWidth<=700?
                {
                    x:'100vw',
                    opacity:0
                }:{}
             }
             transition={{
                type:'tween',
                duration:0.6               
             }}
        className="w-full flex h-full flex-col  absolute xmd:static z-10 " >
        <nav className=' bg-[#ffffff] relative dark:bg-[#17212b] flex-shrink-0 w-full flex items-center  shadow-sm h-12' >
        <BackArrow
             onClick={()=>{
               dispatch(selectRoom(null))
            }}
             className='visible xmd:hidden   ml-1 mt-[2px] cursor-pointer w-11 hover:fill-[#888888] fill-[#a3a3a3] dark:fill-[#56616b] dark:hover:fill-[#85888b]' />
            <div
             style={{
              backgroundColor:selected!==null?selected.color:null
             }}
             className='w-10 rounded-full ml-2 h-10 mr-2'>
               
             </div>
             <h1 className='text-black dark:text-white/60' >{selected!==null?selected.name:null}</h1>
    
             <h1 onClick={handleClick} className='absolute mt-0.5 right-2 hover:text-red-400 text-red-500 dark:text-red-600 font-mono cursor-pointer dark:hover:text-red-500 font-bold text-sm esm:top-2 esm:text-base' >
                   {selected===null?null:selected.owner===user.uid?'Delete this Room':'Leave the Group'}
            </h1>
        </nav>
        <div ref={ref} className="bg-gradient-to-br flex-grow scroll-smooth overflow-y-scroll dark:bg-[#0e1621] from-[#d1d68c] via-[#89b883] to-[#d1d68c] dark:from-transparent dark:via-transparent dark:to-transparent">
           {loading?<div className='flex h-full justify-center items-center' >
            <Loading/>
           </div>:(
            <div className='text-white/80 h-full w-full flex flex-col pt-1 px-0.5' >
                {messages.map((e)=>{
                    let message=e.data();
                    let date=new Date();
                    let time=null;
                    let isUser=user.uid===message.uid;
                    if(message.time!==null){
                        date.setTime(message.time.seconds *1000);
                         time=date.toLocaleTimeString([],{
                            hour:'2-digit',
                            minute:'2-digit',
                            hour12:true
                        });
                    }
                    if (message.image===null){
                        return (
                         <MessageStyle key={e.id} time={time} isUser={isUser} message={message} id={e.id} />   
                        )
                    }else{
                        return (
                            <ShowImage key={e.id} time={time} isUser={isUser} message={message} id={e.id} />
                        )
                    }
                })}
            </div>
           )}
        </div>
        <div className='w-full relative'>
        {editing!==null?<EditMess  scRef={ref}/>:<MessTyping scRef={ref}/>}
        </div>
    
     </motion.div>
     );
}

export default SelectedR;
