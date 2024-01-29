import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Buttons } from "../components/Buttons"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export function Signup(){
    const [firstname,setFirstname]=useState("");
    const [lastname,setlastname]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    
   async function handleClick(){
    
    if(!firstname || !lastname || !username || !password){
      alert("please fill all fields");
      return;
    }
       try{
        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
         username,
         firstname,
         lastname,
         password    
        });
        if(response.data.status == 200){
          console.log(response.data.msg);
          
        }
        localStorage.setItem("Email",username)
        localStorage.setItem('token',response.data.token);
        console.log(response.status)
        navigate("/signin");
      }
      catch(error){
        if (error.response && error.response.data) {
          //console.log(error.response.data)
          // If the server provides a detailed error message
          const errorMessage = error.response.data.msg;
          alert(errorMessage);
        } else if (error.message) {
          // If there's a generic error message from Axios or the network
          alert(error.message);
        } else {
          // If no specific error message is available
          alert('An unknown error occurred');
        }
      }
       
    }

    return <div className="h-screen flex justify-center"> 
        <div className="flex flex-col justify-center">
         <div className="w-[400px] bg-white text-center p-2 h-max px-4 rounded-md shadow-md shadow-black">
          <Heading label={"Sign up"} />
          <Subheading label={"Enter your information to create an account"} />
          <InputBox onChange={e=>{setFirstname(e.target.value)}} placeholder="jhon" label={"First Name"} />  
          <InputBox onChange={e=>{setlastname(e.target.value)}} placeholder="jhon" label={"Last Name"} />
          <InputBox onChange={e=>{setUsername(e.target.value)}} placeholder="name@gmail.com" label={"Email"} />
          <InputBox onChange={e=>{setPassword(e.target.value)}} placeholder="12345" label={"Password"} />   
          <Buttons onClick={handleClick} label={"Sign Up"} /> 
          <BottomWarning label={"Already have an account?"} Buttonlink={"Sign in"} to={"/signin"} />
         </div>
        </div>
    </div>
}