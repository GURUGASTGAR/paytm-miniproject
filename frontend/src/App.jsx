import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./paths/Signup";
import { Signin } from "./paths/Signin";
import { Dashboard } from "./paths/Dashboard";
import { SendMoney } from "./paths/SendMoney";
function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element = {<Signup />} />
        <Route path="/signin" element = { <Signin />} />
        <Route path="/dashboard" element = { <Dashboard />} />
        <Route path="/send" element= {<SendMoney />}/>
      </Routes>
      
      </BrowserRouter>
        
    </div>
  )
}

export default App
