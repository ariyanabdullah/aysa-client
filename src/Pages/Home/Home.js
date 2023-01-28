import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { authContext } from "../../Context/AuthProvider";
import SingleCard from "../SingleCard/SingleCard";
const imgHostkey = process.env.REACT_APP_imbb;
const Home = () => {
  const { user } = useContext(authContext);
  // console.log(user);

  const [loading, setLoading] = useState(false);

  const email = user?.email;

  const url = `https://social-media-server-dun.vercel.app/user/${email}`;

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  // get the previous Post

  const { data: postData, refetch } = useQuery({
    queryKey: ["postData"],
    queryFn: async () => {
      const res = await fetch(
        "https://social-media-server-dun.vercel.app/allpost?limit=3"
      );
      const data = await res.json();
      return data;
    },
  });

  // console.log(userData.email);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handlePost = (data) => {
    // console.log(data);
    setLoading(true);
    const userEmail = userData?.email;
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
          const Description = data?.Description;
          const like = 0;
          const postData = {
            image: image,
            Description: Description,
            like: like,
            userEmail: userEmail,
          };

          // post data to mongoDb Server

          fetch("https://social-media-server-dun.vercel.app/allpost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Successfully Posted");
                setLoading(false);
                reset();
              }
            });

          // console.log(postData);
        }
      });
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="mb-3"></div>
        <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7">
          <div></div>
          <div className="col-span-3">
            <div className="border py-4 dark:bg-white px-3 rounded-md">
              <form onSubmit={handleSubmit(handlePost)}>
                {/* Post text */}
                <div className="my-4 text-sm">
                  <textarea
                    type="text"
                    rows={1}
                    {...register("Description", {
                      required: " This Field Is Required",
                      minLength: {
                        value: 10,
                        message: "Description Should be At least 10 character",
                      },
                    })}
                    placeholder="Add Your Post Here"
                    className="w-full px-1 py-2 border border-x-0 border-t-0 font-semibold focus:border-x-0 focus:border-t-0 focus:border focus:outline-none focus:border-[#570df8]"
                  />
                  {errors.Description && (
                    <p className="text-red-400 font-thin text-sm">
                      {" "}
                      {errors.Description?.message}{" "}
                    </p>
                  )}
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
                    className=" file-input file-input-bordered file-input-primary w-full focus:outline-none "
                  />
                  {errors.image && (
                    <p className="text-red-400 font-thin text-sm">
                      {" "}
                      {errors.image?.message}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm text-white rounded-md px-4 py-0"
                  >
                    {loading ? (
                      <>
                        <BeatLoader color="#fff" />{" "}
                      </>
                    ) : (
                      <>post </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-12">
              {postData?.map((pd) => (
                <SingleCard
                  refetch={refetch}
                  key={pd._id}
                  postData={pd}
                ></SingleCard>
              ))}
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
