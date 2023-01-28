import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import React from "react";
import { useContext } from "react";

import { authContext } from "../../Context/AuthProvider";

const Following = () => {
  const { user } = useContext(authContext);

  const email = user.email;

  const { data: followings = [], refetch } = useQuery({
    queryKey: ["followings"],
    queryFn: async () => {
      const res = await fetch(
        `https://social-media-server-dun.vercel.app/users/following/${email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleUnfollow = (following) => {
    const email = user?.email;
    const FollowingEmail = following;

    fetch(`https://social-media-server-dun.vercel.app/alluser/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ FollowingEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount === 1) {
          refetch();
        }
      });
  };

  if (!followings.length) {
    return (
      <div>
        <div className="h-screen">
          <h1 className="flex justify-center items-center mt-[-30px] h-full font-bold ">
            You don't Follow Any One Yet...{" "}
          </h1>
        </div>
      </div>
    );
  }

  console.log(followings);

  return (
    <div>
      <div className="ml-3 mt-4">
        {followings ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
              {followings?.map((u) => {
                //   console.log(u.followers);

                const isFollowed = u?.followers?.find((us) => us !== user);

                console.log(isFollowed);

                return (
                  <div key={u._id} className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-8 pb-2">
                      <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={u?.photo} alt="" />
                        </div>
                      </div>
                    </figure>
                    <div className="card-body pt-3 pb-4 items-center text-center">
                      <h1>{u?.name}</h1>
                      <div className="card-actions">
                        <>
                          <button
                            onClick={() => handleUnfollow(u.email)}
                            className="btn btn-primary"
                          >
                            Unfollow
                          </button>{" "}
                        </>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h1>There is No users</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Following;
