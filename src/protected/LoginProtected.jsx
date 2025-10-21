
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const LoginProtected = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  if (loading) return <div>Loading...</div>;
  if (error || !user) return <Navigate to="/login" replace />;
  return <Navigate to="/student" replace />;
};
export default LoginProtected;
