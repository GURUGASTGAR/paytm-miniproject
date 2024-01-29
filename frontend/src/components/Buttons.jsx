

export function Buttons({label,onClick}){
    return <div>
        <button className="bg-gray-800 text-white font-bold rounded-md w-full h-10 px-10 my-5 me-9 hover:bg-gray-950 focus:ring-2 ring-gray-950"  onClick={onClick} >
            {label}</button>
    </div>
}