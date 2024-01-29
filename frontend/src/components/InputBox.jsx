

export function InputBox({placeholder,label,onChange}){
  return <div>
    <div className="text-sm font-medium m-1 text-left">{label}</div>
    <input onChange={onChange} className="w-full h-10 px-1 my-2 me-9 border rounded-md border-gray-600" type="text" placeholder={placeholder}></input>
  </div>
}