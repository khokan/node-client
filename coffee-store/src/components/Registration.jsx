import React, { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Registration = () => {
  const { createUser, signInGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const [result, setResult] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");
    setResult(false);

    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (passwordRegEx.test(password) === false) {
      setError(
        "Must have atleast 6 characters, one lowercase letter and one uppercase letter"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        setResult(true);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignInGoogle = () => {
    signInGoogle()
      .then((result) => {
        setResult(true);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (result) {
      toast.success("Successfully Registerd");
    }
  }, [error, result]);

  return (
    <>
      <Helmet>
        <title>Registration | Subscription Box</title>
      </Helmet>
      <div className="flex justify-center items-center">
        <div className="card bg-[#f0e9ff] w-full max-w-sm shrink-0 shadow-2xl py-3">
          <h2 className="font-semibold text-xl text-center">
            Registration Page
          </h2>
          <form onSubmit={handleRegistration} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="name`"
                className="input"
                placeholder="Name"
                required
              />
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="input"
                placeholder="Photo url"
                required
              />
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className="btn btn-xs absolute top-2 right-7"
                >
                  {visible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Registration
              </button>
              <p className="mt-2 text-center">
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                Already Have An Account ?{" "}
                <Link className="text-secondary" to="/login">
                  Login
                </Link>
              </p>
              <button
                onClick={handleSignInGoogle}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <FaGoogle />
                Login with Google
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
