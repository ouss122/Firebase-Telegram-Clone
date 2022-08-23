import { useEffect, useRef, useState } from "react";
import { editMessage } from "../firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { faCheck,faPaperclip,faPen,faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setEditing } from "../../features/TelegramSlice";
function EditMess({scRef}) {
  let data=useSelector((state)=>state.TeleR.editing);
  let texta=useRef(); 
  let dispatch=useDispatch();
  let [message,setMessage]=useState(data.message);
  useEffect(()=>{
     setMessage(data.message);
     texta.current.style.height='auto';
     texta.current.style.height=texta.current.scrollHeight+'px';  
  },[data])
    function editMess(){
      if (message.length!==0&&message!==data.message){
        editMessage(data.messageId,data.gid,message).then(()=>{
          dispatch(setEditing(null));
        })
      }
    }
    function cancelEdit(){
      dispatch(setEditing(null));
    }

    return ( 
      <div className="overflow-hidden relative ">
        <div className="flex items-end dark:bg-[#17212b]">
           <FontAwesomeIcon  icon={faPen} className='dark:text-[#5288c1] text-xl  mr-1 p-4'/>
           <div className="flex-grow overflow-hidden self-start mt-0.5">
             <h1 className="dark:text-[#6ab3f3] text-sm font-medium">Edit message</h1>
             <div className="text-white/70 break-all h-5 " >{data.message}</div>
           </div>
             <span className="text-white/70 self-center mt-4 relative right-0.5" >...</span>
            <FontAwesomeIcon onClick={cancelEdit} icon={faXmark} className='relative px-3 cursor-pointer text-3xl text-[#737e87]'/>
        </div>
        <div className="flex items-end relative bg-whiteM-background dark:bg-[#17212b]" >
        <FontAwesomeIcon icon={faPaperclip} className='h-9  ml-3 mb-2 cursor-pointer hover:text-whiteM-text/80 text-whiteM-text/70 dark:text-[#60676e] dark:hover:text-[#707b85]' />
        <textarea  onKeyDown={(e)=>{
           if (e.code==='Enter'&& !e.shiftKey){
            e.preventDefault();
            editMess();
          }
        }}
          ref={texta} required 
          value={message}
          onChange={(e)=>{
            setMessage(e.target.value);
            e.target.style.height='auto';
            e.target.style.height=e.target.scrollHeight+'px';  
        }}
          placeholder="Write a message ..."
          className="pr-5 pl-2 ml-4 w-4/5 text-sm mt-1 pt-1 appearance-none mb-1 outline-none bg-transparent text-whiteM-text dark:text-slate-50 resize-none min-h-8 max-h-[80px]" type="text" />
        <FontAwesomeIcon onClick={editMess} icon={faCheck} className='text-4xl cursor-pointer absolute bottom-2 right-4 text-[#5288c1]'/>
      </div>
      </div>
      
     );
}

export default EditMess;