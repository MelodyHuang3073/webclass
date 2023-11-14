'use client'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/app/_firebase/Config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext('email');
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const [email, setEmail] = useState('');  
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email ? user.email : "");
      }
      else {
        setEmail("");
      }
  
      //console.log(user);
      return () => {
        unsub();
      }
    }
    );
    useEffect(unsub, [unsub]);

  return (
    <AuthContext.Provider value={email}>
      {children}
    </AuthContext.Provider>
  );
};