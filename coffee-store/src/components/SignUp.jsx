import React, { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const SignUp = () => {
  const { createUser, signInGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const [result, setResult] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restData } = Object.fromEntries(
      formData.entries()
    );

    // const email = formData.get('email')
    // const password = formData.get('password')

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
        console.log(result.user);

        const userProfile = {
          email,
          ...restData,
          creationTime: result.user?.metadata.creationTime,
        };

        axios.post("http://localhost:5000/users", userProfile).then((data) => {
          console.log(data.data);
        });

        // save profile into database
        // fetch("http://localhost:5000/users", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "Application/json",
        //   },
        //   body: JSON.stringify(userProfile),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     if (data.insertedId)
        //       console.log("after creating profile in the database", data);
        //     Swal.fire({
        //       position: "top-end",
        //       icon: "success",
        //       title: "data been saved",
        //       showConfirmButton: false,
        //       timer: 1500,
        //     });
        //   });

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
      <div className="flex justify-center items-center">
        <div className="card w-full max-w-sm shrink-0 shadow-2xl py-3">
          <h2 className="font-semibold text-xl text-center">SignUp Page</h2>
          <form onSubmit={handleSignUp} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
                required
              />
              {/* <label className="label">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="input"
                placeholder="Photo url"
                required
              /> */}
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
              {/* <label className="label">Address</label>
              <div>
                <input
                  type="text"
                  name="address"
                  className="input"
                  placeholder="Address"
                />
              </div> */}
              <button type="submit" className="btn btn-primary mt-4">
                SignUp
              </button>
              <p className="mt-2 text-center">
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </p>
                )}
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
