import Table from "@mui/joy/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logout from "../components/Logout";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import ButtonGroup from "@mui/joy/ButtonGroup";


function Show() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [currentUser, setCurrentUser] = useState({});
  const [likes, setLikes] = useState([]);
  const { userId } = useParams();

  const reload = () => {
    window.location.reload();
  };

  const [reloadd, setReloadd] = useState(!reload);

  const addLike = () => {
    axios
      .patch(
        `http://localhost:8000/user/${user._id}/${userId}/add`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLikes(res.data.user.likes);
        setReloadd(reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeLike = () => {
    axios
      .patch(
        `http://localhost:8000/user/${user._id}/${userId}/remove`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLikes(res.data.user.likes);
        setReloadd(reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user && token) {
      axios
        .get(`http://localhost:8000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfilePic(res.data.user.profilePic);
          setCurrentUser(res.data.user);
          setLikes(res.data.user.likes);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [loading, userId, token]);

  if (!token) {
    return (
      <h1 className="text-center pt-5 text-lg">
        Please login to view this page.
      </h1>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-fit">
        <div className="flex flex-col items-center md:w-1/2 p-5">
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
              <p>This is my profile</p>
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
                  {/* <Button>
                    <Link className="text-blue-500" to="/new-activities">
                      Add a Goal
                    </Link>
                  </Button> */}
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
        <div className="p-5 md:w-1/2 border-t md:border-t-0 md:border-l border-gray-300">
          <p className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-5 text-center">
            User Stats
          </p>
          <div className="text-center">
            <p className="font-semibold mb-2">
              Activities:{" "}
              <span className="text-green-500">
                {currentUser?.activities?.length}
              </span>
            </p>
            <p className="font-semibold mb-2">
              Streak:{" "}
              <span className="text-red-500">
                {currentUser?.caloriesSum?.toFixed(0)}
              </span>{" "}
              Kilocalories Burned
            </p>
          </div>
          <div className="overflow-y-auto mt-5" style={{ maxHeight: "38vh" }}>
            <Table
              hoverRow
              className="min-w-full border-collapse border border-gray-200"
            >
              <thead>
                <tr className="bg-gray-100">
                  <th
                    style={{ width: "20%" }}
                    className="border border-gray-200 px-4 py-2"
                  >
                    Activity
                  </th>
                  <th
                    style={{ width: "20%" }}
                    className="border border-gray-200 px-4 py-2"
                  >
                    Date
                  </th>
                  <th
                    style={{ width: "20%" }}
                    className="border border-gray-200 px-4 py-2"
                  >
                    Duration
                  </th>
                  <th
                    style={{ width: "20%" }}
                    className="border border-gray-200 px-4 py-2"
                  >
                    Distance
                  </th>
                  <th
                    style={{ width: "20%" }}
                    className="border border-gray-200 px-4 py-2"
                  >
                    Calories Burned
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUser.activities && currentUser.activities.length > 0 ? (
                  currentUser.activities.map((activity) => (
                    <tr key={activity._id} className="hover:bg-gray-50">
                      <td className="py-2 px-3 border-b border-gray-300">
                        {activity.ActivityChecked}
                      </td>
                      <td className="py-2 px-3 border-b border-gray-300">
                        {activity.createdAt
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/")}
                      </td>
                      <td className="py-2 px-3 border-b border-gray-300">
                        {activity.Duration} Min
                      </td>
                      <td className="py-2 px-3 border-b border-gray-300">
                        {activity.Distance} m
                      </td>
                      <td className="py-2 px-3 border-b border-gray-300">
                        {activity.CaloriesBurned.toFixed(3)} Cal
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-gray-500">
                      No Activities
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="flex justify-center items-center mt-5">
            {currentUser.likes &&
              currentUser.likes.length > 0 &&
              currentUser.likes.includes(user._id) ? (
              <button onClick={removeLike} className="focus:outline-none">
                <img
                  className="w-10 h-10"
                  src="http://localhost:8000/public/reactions/Likes.png"
                  alt="Liked"
                />
              </button>
            ) : (
              <button onClick={addLike} className="focus:outline-none">
                <img
                  className="w-10 h-10"
                  src="http://localhost:8000/public/reactions/Unlikes.png"
                  alt="Like"
                />
              </button>
            )}
            <span className="text-2xl font-bold ml-3">{likes?.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;
