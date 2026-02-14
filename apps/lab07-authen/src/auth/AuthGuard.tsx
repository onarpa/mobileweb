import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "./auth-service";
import { JSX } from "react/jsx-runtime";

interface Props {
  children: JSX.Element;
}

const AuthGuard: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const u = await authService.getCurrentUser();
      setUser(u);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return null;

  if (!user) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default AuthGuard;