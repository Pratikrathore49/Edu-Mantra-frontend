import { Route, Routes } from "react-router";
import "./App.css";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm";
import MainLayout from "./components/layouts/mainLayout/MainLayout";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
