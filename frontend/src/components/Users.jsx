import { useEffect, useState } from "react"
import { InputBox } from "./InputBox";
import { Buttons } from "./Buttons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// function useDebounce(filter){
//   const [debounce,setDebounce] = useState(filter)
// useEffect(()=>{
//     const reset = setInterval(()=>{
//         setDebounce(filter);
//     },500)
    
//    return ()=> clearInterval(reset);
// },[filter]);

// return debounce;

// }

export function Users(){
    const [users ,setUsers] = useState([]);
    const [filter,setFilter] =useState("");
    const [uid,setUid] = useState("");
    //useDebounce(filter);
   useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user/bulk",{
        params:{filter},
        headers:{ Authorization:"Bearer "+localStorage.getItem("token")}
    })
      .then(response=>{
        setUsers(response.data.user)
        setUid(response.data.userId)
      })
   },[filter])

    return <div>
        <div className="font-extrabold text-lg mt-6 m-2 mx-4">
                Users
        </div>
        <div className="m-3">
           <InputBox  onChange={(e)=>{
                setFilter(e.target.value) 
           }} placeholder={"search users...."} label={"Search"} />
        </div>
        <div>
            {users.map((user)=>{
                if(uid == user._id){
                    return null;
                }
                return <User key={user._id} user={user} />
            })}
        </div>

    </div>
}


function User({user}){
    const navigate = useNavigate();
    return <div className="mx-3 flex justify-between">
    <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-3 mr-2 ">
            <div className="flex flex-col justify-center h-full text-xl ">
                {user.firstname[0]}
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful ">
            <div>
                {user.firstname} {user.lastname}
            </div>
        </div>
    </div>

    <div className="pr-3 flex flex-col justify-center h-ful">
        <Buttons label={"Send Money"} onClick={()=>{
            navigate("/send?id="+user._id+"&name="+user.firstname);
        }} />
    </div>
</div>
}