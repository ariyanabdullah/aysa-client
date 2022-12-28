import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FcGraduationCap, FcFeedback, FcBusinessContact } from "react-icons/fc";
import { authContext } from "../../Context/AuthProvider";
import AboutModal from "./AboutModal";

const About = () => {
  const { user } = useContext(authContext);
  // console.log(user);

  const [userInfo, setUserInfo] = useState(null);

  const email = user?.email;

  const url = `https://social-media-server-dun.vercel.app/user/${email}`;

  const { data: userData, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  // console.log(userInfo);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative  px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-24">
            <div className="max-w-md mx-auto">
              <div className="flex justify-evenly items-center md:block lg:block">
                <div className="avatar block">
                  <div className="w-[150px] mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={userData?.photo} alt="" />
                  </div>
                </div>
                <div className=" ">
                  <h2 className="text-xl text-center mt-2  font-semibold sm:text-2xl">
                    {userData?.name}
                  </h2>
                  <div className=" w-full">
                    <span className="flex items-center justify-center space-x-2  ">
                      <span>
                        <FcFeedback />
                      </span>
                      <span className=" sm:text-base text-center font-semibold dark:text-gray-500">
                        {userData?.email}
                      </span>
                    </span>
                  </div>

                  <div className=" w-full ">
                    <span className="flex items-center justify-center space-x-2  ">
                      <span>
                        <FcBusinessContact />
                      </span>
                      <span className=" sm:text-base text-center font-semibold dark:text-gray-500">
                        {userData?.address}
                      </span>
                    </span>
                  </div>

                  <div className=" w-full">
                    <span className="flex items-center justify-center space-x-2  ">
                      <span>
                        <FcGraduationCap />
                      </span>
                      <span className=" sm:text-base text-center font-semibold dark:text-gray-500">
                        {userData?.universite}
                      </span>
                    </span>
                  </div>

                  <div className=" justify-center w-full inline-flex  ">
                    {/* The button to open modal */}
                    <label
                      htmlFor="my-modal"
                      className="btn btn-link border-0 pl-4 pr-0"
                      onClick={() => setUserInfo(userData)}
                    >
                      Edit Info
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {userInfo && (
          <AboutModal
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            refetch={refetch}
          >
            {" "}
          </AboutModal>
        )}
      </div>
    </div>
  );
};

export default About;
