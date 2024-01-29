import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Buttons } from "../components/Buttons"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import axios from "axios"


export function Signin(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    
   async function handleClick(){
    
    if(!username || !password){
      alert("please fill all fields");
      return;
    }
       try{
        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
         username,
         password    
        });
        if(response.data.status == 200){
          console.log(response.data.msg);
          
        }
        localStorage.setItem("Email",username)
        localStorage.setItem('token',response.data.token);
        console.log(response.status)
        navigate("/dashboard");
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
    return <div>
        <div className="h-screen flex justify-center"> 
        <div className="flex flex-col justify-center">
         <div className="w-[400px] bg-white text-center p-2 h-max px-4 rounded-md shadow-md shadow-black">
          <Heading label={"Sign in"} />
          <Subheading label={"Enter your information to sign into your account"} />
          <InputBox onChange={(e)=>{
            setUsername(e.target.value)
          }} placeholder="name@gmail.com" label={"Email"} />
          <InputBox onChange={(e)=>{
            setPassword(e.target.value)
          }} placeholder="12345" label={"Password"} />   
          <Buttons onClick={handleClick} label={"Sign in"} /> 
          <BottomWarning label={"Dont have an account?"} Buttonlink={"Sign Up"} to={"/signup"} />
         </div>
        </div>
    </div>
    </div>
}