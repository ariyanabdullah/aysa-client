import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);
const Gprovider = new GoogleAuthProvider();

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Log In
  const SignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // GoogleRegister

  const GoogleRegister = () => {
    return signInWithPopup(auth, Gprovider);
  };

  //Register
  const Register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Log Out
  const LogOut = () => {
    return signOut(auth);
  };

  // updateuser

  const UpdateUser = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  // getUser

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const info = {
    user,
    SignIn,
    Register,
    LogOut,
    UpdateUser,
    GoogleRegister,
    loading,
  };

  return (
    <div>
      <authContext.Provider value={info}> {children} </authContext.Provider>
    </div>
  );
};

export default AuthProvider;
