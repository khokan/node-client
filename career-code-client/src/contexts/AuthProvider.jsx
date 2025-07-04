import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import toast from "react-hot-toast";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // button refresh waitn for loading to go to SignIn page

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        toast.success("Sign out successful");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser?.email) {
        const userData = { email: currentUser?.email };

        /****** if cookie storage is used in client side ***/
        // axios
        //   .post(`${import.meta.env.VITE_NODE_SERVER_URL}/jwt`, userData, {
        //     withCredentials: true,
        //   })
        //   .then((res) => {
        //     console.log("token after jwt", res.data);
        /****** if cookie storage is used in client side ***/

        /****** if local storage is used in client side ***/
        // const token = res.data.token;
        // console.log(token);
        // localStorage.setItem("token", token);
        /****** if local storage is used in client side ***/

        /****** if cookie storage is used in client side ***/
        // })
        //  .catch((err) => console.log(err));
        /****** if cookie storage is used in client side ***/
      }
      console.log("user in the auth state change", currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
    signInGoogle,
  };

  return (
    <div>
      <AuthContext value={userInfo}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
