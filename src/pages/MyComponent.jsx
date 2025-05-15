import { useUser } from "@civic/auth-web3/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function MyComponent() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  if (!user) return <div>User not logged in</div>;

  return <div>Hello {user.name}!</div>;
}
