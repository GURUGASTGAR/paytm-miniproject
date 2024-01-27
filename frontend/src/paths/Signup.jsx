import { Buttons } from "../components/Buttons"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"


export function Signup(){
    return <div>
        <Heading label={"Sign up"} />
        <Subheading label={"his is me"} />
        <InputBox placeholder="jhon" label={"First Name"} />  
        <InputBox placeholder="jhon" label={"First Name"} />   
        <Buttons label={"Sign Up"} /> 
    </div>
}