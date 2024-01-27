

export function InputBox({placeholder,label}){
  return <div>
    <h3 className="font-bold mt-2 mb-1">{label}</h3>
    <input className="p-2 w-[270px] h-10 rounded-md" type="text" placeholder={placeholder}></input>
  </div>
}