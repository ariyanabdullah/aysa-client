import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import { authContext } from "../../Context/AuthProvider";

const imgHostkey = process.env.REACT_APP_imbb;

const Register = () => {
  const { GoogleRegister, UpdateUser, Register } = useContext(authContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLog = (data) => {
    // console.log(data);
    setLoading(true);
    const { name, email, versity, address, password } = data;
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?expiration=15552000&key=${imgHostkey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          setLoading(true);
          const image = imgData.data.url;
          const userInfo = {
            name,
            email,
            universite: versity,
            address: address,
            photo: image,
            following: [],
            followers: [],
          };
          Register(email, password)
            .then((userS) => {
              const user = userS.user;
              UpdateUser(name)
                .then((updated) => {
                  setLoading(false);
                  reset();
                  SaveUserInfo(userInfo);
                })
                .catch((error) => setError(error));
            })
            .catch((error) => {
              const errorMessage = error.message;

              setError(errorMessage);
            });
        }
      });

    // console.log(userInfo);
  };

  // Google Register

  const handleGoogle = () => {
    GoogleRegister()
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // console.log(user);

        const name = user?.displayName;
        const email = user?.email;
        const versity = "N/A";
        const address = "N/A";
        const photo = user?.photoURL;

        const userInfo = {
          name,
          email,
          universite: versity,
          address: address,
          photo: photo,
          following: [],
          followers: [],
        };

        SaveUserInfo(userInfo);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        setError(errorMessage);
        // ...
      });
  };

  // Post User Data to mongodb

  const SaveUserInfo = (UserData) => {
    fetch("https://social-media-server-dun.vercel.app/allUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("SuccessFully Registered");
          navigate("/");
        }
      });
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100  flex flex-col justify-center sm:py-12">
        <div className="relative py-3 mx-auto sm:max-w-xl sm:mx-auto w-[70%] lg:w-[40%] ">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Register</h1>
              </div>
              <form
                onSubmit={handleSubmit(handleLog)}
                className="divide-y divide-gray-200"
              >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {/* for name field */}
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      {...register("name", {
                        required: "Name is Required",
                      })}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Your Name"
                    />

                    {errors.name && (
                      <p className="text-amber-500 text-sm">
                        {" "}
                        {errors.name?.message}{" "}
                      </p>
                    )}
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Your Name
                    </label>
                  </div>

                  {/* for Email Field */}
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email field is Required",
                      })}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />

                    {errors.email && (
                      <p className="text-amber-500 text-sm">
                        {" "}
                        {errors.email?.message}{" "}
                      </p>
                    )}
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  {/* for Unniversity Name */}
                  <div className="relative">
                    <input
                      id="versity"
                      type="text"
                      {...register("versity", {
                        required: "University is Required",
                      })}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Your University"
                    />

                    {errors.versity && (
                      <p className="text-amber-500 text-sm">
                        {" "}
                        {errors.versity?.message}{" "}
                      </p>
                    )}
                    <label
                      htmlFor="versity"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Your University
                    </label>
                  </div>
                  {/* for Address */}
                  <div className="relative">
                    <input
                      id="address"
                      type="text"
                      {...register("address", {
                        required: "address is Required",
                      })}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Your Address"
                    />

                    {errors.address && (
                      <p className="text-amber-500 text-sm">
                        {" "}
                        {errors.address?.message}{" "}
                      </p>
                    )}
                    <label
                      htmlFor="address"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Your Address
                    </label>
                  </div>
                  {/* for image field */}
                  <div className="relative">
                    <label htmlFor="image" className=" p-0 m-0 font-semibold ">
                      {" "}
                      Photo
                    </label>
                    <input
                      type="file"
                      id="image"
                      {...register("image", {
                        required: "Image Field Is Required",
                      })}
                      placeholder="Upload Product Image"
                      className="w-full  text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    />
                    {errors.image && (
                      <p className="text-red-400 font-thin text-sm">
                        {" "}
                        {errors.image?.message}
                      </p>
                    )}
                  </div>
                  {/* For Password filed */}
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: " Password field is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password length should be at least 6 character",
                        },
                      })}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="text-amber-500 text-sm">
                        {" "}
                        {errors.password?.message}
                      </p>
                    )}
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <p className="text-amber-400 font-bold"> {error} </p>
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="btn btn-secondary btn-sm text-white rounded-md px-4 py-0"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
              <div>
                <h1>
                  Already Have An Accout?{" "}
                  <small className="text-secondary">
                    <Link to="/login"> Log In</Link>
                  </small>
                </h1>
              </div>
              <div className="divider">OR</div>
              <div className="relative">
                <button
                  onClick={handleGoogle}
                  className=" btn btn-outline btn-secondary text-white rounded-md px-2 py-1"
                >
                  Sign In with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
