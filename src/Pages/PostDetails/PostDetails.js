import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaUserCircle, FaThumbsUp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const PostDetails = () => {
  const data = useLoaderData();
  const [comments, setComments] = useState([]);
  const { image, Description, like, userEmail, _id } = data;

  useEffect(() => {
    fetch(`https://social-media-server-dun.vercel.app/allcomments/${_id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [_id]);

  return (
    <div>
      <div className="w-[70%] mt-2 p-6 bg-white rounded-sm mx-auto">
        <div>
          <img src={image} className="rounded-md" alt="" />
          <div>
            <p className="flex mt-2 items-center justify-start">
              <FaThumbsUp className="text-[#570df8]" />{" "}
              <span>
                {" "}
                Liked by <span className="font-bold">{like}</span> peoples
              </span>
            </p>
          </div>

          <div className="flex items-center mt-1 mb-2">
            {" "}
            <span>
              {" "}
              <FaUserCircle />{" "}
            </span>{" "}
            <span className="ml-1 font-semibold">author:</span>
            <span className="text-xl font-bold">{userEmail}</span>
          </div>
          <p className="text-xs font-semibold"> {Description} </p>
          <p className="text-2xl my-2 font-bold"> Comments </p>

          <ul>
            {comments.map((c) => (
              <li
                key={c._id}
                className="border border-t-0 border-x-0 py-3 text-sm  px-1 text-gray-500"
              >
                {" "}
                {c.comment}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
