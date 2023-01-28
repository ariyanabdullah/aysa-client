import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { authContext } from "../../Context/AuthProvider";

const Follower = () => {
  const { user } = useContext(authContext);
  const { data: followers = [], refetch } = useQuery({
    queryKey: ["followers"],
    queryFn: async () => {
      const res = await fetch(
        `https://social-media-server-dun.vercel.app/users/followers/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(followers.length);

  if (!followers.length) {
    return (
      <div>
        <div className="h-screen">
          <h1 className="flex justify-center items-center mt-[-30px] h-full font-bold ">
            You don't have Any Followers Yet...{" "}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="ml-3 mt-4">
        {followers ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
              {followers?.map((u) => {
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

export default Follower;
