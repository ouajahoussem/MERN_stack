import { styled } from "@mui/joy";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import SvgIcon from "@mui/joy/SvgIcon";
import Table from '@mui/joy/Table';
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

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

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const reload = () => window.location.reload();

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
        setErrors(err.response.data);
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

  if (!token) {
    return (
      <h1 className="text-center pt-5 text-2xl">
        Please login to view this page.
      </h1>
    );
  }

  if (loading && token) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between bg-white shadow-md h-screen">
        <div className="flex items-center justify-center mt-5 w-1/2">
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
                      <Link className="text-blue-500" to="/new-activities">
                        Add a Goal
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
        <Card className="border m-5 w-1/2 shadow-md p-5">
          <p className="text-2xl font-semibold text-center border-b-2 mb-5">
            My Stats
          </p>
          <div className="space-y-5">
            <p className="text-center font-semibold">
              Activities:{" "}
              <span className="font-bold text-green-600">
                {currentUser.activities.length}
              </span>
            </p>
            <p className="text-center font-semibold">
              Streak:{" "}
              <span className="font-bold text-red-600">
                {currentUser.caloriesSum.toFixed(0)}
              </span>{" "}
              Kilocalories Burned
            </p>
          </div>
          <div className="overflow-y-auto h-60 mt-5">
            <Table hoverRow className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th style={{ width: '20%' }} className="border border-gray-200 px-4 py-2">Activity</th>
                  <th style={{ width: '20%' }} className="border border-gray-200 px-4 py-2">Date</th>
                  <th style={{ width: '20%' }} className="border border-gray-200 px-4 py-2">Duration</th>
                  <th style={{ width: '20%' }} className="border border-gray-200 px-4 py-2">Distance</th>
                  <th style={{ width: '20%' }} className="border border-gray-200 px-4 py-2">
                    Calories Burned
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUser.activities && currentUser.activities.length > 0 ? (
                  currentUser.activities.map((activity) => (
                    <tr key={activity._id}>
                      <td className="border border-gray-200 px-4 py-2">
                        {activity.ActivityChecked}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {activity.createdAt
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/")}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {activity.Duration} Min
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {activity.Distance} m
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {activity.CaloriesBurned.toFixed(3)} Cal
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="border border-gray-200 px-4 py-2 text-center"
                      colSpan="5"
                    >
                      No Activities
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="flex flex-col items-center mt-5">
            <p className="text-2xl font-semibold">Likes:</p>
            <span className="font-bold text-blue-600 text-2xl">
              {currentUser.likes.length}
            </span>
          </div>
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
    </div>
  );
};

export default Home;
