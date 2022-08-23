import { useState } from 'react';
import { addGroupe } from '../firebase/storage';
import { useSelector } from 'react-redux';
import { CirclePicker } from 'react-color';
import PopUp from '../popup';
function NewGr({setNewGr}) {
  let groups=useSelector((state)=>state.TeleR.userGr);
  let user=useSelector((state)=>state.TeleR.user);
  let [groupe,setGroupe]=useState('');
  let [color,setColor]=useState('#2196f3');
  let [error,setError]=useState(false);
  function typing(e){
    setError(false);
    setGroupe(e.target.value);
  }
  function addGr(){
    if (groupe.length===0){
      setError(true);
    }else{
      addGroupe(groupe,color,user.uid,groups).then(()=>{
          setNewGr(false)
        })
    }
    }
    return ( 
      <PopUp setPopUp={setNewGr}>
              <div className='flex items-center'>
         <div className='w-10 h-10 rounded-full'
         style={{
          backgroundColor:color
         }}
         ></div>
        <input onChange={(e)=>typing(e)} autoFocus={true} value={groupe} placeholder='Group Name' className='bg-[#f1f1f1] dark:bg-[#242f3d] outline-none text-black/75 dark:text-white/70 px-2 rounded-lg ml-[5%] w-3/4 py-1' type="text" />
      </div>
        {error && (
          <h1 className=' text-black dark:text-white/70 ml-14' >
             Group name is required
          </h1>
        )}
       <CirclePicker color={color} onChange={(color)=>{
        setColor(color.hex);
       }} className='mt-6 mx-3' />
      <button onClick={addGr} className='bg-[#89b883] hover:bg-[#b6ddb1] dark:bg-white/70 absolute bottom-4 right-4 px-10 py-0.5  rounded-2xl dark:text-[#17212b] dark:hover:bg-white/50' >Add</button>
      </PopUp>
  
  );
}

export default NewGr;