import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan,faCopy } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setEditing, setMenuO } from "../../features/TelegramSlice";
import { delMess } from "../firebase/storage";

function DotsMenu({client,messageId,message}) {
    let gid=useSelector((state)=>state.TeleR.selectedRoom.id);
    let editing=useSelector((state)=>state.TeleR.editing);
    let dispatch=useDispatch();
    document.addEventListener('contextmenu',(e)=>{
        if (e.target.offsetParent!==null&& e.target.offsetParent!==undefined){
            if ((e.target.classList.contains('icon'))||(e.target.offsetParent.classList.contains('menuO'))){
                e.preventDefault();
            } else if (!e.target.offsetParent.classList.contains('messageT')){
          dispatch(setMenuO(null));
        }}
      })
    document.addEventListener('click',(e)=>{
        if (!e.target.classList.contains('menuO')){
            dispatch(setMenuO(null));
           }
    })
    function deleteM(){
        if (editing!=null){
            dispatch(setEditing(null))
        }
         delMess(gid,messageId).then(()=>{
            dispatch(setMenuO(null));
         })
    }
    function editM(){
        dispatch(setEditing(null));
        dispatch(setEditing({message,gid,messageId}))
    }
    function copy(){
        navigator.clipboard.writeText(message);
        dispatch(setMenuO(null));
    }
    let vari={
        visible:{
            opacity:1,
            height:'auto',
            transition:{
                type:'tween',
                duration:0.25,
                when:'beforeChildren',
                staggerChildren:0.12

            }
        },
        hidden:{
            opacity:0,
            height:0,
            transition:{
                type:'tween',
                duration:0.15,
                when:'afterChildren',
                staggerChildren:0.05,
                staggerDirection:-1
            }
        }
    }
    let tVar={
        hidden:{
           opacity:0
        },
        visible:{
          opacity:1,
          transition:{
            type:'tween',
            duration:0.2,
          }
        }
    }

    return ( <motion.div
    variants={vari}
    initial='hidden'
    animate='visible'
    className="w-28  select-none bg-white dark:bg-[#17212b] py-2 mt-2 z-20 menuO absolute shadow-lg shadow-black/30 dark:text-white/80 text-black/80" style={{
        left:(window.innerWidth-112<client.x?(client.x-112):(client.x)),
        top:(window.innerHeight-128<=client.y?client.y-128:client.y)
    }} >
        <motion.div 
        variants={tVar}
        onClick={copy}
        className="cursor-pointer hover:bg-black/10 dark:hover:bg-white/25 flex items-center">
            <FontAwesomeIcon icon={faCopy} className='text-xl p-2 icon' />
            <h1>Copy</h1>
        </motion.div>
        <motion.div 
        variants={tVar}
        onClick={editM}
        className="cursor-pointer hover:bg-black/10 dark:hover:bg-white/25 flex items-center">
            <FontAwesomeIcon icon={faPen} className='text-xl p-2 icon' />
            <h1>Edit</h1>
        </motion.div>
        <motion.div
        variants={tVar}
        onClick={deleteM}
        className="cursor-pointer hover:bg-black/10 dark:hover:bg-white/25 flex items-center">
            <FontAwesomeIcon icon={faTrashCan} className='text-xl p-2 icon' />
            <h1>Delete</h1>
        </motion.div>
                 
    </motion.div> );
}

export default DotsMenu;

