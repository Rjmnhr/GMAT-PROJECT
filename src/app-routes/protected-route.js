import { useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const accessToken = localStorage.getItem("adefteducation_accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const VerifyToken = async () => {
    try {
      const res = await fetch(
        "https://adeftbackend1-7xwgos42.b4a.run/api/token/verify",
        // "http://localhost:8003/api/token/verify",
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.log(err);
      // Handle the error here or return an error response if needed
      setIsAuthenticated(false);
    }
  };

  VerifyToken();

  if (isAuthenticated !== null) {
    if (isAuthenticated) {
      return element;
    } else {
      // Redirect to the login page if not authenticated

      return <Navigate to="/login" />;
    }
  }
};

export default ProtectedRoute;
