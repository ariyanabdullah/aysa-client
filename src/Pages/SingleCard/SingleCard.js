import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegThumbsUp, FaArrowRight, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
const SingleCard = ({ postData, refetch }) => {
  const { image, Description, like, _id } = postData;

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (id) => {
    const liked = like + 1;
    fetch(`https://social-media-server-dun.vercel.app/allposts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ liked }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setIsLiked(true);
          refetch();
        }
      });
  };

  const handleComment = (event) => {
    event.preventDefault();
    const url = "https://social-media-server-dun.vercel.app/allComments";
    const comment = event.target.comment.value;

    const commentData = {
      comment: comment,
      postId: _id,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Comment Added . See on the Details Page");
          event.target.reset();
        }
      });
  };

  //   console.log(isLiked);

  return (
    <div className="rounded-md my-6 shadow-md w-full dark:bg-white dark:text-gray-900">
      <img
        src={image}
        alt=""
        className="object-cover object-center w-full h-72 dark:bg-gray-500"
      />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {isLiked ? (
              <>
                <button
                  type="button"
                  title="Like post"
                  disabled
                  className="flex items-center justify-center"
                >
                  <FaThumbsUp className="text-[#570df8]" />
                </button>{" "}
              </>
            ) : (
              <>
                {" "}
                <button
                  type="button"
                  title="Like post"
                  onClick={() => handleLike(_id)}
                  className="flex items-center justify-center"
                >
                  <FaRegThumbsUp />
                </button>{" "}
              </>
            )}

            <div>
              <span className="text-sm">
                Liked by
                <span className="font-semibold">{like} others</span>
              </span>
            </div>
          </div>

          <Link
            to={`/details/${_id}`}
            type="button"
            title="Bookmark post"
            className="flex items-center font-semibold btn-link justify-center"
          >
            Details
          </Link>
        </div>
        <div className="flex flex-wrap items-center pt-3 pb-1">
          <div className="flex items-center space-x-2"></div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold">
            {Description.length > 50 ? (
              <>
                {" "}
                {Description.slice(0, 50)}
                {"..."}{" "}
              </>
            ) : (
              <>{Description}</>
            )}
          </p>

          <form onSubmit={handleComment} className="flex">
            <input
              type="text"
              name="comment"
              placeholder="Add a comment..."
              className="w-full border border-x-0 border-t-0 py-0.5 focus:outline-none focus:border focus:border-x-0 focus:border-b-[#570df8] 
                        focus:border-t-0 dark:bg-transparent  text-sm pl-0 dark:text-gray-900"
            />
            <button
              className="border border-x-0 border-t-0  hover:border-[#570df8]"
              type="submit"
            >
              {" "}
              <FaArrowRight className="text-[#570df8]" />{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
