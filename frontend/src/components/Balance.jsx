

export function Balance({amount}){
    return <div className="flex justify-start">
    <div className="mx-3 m-2 flex flex-col justify-center font-bold text-lg ">
        Your Balance
    </div>
    <div className=" m-2 flex flex-col justify-center font-semibold text-lg ">
        Rs {amount}/.
    </div>
    </div>
}