import { styled } from "@mui/joy";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import SvgIcon from "@mui/joy/SvgIcon";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { default as React, useEffect, useState } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

export const Create = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePic, setProfilePic] = useState(null);
  const reload = () => window.location.reload();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const [pictureErrors, setpictureErrors] = useState({});
  const [formErrors, setformErrors] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const Nav = useNavigate();
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
  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;
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
        console.log(res.data.updatedUser.profilePic);
        setProfilePic(res.data.updatedUser.profilePic);
        reload();
      })
      .catch((err) => {
        console.log(err);
        setpictureErrors(err.response.data);
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
          console.log(res.data.user);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [loading]);

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/activity/",
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
      console.log(response);
      setActivityForm({
        Duration: "",
        Distance: "",
        Intensity: "",
        Weight: "",
        Height: "",
        Age: "",
        Gender: "",
        ActivityChecked: "",
      });
      Nav("/users");
    } catch (error) {
      console.log(error.response.data.errors);
      setformErrors(error.response.data.errors);
    }
  };

  if (!token) {
    return (
      <h1 className="text-center pt-5">Please login to view this page.</h1>
    );
  }

  if (loading && token) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between border  bg-white shadow-lg h-screen">
        <div className="flex items-center justify-center w-1/2 text-center">
          <Card
            sx={{
              width: 320,
              maxWidth: "100%",
              boxShadow: "lg",
            }}
          >
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
              {profilePic ? (
                <Avatar
                  className="mb-3"
                  alt="Remy Sharp"
                  src={`http://localhost:8000/public/images/${profilePic}`}
                  sx={{ width: 150, height: 150 }}
                />
              ) : (
                <Avatar
                  className="mb-3"
                  alt="Remy Sharp"
                  src={`http://localhost:8000/public/images/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png`}
                  sx={{ width: 150, height: 150 }}
                />
              )}

              <Button
                className="absolute bottom-0 right-0 mb-5 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full shadow-md transform transition-transform duration-300 hover:scale-110 "
                onClick={() => setVisible(true)}
                name="profilePic"
              >
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </SvgIcon>
                <VisuallyHiddenInput type="file" />
              </Button>
              <Typography
                className="pt-3"
                level="title-lg"
              >{`${currentUser.firstName} ${currentUser.lastName}`}</Typography>
              <p>Healthy living</p>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                  "& > button": { borderRadius: "2rem" },
                }}
              ></Box>
            </CardContent>
            <CardOverflow sx={{ bgcolor: "background.level1" }}>
              <CardActions buttonFlex="1">
                <ButtonGroup
                  variant="outlined"
                  sx={{ bgcolor: "background.surface" }}
                >
                  <Button>
                    {" "}
                    <Link className="text-blue-500" to="/home">
                      Back to home page
                    </Link>
                  </Button>
                  <Button>
                    <Link className="text-blue-500" to="/users">
                      All Users
                    </Link>
                  </Button>
                </ButtonGroup>
              </CardActions>
            </CardOverflow>
          </Card>
        </div>
        <Modal
          ariaHideApp={false}
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-40"
        >
          <div className="bg-white border-2 border-gray-300 rounded-lg p-6 relative w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-sm font-semibold border border-2 rounded bg-red-500 text-white px-2"
              onClick={() => setVisible(false)}
            >
              x
            </button>
            <label className="font-bold text-gray-600">
              Upload profile picture{" "}
            </label>
            <div className="flex flex-col items-center my-2">
              <form onSubmit={uploadProfilePic} encType="multipart/form-data">
                <input
                  className="py-2 px-4 border border-gray-300 rounded-lg"
                  type="file"
                  name="profilePic"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
                {errors.error && (
                  <p className="text-red-500 mt-1">{errors.error}</p>
                )}
                <button className="btn btn-success shadow-sm bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-full mt-3">
                  Done
                </button>
              </form>
            </div>
          </div>
        </Modal>
        <div className="flex flex-col w-1/2 p-5 border border-black shadow-lg overflow-y-auto">
          <h2 className="font-semibold mb-5">Track an Activity:</h2>
          <form onSubmit={handleCreateActivity} className="space-y-4">
            <div className="flex space-x-2">
              <label className="flex items-center bg-green-400 px-2 py-1 rounded cursor-pointer">
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
                <span className="ml-2">Walking</span>
              </label>
              <label className="flex items-center bg-red-400 px-2 py-1 rounded cursor-pointer">
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
                <span className="ml-2">Running</span>
              </label>
              <label className="flex items-center bg-yellow-400 px-2 py-1 rounded cursor-pointer">
                <input
                  type="radio"
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      ActivityChecked: e.target.value,
                    })
                  }
                  value="cycling"
                  id="cycling"
                  name="activityChecked"
                />
                <span className="ml-2">Cycling</span>
              </label>
              <label className="flex items-center bg-blue-400 px-2 py-1 rounded cursor-pointer">
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
                <span className="ml-2">Swimming</span>
              </label>
            </div>

            <div className="space-y-4 p-5 border border-black rounded shadow-lg">
              <label className="flex flex-col font-semibold">
                Duration: Min
                <input
                  className="mt-1 p-2 border rounded"
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
                  <p className="text-red-500">{formErrors.Duration.message}</p>
                )}
              </label>

              <label className="flex flex-col font-semibold">
                Distance: m
                <input
                  className="mt-1 p-2 border rounded"
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
                  <p className="text-red-500">{formErrors.Distance.message}</p>
                )}
              </label>

              <label className="flex flex-col font-semibold">
                Intensity: Level
                <select
                  className="mt-1 p-2 border rounded"
                  name="Intensity"
                  id="Intensity"
                  value={activityForm.Intensity}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      Intensity: e.target.value,
                    })
                  }
                >
                  <option value={"Minimal"}>Minimal</option>
                  <option value={"Moderate"}>Moderate</option>
                  <option value={"Hard"}>Hard</option>
                </select>
              </label>

              <label className="flex flex-col font-semibold">
                Weight: Kg
                <input
                  className="mt-1 p-2 border rounded"
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
                  <p className="text-red-500">{formErrors.Weight.message}</p>
                )}
              </label>

              <label className="flex flex-col font-semibold">
                Height: Cm
                <input
                  className="mt-1 p-2 border rounded"
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
                  <p className="text-red-500">{formErrors.Height.message}</p>
                )}
              </label>

              <label className="flex flex-col font-semibold">
                Age
                <input
                  className="mt-1 p-2 border rounded"
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
                  <p className="text-red-500">{formErrors.Age.message}</p>
                )}
              </label>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Gender:</span>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      className="mr-1"
                      type="radio"
                      id="Male"
                      name="Gender"
                      value="Male"
                      defaultChecked
                      onChange={(e) =>
                        setActivityForm({
                          ...activityForm,
                          Gender: e.target.value,
                        })
                      }
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      className="mr-1"
                      type="radio"
                      id="Female"
                      name="Gender"
                      value="Female"
                      onChange={(e) =>
                        setActivityForm({
                          ...activityForm,
                          Gender: e.target.value,
                        })
                      }
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
              >
                Add Activity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
