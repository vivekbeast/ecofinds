// "use client";
// import { createContext, useContext, useState, useEffect, useCallback } from "react";

// const AuthContext = createContext({
//   isAuthenticated: null,
//   userId: null,
//   setAuth: () => {},
// });

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState(null);

//   // On mount, check localStorage
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const id = localStorage.getItem("userId");

//     if (token && id) {
//       setIsAuthenticated(true);
//       setUserId(id);
//     }
//   }, []);

//   const setAuth = useCallback((token, id) => {
//     if (token && id) {
//       localStorage.setItem("token", token);
//       localStorage.setItem("userId", id);
//       setIsAuthenticated(true);
//       setUserId(id);
//     } else {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       setIsAuthenticated(false);
//       setUserId(null);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, userId, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

type AuthCtx = {
  isAuthenticated: boolean;
  userId: string | null;
  setAuth: (token: string | null, id: string | null) => void;
};

const AuthContext = createContext<AuthCtx>({
  isAuthenticated: false,
  userId: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize from localStorage on first client render
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    return !!(token && id);
  });

  const [userId, setUserId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("userId");
  });

  const setAuth = useCallback((token: string | null, id: string | null) => {
    if (token && id) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      setIsAuthenticated(true);
      setUserId(id);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      setUserId(null);
    }
  }, []);

  // Keep state in sync if localStorage changes in another tab/window
  useEffect(() => {
    const onStorage = () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");
      setIsAuthenticated(!!(token && id));
      setUserId(id || null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
