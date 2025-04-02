// components/auth/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/utils/authUtils";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then(user => {
      if (user) setIsAuthenticated(true);
      else navigate("/login");
    });
  }, []);

  return isAuthenticated ? <>{children}</> : null;
};
