import { useEffect, useRef, useState } from "react";
import send from '../../assets/send.png';
import { motion,AnimatePresence } from 'framer-motion';
import { addImage, addMessage } from "../firebase/storage";
import { useSelector } from "react-redux";
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MessTyping({scRef}) {
  const selected=useSelector((state)=>state.TeleR.selectedRoom);
  let user=useSelector((state)=>state.TeleR.user);  
  let texta=useRef();
  let fileR=useRef();
  let [message,setMessage]=useState('');
  useEffect(()=>{
    texta.current.style.height='auto';
  },[selected])
    function addMess(){
      if (message.length!==0){
        addMessage(selected.id,user.name,user.uid,message,null).then(()=>{
          setMessage('');
          texta.current.style.height='auto';
          scRef.current.scrollTo(0,scRef.current.scrollHeight);
        })
      }
    }
    return ( 
        <div className="flex items-end relative bg-[#ffffff] dark:bg-[#17212b]" >
        <input 
        accept="image/*"
        onChange={(e)=>{
          addImage(e.target.files[0],selected.id,user.name,user.uid);  
        }}
        ref={fileR}  type="file" className="hidden" />
        <FontAwesomeIcon
        onClick={()=>{
          
          fileR.current.click();
        }}
        icon={faPaperclip} className='h-9  ml-3 mb-2 cursor-pointer hover:text-whiteM-text/80 text-whiteM-text/70 dark:text-[#60676e] dark:hover:text-[#707b85]' />
        <textarea
        autoFocus={true}
        onKeyDown={(e)=>{
           if (e.code==='Enter'&& !e.shiftKey){
             e.preventDefault();
             addMess();
           }
        }} ref={texta} required 
          value={message}
          onChange={(e)=>{
            setMessage(e.target.value);
            e.target.style.height='auto';
            e.target.style.height=e.target.scrollHeight+'px';  
        }}
          placeholder="Write a message ..."
          className="px-5 ml-4 w-4/5 text-sm mt-1 pt-1 appearance-none mb-1 outline-none bg-transparent text-whiteM-text dark:text-slate-50 resize-none min-h-8 max-h-[80px]" type="text" />
          <div className="absolute right-3  mb-2 flex" >
          <AnimatePresence>

          {
            message.length!==0 && 
            <motion.img
            initial={{
              scale:0
            }} 
            animate={
              {
                scale:1
              }
            }
            exit={{
              scale:0
            }}
            onClick={addMess}
            className={'h-9  cursor-pointer '} src={send} alt="" />
          }
          </AnimatePresence>
        
          </div>

      </div>
     );
}

export default MessTyping;
