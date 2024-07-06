import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Registration from "./pages/Registration";
import { AuthProvider } from "./store/auth";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

function App() {


  return (
    <>
      
      <BrowserRouter>
      <AuthProvider>
        <Navbar/>
         <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/dashboard" element={<Dashboard/>} />
           <Route path="/about" element={<About/>} />
           <Route path="/contact" element={<Contact/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/registration" element={<Registration/>} />
           <Route path="/logout" element={<Logout/>} />
           <Route path="/add" element={<Add/>} />
           <Route path="/edit/:id" element={<Edit/>} />
           <Route path="*" element={<Error/>} />
         </Routes>
        <Footer/>
        </AuthProvider>
      </BrowserRouter>
      
    </>
  )
}

export default App
