import { Route, Routes } from "react-router-dom";
import "./App.css";
import Registration from "./Components/Features/Registration";
import MainLayout from "./Components/Layout/MainLayout";
import Home from "./Pages/Home";
import LoginForm from "./Components/Features/LoginForm";

function App() {
  return (
  <Routes>
    <Route>
      <Route path='/' element={<MainLayout/>}/>
      <Route index element={<Home/>}/>
      <Route  path='login' element={<LoginForm/>} />
      <Route  path='signup' element={<Registration/>}/>
    </Route>
  </Routes>
  );
}

export default App;
