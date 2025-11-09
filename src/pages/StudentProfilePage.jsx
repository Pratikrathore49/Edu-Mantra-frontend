
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentProfileAsync } from "../redux/user/userSlice";
import { LogOut, Edit3, Lock } from "lucide-react";
import { setSelectedModel } from "../redux/model/modelSlice";
import ChangePassword from "../sections/profile/ChangePassword";
import StuEditProfile from "../sections/profile/EditProfile";
import EditProfile from "../sections/profile/EditProfile";

const StudentProfilePage = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [isEditOpen , setIsEditOpen] = useState(false)
    const [isChangePasswordOpen , setIsChangePasswordOpen] = useState(false)
  const dispatch = useDispatch();
      console.log("userteacher",user)
  useEffect(() => {
    dispatch(getStudentProfileAsync());
  }, [dispatch]);

     
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-purple-700 text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <>
    {isEditOpen && <EditProfile data={user} setIsEditOpen={setIsEditOpen}/>}
    {isChangePasswordOpen && <ChangePassword  />}
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left Column: Profile Picture */}
        <div className="flex flex-col items-center gap-6 lg:w-1/3">
          <div className="w-56 h-56 rounded-full border-4 border-purple-600 overflow-hidden flex justify-center items-center bg-purple-50 text-purple-700 text-6xl font-bold">
            {user?.profile ? (
              <img
                src={user.profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="capitalize">{user?.first_name?.slice(0, 1)}</span>
            )}
          </div>
          <h2 className="text-2xl font-semibold text-purple-800 uppercase">
            {user?.first_name} {user?.last_name}
          </h2>
          {/* <p className="text-gray-500 capitalize">{user?.role || "student"}</p> */}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-6 w-full">
            <button 
              className="flex items-center gap-2 justify-center bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl transition-all cursor-pointer"
              onClick={() => setIsEditOpen(true)}
            >
              <Edit3 size={18} /> Edit Profile
            </button>
            <button
              className="flex items-center gap-2 justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl transition-all cursor-pointer"
              onClick={() => setIsChangePasswordOpen(true)}
            >
              <Lock size={18} /> Change Password
            </button>
            <button
              className="flex items-center gap-2 justify-center bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition-all cursor-pointer"
              onClick={()=>dispatch(setSelectedModel({type:'confirm',message:'Are You Sure To Logout'}))}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Right Column: Profile Details */}
        <div className="lg:w-2/3 bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-purple-800 border-b pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-medium text-purple-700">Email:</span> {user?.email || "N/A"}
            </p>
            <p>
              <span className="font-medium text-purple-700">Mobile:</span> {user?.mobile || "N/A"}
            </p>
            <p>
              <span className="font-medium text-purple-700">Date of Birth:</span>{" "}
              {user?.date_of_birth
                ? new Date(user.date_of_birth).toLocaleDateString("en-GB")
                : "N/A"}

              
            </p>
            <p>
              <span className="font-medium text-purple-700">Gender:</span> {user?.gender || "N/A"}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-purple-800 border-b pb-2 mt-6">
            Academic Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-medium text-purple-700">Department:</span> {user?.department || "N/A"}
            </p>
            <p>
              <span className="font-medium text-purple-700">Course Name:</span> {user?.course_name || "N/A"}
            </p>
            <p>
              <span className="font-medium text-purple-700">Enrollment No.:</span> {user?.enrollment_number || "N/A"}
            </p>
            <p>
              <span className="font-medium text-purple-700">Year of Graduation:</span> {user?.year_of_graduation || "N/A"}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-purple-800 border-b pb-2 mt-6">
            Address
          </h3>
          <p className="text-gray-700">{user?.address || "N/A"}</p>
        </div>
      </div>
    </section>
    </>
  );
};

export default StudentProfilePage;
