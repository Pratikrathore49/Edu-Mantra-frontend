import { Route, Routes } from "react-router-dom";
import "./App.css";



import MainLayout from "./components/mainLayout/MainLayout";

import Header from "./components/mainLayout/Header";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";

function App() {
  return (
  <Routes>
       <Route  path='login' element={<LoginForm/>} />
      <Route  path='signup' element={<SignupForm/>}/>
    <Route>
      <Route path='/' element={<MainLayout/>}/>
      <Route index element={<Header/>}/>

    </Route>
  </Routes>
  );
}

export default App;
