import { Link } from "react-router-dom";


export function BottomWarning({label,Buttonlink,to}){
    return <div className="mx-4 my-1 text-sm flex justify-center ">
        <div>{label}</div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>{Buttonlink}</Link>
    </div>
}