import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
//import { response } from "express";


export function Dashboard(){
  const [balance ,setBalance] = useState(0)
  const [uname, setUname]=useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization:"Bearer " + localStorage.getItem("token")
            }
        })
           .then(response =>{
            setBalance(response.data.balance);
            setUname(response.data.userName);
           })
    },[balance])

    return <div className="bg-white rounded-md">
        <AppBar fname={uname}/>
        <Balance amount={balance} />
        <Users />
    </div>
}