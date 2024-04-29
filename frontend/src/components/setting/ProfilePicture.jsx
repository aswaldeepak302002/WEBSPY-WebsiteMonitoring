import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { updateUserProfileToLocalStorage } from "../../redux/slice/userSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ProfilePicture = ({ user }) => {
  const [profilePicture, setProfilePicture] = useState([]);
  const dispatch = useDispatch();
  const imagebase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    return data;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const image = await imagebase64(file);
    setProfilePicture(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/updateProfilePicture", {
        profilePicture,
        _id: user._id,
      });
      dispatch(updateUserProfileToLocalStorage(profilePicture));
    } catch (error) {
      console.log(error);
    }p
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="mb-5 space-y-8 w-full  xl:w-2/3"
      >
        <div className="relative grid grid-cols-1 gap-4">
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute top-2 h-20 w-full opacity-0"
          />
          <div className="flex flex-row p-2 justify-start gap-5 items-center border-dashed border-2 border-slate-200 rounded-md">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user?.profilePicture ?? ""}
                alt={user?.username ?? ""}
              />
              <AvatarFallback>
                {user?.username?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex justify-center flex-col items-start">
              <h3 className="text-base font-semibold">Profile Picture</h3>
              <p className="text-xs text-slate-400">PNG, JPG upto 1MB</p>
              {profilePicture && <p>{profilePicture.path}</p>}
              <Button
                type="submit"
                variant="link"
                className="inline p-0 mt-2 h-5 z-50 relative"
                disabled={!profilePicture}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      </form>
      {/* <h1>{profilePicture.path}</h1> */}
    </div>
  );
};

export default ProfilePicture;
