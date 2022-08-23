
function Toggle({click}) {
    return ( <div  className=" bg-[#999999] dark:bg-[#5288c1] h-4 w-9 rounded-2xl absolute right-5" >
          <div 

          className={"bg-[#F5F5F5]  dark:bg-[#17212b] w-[22px] h-[22px] rounded-xl border-2 absolute top-[-3px] transition -right-1 duration-300 border-[#999999] dark:border-[#5288c1] "+(click?'-translate-x-full':'translate-x-0')}></div>
    </div> );
}

export default Toggle;