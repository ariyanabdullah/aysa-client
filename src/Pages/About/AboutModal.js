import React from "react";
import { toast } from "react-hot-toast";

const AboutModal = ({ userInfo, setUserInfo, refetch }) => {
  console.log(userInfo);

  const handleModal = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value || userInfo.name;
    const email = userInfo?.email;
    const versity = form.versity.value || userInfo.universite;
    const address = form.address.value || userInfo.address;

    const id = userInfo._id;
    const userData = {
      name,
      email,
      universite: versity,
      address: address,
    };
    console.log(userData);

    fetch(`https://social-media-server-dun.vercel.app/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setUserInfo(null);
          toast.success("Information Updated Successfull");
          refetch();
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box w-[300px]">
          <div>
            <h1 className="text-center my-3 text-xl font-bold text-primary">
              Edit Your <span className="text-[#eb01b9]">Information</span>
            </h1>

            <form onSubmit={handleModal} className="w-full">
              <input
                type="text"
                name="name"
                placeholder={userInfo?.name}
                className=" input rounded-none p-0 mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />

              <input
                type="email"
                name="email"
                placeholder={userInfo?.email}
                readOnly
                className=" input p-0 rounded-none mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />

              <input
                type="text"
                name="versity"
                placeholder={userInfo?.universite}
                className=" input p-0 rounded-none mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />
              <input
                type="text"
                name="address"
                placeholder={userInfo?.address}
                className=" input p-0  rounded-none mb-2 border-t-0 border-x-0 border-primary focus:outline-none  focus:border-[#eb01b9] w-full "
              />
              <button
                type="submit"
                className="btn btn-sm btn-outline btn-secondary"
              >
                submit
              </button>
              <label
                htmlFor="my-modal"
                className="btn btn-sm btn-primary ml-2  "
              >
                cencel
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
