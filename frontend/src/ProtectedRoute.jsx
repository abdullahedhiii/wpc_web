import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  console.log('in protected route ',isLoggedIn);
  if (!isLoggedIn) {
    window.location.href = '/';
  }

  return children;
};

export default ProtectedRoute;
