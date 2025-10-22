import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const LoginProtected = ({ children }) => {
  const { user, loading, error } = useSelector((state) => state.auth);
  console.log("user",user)
  if (loading) return <div>Loading...</div>;
  if (error || !user) return <Navigate to="/" replace />;

  return children;
};
export default LoginProtected;
