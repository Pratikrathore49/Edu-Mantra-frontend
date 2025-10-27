import { Route, Routes } from "react-router";
import "./App.css";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm";
import LandingLayout from "./components/layouts/LandingLayout/LandingLayout";
import LandingPage from "./pages/LandingPage";
import { useDispatch, useSelector } from "react-redux";
import PopupLayout from "./popup/PopupLayout";
import Loader from "./components/ui/Loader";
import TeacherLayout from "./components/layouts/teacherLayout/TeacherLayout";
import AddQuestion from "./sections/teacher/AddQuestion";
import Papers from "./sections/teacher/Papers";
import Questions from "./sections/teacher/Questions";
import AddPaper from "./sections/teacher/AddPaper";
import ViewPaperPage from "./sections/teacher/ViewPaperPage";
import { useEffect } from "react";
import { checkUserAsync } from "./redux/auth/authSlice";
import LoginProtected from "./protected/LoginProtected";
import StudentLayout from "./components/layouts/studentLayout/StudentLayout";
import TeacherProtected from "./protected/TeacherProtected";
import PaperPageHeader from "./pages/PaperPageHeader";
import StudentTest from "./sections/paper/StudentTest";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const isOpen = useSelector((state) => state.model.isOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/loader" element={<Loader />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* student route started */}
        <Route
          path="/student" element={<LoginProtected> <StudentLayout /></LoginProtected>}>
          <Route index element={<h1>pratik </h1>} />
          <Route path="papers" element={<PaperPageHeader/>}/>
          <Route path="papers/test/:id" element={<StudentTest/>} />
        <Route path="profile" element={<ProfilePage/>}/>
        </Route>


        <Route
          path="/teacher"
          element={ <TeacherProtected><TeacherLayout /> </TeacherProtected> } >
          <Route index element={<h1>ram ram </h1>} />
          <Route path="addQuestion" element={<AddQuestion />} />
          <Route path="papers" element={<Papers />} />
          <Route path="questions" element={<Questions />} />
          <Route path="addPaper" element={<AddPaper />} />
          <Route path="papers/viewPaper/:id" element={<ViewPaperPage />} />
        </Route>
      </Routes>

      {isOpen && <PopupLayout />}
    </>
  );
}

export default App;
