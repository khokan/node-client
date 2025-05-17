import React, { use, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signInUser, signInGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const emailRef = useRef();
  const [result, setResult] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");
    setResult(false);
    signInUser(email, password)
      .then((result) => {
        setResult(true);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignInGoogle = () => {
    setError("");
    setResult(false);
    signInGoogle()
      .then((result) => {
        setResult(true);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleForgetPass = () => {
    const email = emailRef.current.value;
    navigate("/forgot-password", { state: { email } });
  };


useEffect(() => {
  if (error) {
    toast.error(error);
  }
  if (result) {
    toast.success("Logged In Successfully");
  }
}, [error, result]);

  return (
    <>
      <Helmet>
        <title>Login | Subscription Box</title>
      </Helmet>
      <div className="flex justify-center items-center mt-2 ">
        <div className="card w-full max-w-sm shrink-0 shadow-2xl py-5 bg-[#f0e9ff]">
          <h2 className="font-semibold text-xl text-center">Login Page</h2>
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                ref={emailRef}
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />
              <div onClick={handleForgetPass}>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Login
              </button>
              <button
                onClick={handleSignInGoogle}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <FaGoogle />
                Login with Google
              </button>
              <p className="mt-2 text-center">
                Don’t Have An Account ?{" "}
                <Link className="text-secondary" to="/registration">
                  Register
                </Link>
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
              </p>
           
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
