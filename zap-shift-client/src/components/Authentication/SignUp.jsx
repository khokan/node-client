import React, { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Lottie from "lottie-react";
import signupLottie from "../../assets/signupLottie.json";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";


const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const { createUser, signInGoogle } = use(AuthContext);

    const onSubmit = (data) => {
      console.log(data);
      console.log(createUser)
      createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error)
      });
    }

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restData } = Object.fromEntries(
      formData.entries()
    );

    // const email = formData.get('email')
    // const password = formData.get('password')


    
  };

  const handleSignInGoogle = () => {
    signInGoogle()
      .then((result) => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        
      });
  };


  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse justify-center items-center">
        <div className="w-[300px] md:w-[450px]">
          <Lottie animationData={signupLottie} loop={true} />
        </div>
        <div className="card w-full max-w-sm shrink-0 shadow-2xl py-3">
          <h2 className="font-semibold text-xl text-center">SignUp Page</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
                required
              />
              <label className="label">Email</label>
              <input
                type="email" {...register('email')}
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password" {...register('password',{required:true, minLength: 6})}
                  className="input"
                  placeholder="Password"
                  required
                />
                {
                  errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>
                }
                {
                  errors.password?.type === 'minLength' &&  <p className="text-red-500">Password must be 6 characters or longer</p>
                }
                <button
                  type="button"
                  className="btn btn-xs absolute top-2 right-7"
                >
                </button>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                SignUp
              </button>
              <p className="mt-2 text-center">               
                Already Have An Account ?{" "}
                <Link className="text-secondary" to="/SignIn">
                  SignIn
                </Link>
              </p>
              <button
                onClick={handleSignInGoogle}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <FaGoogle />
                SignIn with Google
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
