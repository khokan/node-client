import React, { use, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import signinLottie from "../../assets/signInLottie.json";
import Lottie from "lottie-react";
import authImage from "../../assets/authImage.png";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const { signInUser, signInGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState(false);

  const onSubmit = (data) => {
    console.log(data)
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setResult(false);
    signInUser(email, password)
      .then((result) => {
        setResult(true);

        const signInInfo = {
          email: email,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };
        navigate(location?.state || "/");
      })
      .catch((error) => {
      });
  };

  const handleSignInGoogle = () => {
    setResult(false);
    signInGoogle()
      .then((result) => {
        setResult(true);

        navigate(location?.state || "/");
      })
      .catch((error) => {
      });
  };

  const handleForgetPass = () => {
    const email = emailRef.current.value;
    navigate("/forgot-password", { state: { email } });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse justify-center items-center mt-2 mx-auto ">
        <div className="w-[300px] md:w-[450px]">
          <img src={authImage} alt="" />
        </div>
        <div className="card w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold text-xl text-center">SignIn Page</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"                
                name="email"
                {...register('email', {required: true})}
                className="input"
                placeholder="Email"
              />
              {
                errors.email?.type == 'required' && <p className="text-red-500">email required</p>
              }
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                {...register('password', {required: true, minLength: 6})}
                className="input"
                placeholder="Password"
              />
              {
                errors.password?.type == 'minLength' && <p className="text-red-500">Password must be 6 characters</p>
              }
              <div onClick={handleForgetPass}>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                SignIn
              </button>
              <button
                onClick={handleSignInGoogle}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <FaGoogle />
                SignIn with Google
              </button>
              <p className="mt-2 text-center">
                Don’t Have An Account ?{" "}
                <Link className="text-secondary" to="/SignUp">
                  Sign Up
                </Link>
               
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
