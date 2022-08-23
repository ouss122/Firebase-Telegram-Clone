
import {   useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuO } from '../../features/TelegramSlice';
import DotsMenu from './dotsMenu';
import LoadingSm from './loadingSm';

function MessageStyle({time,message,isUser,id}) {
    let dispatch=useDispatch();
    const menuO=useSelector((state)=>state.TeleR.menuO);
    let [client,setClient]=useState(null);

   
    return ( 
        <div >
                            {
                          isUser?null:<h1 className='text-black/60  dark:text-white/60 ml-1'>{message.name}</h1>
                        }
                        <div 
                       
                        className={'flex w-full   '+(isUser?'justify-end':'')}>
                          <div
                          onTouchStart={(e)=>{
                            console.log(e);
                          }}
                           onContextMenu={(e)=>{
                              e.preventDefault();
                              dispatch(setMenuO(null));
                              dispatch(setMenuO(id));
                              console.log(e);
                              setClient({x:e.clientX,y:e.clientY});
                        }}
                          className={'px-4 py-1 rounded-lg order-2 my-1 relative '+(isUser?' bg-[#effdde] dark:bg-[#2b5278]  mr-2 rounded-tr-2xl rounded-br-none messageT ':' bg-[#ffffff] dark:bg-[#182533] rounded-tl-2xl  ml-1 rounded-bl-none')} >
                             <p   className={'text-black select-none xmd:select-auto dark:text-white break-words whitespace-pre-line pb-3 min-w-[14vw] xmd:min-w-[10vw] max-w-[50vw] xmd:max-w-[40vw]  '}>
                            {message.message}
                           </p>
                           
                           <div className={'text-sm absolute bottom-0 right-1 '+(isUser?'text-[#77bb6f]  dark:text-[#7e9ebe] ':'text-[#a3aeb8] dark:text-[#6a7b8b]')}>
                             {time===null?<LoadingSm/>:time}
                           </div>
                          </div>
                          <div>
                           {isUser &&menuO!==null && menuO===id&&  <DotsMenu client={client} messageId={id} message={message.message}/>}
                          </div>
                          
                            </div>
                          
                        </div>  

     );
}

export default MessageStyle;