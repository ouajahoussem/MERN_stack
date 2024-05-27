import axios from "axios";
import React, { useEffect, useState } from "react";
import Model from "react-modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logout from "../components/Logout";

export const Edit = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePic, setProfilePic] = useState(null);
  const reload = () => window.location.reload();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [visible, setVisible] = useState(false);
  const [pictureErrors, setPictureErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [activityForm, setActivityForm] = useState({
    Duration: 0,
    Intensity: "Minimal",
    Distance: 0,
    Weight: 0,
    Height: 0,
    Age: 0,
    Gender: "Male",
    ActivityChecked: "walking",
    Owner: user._id,
  });
  const { activityId } = useParams();
  const Nav = useNavigate();

  const uploadProfilePic = (e) => {
    e.preventDefault();
    const profileData = new FormData();
    profileData.append("file", profilePic);
    axios
      .patch(
        `http://localhost:8000/user/profile/${user._id}/image`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setProfilePic(res.data.updatedUser.profilePic);
        reload();
      })
      .catch((err) => {
        setPictureErrors(err.response.data);
      });
  };

  useEffect(() => {
    if (user && token) {
      axios
        .get(`http://localhost:8000/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfilePic(res.data.user.profilePic);
          setCurrentUser(res.data.user);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [loading]);

  useEffect(() => {
    if (user && token) {
      axios
        .get(`http://localhost:8000/activity/${activityId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const activityData = res.data;
          setActivityForm({
            ...activityForm,
            Duration: activityData.Duration,
            Distance: activityData.Distance,
            Intensity: activityData.Intensity,
            Weight: activityData.Weight,
            Height: activityData.Height,
            Age: activityData.Age,
            Gender: activityData.Gender,
            ActivityChecked: activityData.ActivityChecked,
            Owner: currentUser._id,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  const handleUpdateActivity = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:8000/activity/${activityId}/update`,
        {
          Duration: activityForm.Duration,
          Distance: activityForm.Distance,
          Intensity: activityForm.Intensity,
          Weight: activityForm.Weight,
          Height: activityForm.Height,
          Age: activityForm.Age,
          Gender: activityForm.Gender,
          ActivityChecked: activityForm.ActivityChecked,
          Owner: currentUser._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setActivityForm(res.data);
      setActivityForm({
        Duration: 0,
        Intensity: "Minimal",
        Distance: 0,
        Weight: 0,
        Height: 0,
        Age: 0,
        Gender: "Male",
        ActivityChecked: "walking",
        Owner: user._id,
      });
      Nav(`/users`);
    } catch (error) {
      setFormErrors(error.response.data);
    }
  };

  if (!token) {
    return (
      <h1 className="text-center pt-5 text-xl">
        Please login to view this page.
      </h1>
    );
  }

  if (loading && token) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto flex flex-col items-center bg-white shadow-lg p-8 rounded-lg">
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <span className="block h-36 w-36 rounded-full border border-black shadow-lg overflow-hidden">
            {profilePic ? (
              <img
                alt=""
                src={`http://localhost:8000/public/images/${profilePic}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                alt=""
                src={`http://localhost:8000/public/images/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png`}
                className="object-cover w-full h-full"
              />
            )}
          </span>
          <button
            className="absolute bottom-0 right-0 h-12 w-12 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold flex items-center justify-center transform transition-transform hover:scale-110"
            onClick={() => setVisible(true)}
            name="profilePic"
          >
            +
          </button>
          <Model
            ariaHideApp={false}
            isOpen={visible}
            onRequestClose={() => setVisible(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
              },
              content: {
                border: "2px solid #ccc",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "16px",
              },
            }}
          >
            <button
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
              onClick={() => setVisible(false)}
            >
              x
            </button>
            <label className="block font-semibold text-gray-700 mb-2">
              Upload profile picture
            </label>
            <div className="flex flex-col items-center mb-4">
              <form onSubmit={uploadProfilePic} encType="multipart/form-data">
                <input
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer mb-2"
                  type="file"
                  name="profilePic"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
                {pictureErrors.error && (
                  <p className="text-red-500 text-sm">{pictureErrors.error}</p>
                )}
                <button
                  type="submit"
                  className="btn btn-success shadow-sm text-white text-sm font-bold py-2 px-4 rounded-full"
                >
                  Done
                </button>
              </form>
            </div>
          </Model>
        </div>
        <p className="text-2xl font-semibold mb-2">
          {currentUser.firstName} {currentUser.lastName}
        </p>
        <p className="font-semibold">"This is my bio"</p>
        <div className="flex flex-col mt-4">
          <Link className="text-blue-500 mb-2" to="/home">
            Back to home page
          </Link>
          <Link className="text-blue-500 mb-2" to="/users">
            All Users
          </Link>
          <Logout />
        </div>
      </div>

      <div className="w-full max-w-4xl p-8 bg-gray-100 shadow-lg rounded-lg">
        <p className="text-xl font-semibold mb-4">Edit an Activity:</p>
        <form onSubmit={handleUpdateActivity}>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="form-control bg-green-500 flex items-center justify-between px-2 py-1 rounded">
              <input
                type="radio"
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    ActivityChecked: e.target.value,
                  })
                }
                value="walking"
                id="walking"
                name="activityChecked"
                defaultChecked
              />
              <label className="ml-2 text-white">Walking</label>
            </div>
            <div className="form-control bg-red-500 flex items-center justify-between px-2 py-1 rounded">
              <input
                type="radio"
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    ActivityChecked: e.target.value,
                  })
                }
                value="running"
                id="running"
                name="activityChecked"
              />
              <label className="ml-2 text-white">Running</label>
            </div>
            <div className="form-control bg-indigo-500 flex items-center justify-between px-2 py-1 rounded">
              <input
                type="radio"
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    ActivityChecked: e.target.value,
                  })
                }
                value="biking"
                id="biking"
                name="activityChecked"
              />
              <label className="ml-2 text-white">Biking</label>
            </div>
            <div className="form-control bg-yellow-500 flex items-center justify-between px-2 py-1 rounded">
              <input
                type="radio"
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    ActivityChecked: e.target.value,
                  })
                }
                value="swimming"
                id="swimming"
                name="activityChecked"
              />
              <label className="ml-2 text-white">Swimming</label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (in minutes):
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="number"
                name="Duration"
                value={activityForm.Duration}
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    Duration: e.target.value,
                  })
                }
              />
              {formErrors.Duration && (
                <p className="text-red-500 text-sm">{formErrors.Duration}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distance (in km):
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="number"
                name="Distance"
                value={activityForm.Distance}
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    Distance: e.target.value,
                  })
                }
              />
              {formErrors.Distance && (
                <p className="text-red-500 text-sm">{formErrors.Distance}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (in kg):
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="number"
                name="Weight"
                value={activityForm.Weight}
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    Weight: e.target.value,
                  })
                }
              />
              {formErrors.Weight && (
                <p className="text-red-500 text-sm">{formErrors.Weight}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (in cm):
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="number"
                name="Height"
                value={activityForm.Height}
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    Height: e.target.value,
                  })
                }
              />
              {formErrors.Height && (
                <p className="text-red-500 text-sm">{formErrors.Height}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age (in years):
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="number"
                name="Age"
                value={activityForm.Age}
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    Age: e.target.value,
                  })
                }
              />
              {formErrors.Age && (
                <p className="text-red-500 text-sm">{formErrors.Age}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender:
              </label>
              <select
                className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="Gender"
                value={activityForm.Gender}
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    Gender: e.target.value,
                  })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.Gender && (
                <p className="text-red-500 text-sm">{formErrors.Gender}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Intensity:
              </label>
              <select
                className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="Intensity"
                value={activityForm.Intensity}
                onChange={(e) =>
                  setActivityForm({
                    ...activityForm,
                    Intensity: e.target.value,
                  })
                }
              >
                <option value="Minimal">Minimal</option>
                <option value="Light">Light</option>
                <option value="Moderate">Moderate</option>
                <option value="Heavy">Heavy</option>
              </select>
              {formErrors.Intensity && (
                <p className="text-red-500 text-sm">{formErrors.Intensity}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success shadow-sm text-black text-sm font-bold py-2 px-4 rounded-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;