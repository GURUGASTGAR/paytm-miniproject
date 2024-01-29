import axios from "axios"
import { useEffect } from "react"


export function AppBar({fname}){
    return <div className="shadow h-14 flex justify-between">
        <div className=" flex flex-col text-sm font-bold h-full p-4 ml-4">
            PayTM App
        </div>
        <div className="flex justify-center ">
           <div className="font-bold flex flex-col justify-center h-full mr-4">Hello</div>
           <div className="bg-orange-400 rounded-full h-12 w-12 font-extrabold flex justify-center mt-1 mr-2">
               <div className="flex flex-col text-xl justify-center h-full">
                {fname.split("")[0]}
               </div>
           </div>
        </div>
    </div>
}