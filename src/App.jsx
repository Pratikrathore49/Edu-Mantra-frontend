import "./App.css";
import {lazy,Suspense,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import { checkUserAsync } from './redux/auth/authSlice';
 import LoginProtected from "./protected/LoginProtected";
 import TeacherProtected from "./protected/TeacherProtected";


//Ui

import PopupLayout from "./popup/PopupLayout";
import Loader from './components/ui/Loader'





//Auth Pages
const LoginForm = lazy(()=>import('./pages/auth/LoginForm'));
const SignupForm = lazy(()=>import ("./pages/auth/SignupForm"));

//Layouts 
const LandingLayout = lazy(()=>import('./components/layouts/LandingLayout/LandingLayout'))
const TeacherLayout = lazy(()=>import('./components/layouts/teacherLayout/TeacherLayout'))
const StudentLayout = lazy(()=>import('./components/layouts/studentLayout/StudentLayout'))

//Pages
const LandingPage = lazy(()=>import("./pages/LandingPage"))
const StuAllPaper = lazy(()=>import("./sections/paper/StuAllPaper"))

const StudentProfilePage = lazy(()=>import("./pages/StudentProfilePage"))
const PaymentPage = lazy(()=>import('./pages/PaymentPage'))

// Sections(teacher & student)
const AddQuestion = lazy(()=>import("./sections/teacher/AddQuestion"))
const Papers = lazy(()=>import("./sections/teacher/Papers"))
const Questions = lazy(()=>import("./sections/teacher/Questions"))
const AddPaper = lazy(()=>import("./sections/teacher/AddPaper"))
const ViewPaperPage =lazy(()=>import("./sections/teacher/ViewPaperPage"));
const StudentTest = lazy(()=>import('./sections/paper/StudentTest'));
const TeacherProfile = lazy(()=>import('./sections/teacher/TeacherProfile'));

const AllSubjectsPaper = lazy(()=>import('./sections/paper/AllSubjectsPaper'))




function App() {
  const isOpen = useSelector((state) => state.model.isOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);

  return (
    <>
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/loader" element={<Loader />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* student route started */}
        <Route
          path="/student" element={<LoginProtected > <StudentLayout /></LoginProtected>}>
          <Route index element={<h1>pratik </h1>} />
        
       
          <Route path="papers/test/:id" element={<StudentTest/>} />
        <Route path="profile" element={<StudentProfilePage/>}/>
        <Route path="payment" element={<PaymentPage/>}/>
         <Route path="allSubPaper" element={<AllSubjectsPaper/>}/> 
          <Route path="allSubPaper/papers/:subject" element={<StuAllPaper/>}/>
        </Route>


        <Route
          path="/teacher"
          element={ <TeacherProtected><TeacherLayout /> </TeacherProtected> } >
          <Route index element={<TeacherProfile/>} />
          <Route path="addQuestion" element={<AddQuestion />} />
          <Route path="papers" element={<Papers />} />
          <Route path="questions" element={<Questions />} />
          <Route path="addPaper" element={<AddPaper />} />
          <Route path="papers/viewPaper/:id" element={<ViewPaperPage />} />
         
        </Route>
      </Routes>

      {isOpen && <PopupLayout />}
      </Suspense>
    </>
  );
}

export default App;
