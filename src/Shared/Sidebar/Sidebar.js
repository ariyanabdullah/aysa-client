import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/AuthProvider";
import { ImNewspaper } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { FaHandPointRight, FaHandHoldingHeart } from "react-icons/fa";
const Sidebar = () => {
  const { user, LogOut } = useContext(authContext);
  // console.log(user);

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

  // console.log(userData);
  return (
    <div>
      <div className="">
        <div className="flex items-center p-2 space-x-4">
          <img
            src={userData?.photo}
            alt=""
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          />
          <div>
            <h2 className="text-lg font-semibold">{userData?.name}</h2>
            <span className="flex items-center space-x-1">
              <Link
                rel="noopener noreferrer"
                to="/about"
                className="text-xs hover:underline dark:text-white"
              >
                View profile
              </Link>
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-700">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className=" dark:text-gray-50">
              <Link
                to={`/users/following/`}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <span>
                  <FaHandPointRight />{" "}
                </span>
                <span>Following</span>
              </Link>
            </li>
            <li className=" dark:text-gray-50">
              <Link
                to={"/people"}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <span>
                  {" "}
                  <FiUsers />{" "}
                </span>
                <span>People</span>
              </Link>
            </li>
            <li className=" dark:text-gray-50">
              <Link
                to="/media"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <span>
                  <ImNewspaper className="text-xl text-white" />
                </span>
                <span>Media </span>
              </Link>
            </li>
            <li className=" dark:text-gray-50">
              <Link
                to="/users/followers/"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <span>
                  {" "}
                  <FaHandHoldingHeart />{" "}
                </span>
                <span>Followers </span>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li className=" dark:text-gray-50">
              <button
                onClick={() => LogOut()}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-white"
                >
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
