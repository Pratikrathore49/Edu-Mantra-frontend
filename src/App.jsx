import { Route, Routes } from "react-router";
import "./App.css";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm";
import MainLayout from "./components/layouts/mainLayout/MainLayout";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import PopupLayout from "./popup/PopupLayout";
import Loader from "./components/ui/Loader";
import TeacherLayout from "./components/layouts/teacherLayout/TeacherLayout";
import AddQuestion from "./sections/teacher/AddQuestion";
import Paper from "./sections/teacher/Paper";

function App() {
  const isOpen = useSelector((state) => state.model.isOpen);

  return (
    <>
      <Routes>
        <Route path="/loader" element={<Loader />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        <Route path='/teacher' element={<TeacherLayout/>}>
           <Route index element={<h1>ram ram </h1>}/>
           <Route path='addQuestion' element={<AddQuestion/>}/>
           <Route path='paper' element={<Paper/>}/>
          </Route>
      </Routes>
     
      {isOpen && <PopupLayout />}
    </>
  );
}

export default App;
