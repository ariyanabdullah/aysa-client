import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../Components/Loader";
import SingleCard from "../SingleCard/SingleCard";
const Media = () => {
  const {
    data: postData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["postData"],
    queryFn: async () => {
      const res = await fetch(
        "https://social-media-server-dun.vercel.app/allpost"
      );
      const data = await res.json();
      return data;
    },
  });

  // console.log(postData);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-7 gap-y-3">
          <div></div>
          <div className="col-span-3">
            <div className="mt-6">
              {postData.map((pd) => (
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

export default Media;
