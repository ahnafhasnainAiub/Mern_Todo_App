import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialValue = { name: "", email: "", _id: "", token: "" };

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authData, setAuth] = useState({
    ...initialValue,
    _id: localStorage.getItem("_id"),
    token: localStorage.getItem("token"),
  });
  const [user, setUser] = useState("");

  const storeTokenInLS = (value, key = "token") => {
    setAuth((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem(key, value);
  };

  useEffect(() => {
    console.log({ authData });

    if (authData._id && authData._id !== "null" && authData._id !== "undefined") {
      fetch(`http://localhost:8000/users/${authData._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?._id) {
            setAuth((prev) => ({ ...prev, ...data.data }));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [authData._id]);

  useEffect(() => {
    const userAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/owner", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("user data", data.userData);
          setUser(data.userData);
        }
      } catch (error) {
        console.error("Error fetching user Data", error);
      }
    };

    if (authData.token) {
      userAuthentication();
    }
  }, [authData.token]);

  const LogoutUser = () => {
    setAuth(initialValue);
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
  };

  return (
    <AuthContext.Provider value={{ authData, storeTokenInLS, LogoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }

  return authContextValue;
};
