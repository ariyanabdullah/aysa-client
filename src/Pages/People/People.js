import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { authContext } from "../../Context/AuthProvider";

const People = () => {
  const { user } = useContext(authContext);

  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://social-media-server-dun.vercel.app/users",
        {
          headers: {
            email: `${user?.email}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const handleFollow = (following) => {
    const email = user?.email;
    const FollowingEmail = following;

    fetch(`https://social-media-server-dun.vercel.app/users/${email}`, {
      method: "PATCH",
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

  return (
    <div className="ml-3 mt-4">
      {users ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
            {users?.map((u) => {
              //   console.log(u.followers);

              const isFollowed = u?.followers?.find((us) => us === user.email);

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
                      {!isFollowed ? (
                        <>
                          <button
                            onClick={() => handleFollow(u.email)}
                            className="btn btn-primary"
                          >
                            Follow
                          </button>{" "}
                        </>
                      ) : (
                        <>
                          <h1>Already Followed</h1>{" "}
                        </>
                      )}
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
  );
};

export default People;
