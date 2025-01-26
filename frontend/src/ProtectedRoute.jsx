import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn,isLoading } = useSelector((state) => state.user);
 // console.log('in protected route ',isLoggedIn);
  if (!isLoggedIn && window.location.href === '/') {
    window.location.href = '/';
  }

  return children;
};

export default ProtectedRoute;
