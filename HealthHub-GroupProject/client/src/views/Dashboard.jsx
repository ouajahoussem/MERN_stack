import Table from "@mui/joy/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RemoveActivity from "../components/RemoveActivity";

export const Dashboard = () => {
  const [allUsersWithActivities, setAllUsersWithActivities] = useState([]);
  const token = localStorage.getItem("authToken");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllUsersWithActivities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const RemoveFromDom = (activityId) => {
    const updatedUsersWithActivities = allUsersWithActivities.map((user) => ({
      ...user,
      activities: user.activities.filter(
        (activity) => activity._id !== activityId
      ),
    }));
    setAllUsersWithActivities(updatedUsersWithActivities);
  };

  if (!token) {
    return (
      <h1 className="text-center pt-5 text-lg">
        Please login to view this page.
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center p-5">
      <div className="relative w-full max-w-4xl mt-5">
        <div className="absolute top-2 right-2 flex space-x-3">
          <Link
            className="btn bg-blue-500 text-white py-2 px-4 rounded"
            to={`/home`}
          >
            Back to profile
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-5">
          Check other user's streaks!
        </h1>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <Table
            hoverRow
            className="min-w-full border-collapse border border-gray-200"
          >
            <thead>
              <tr>
                <th
                  style={{ width: "20%" }}
                  className="border border-gray-200 px-4 py-2"
                >
                  User
                </th>
                <th
                  style={{ width: "20%" }}
                  className="border border-gray-200 px-4 py-2"
                >
                  Activities
                </th>
                <th
                  style={{ width: "20%" }}
                  className="border border-gray-200 px-4 py-2"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsersWithActivities && allUsersWithActivities.length > 0 ? (
                allUsersWithActivities.flatMap((user) =>
                  user.activities.map((activity) => (
                    <tr
                      key={activity._id}
                      className="bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="py-3 px-4 border-b border-gray-200">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {activity.ActivityChecked} with{" "}
                        {activity.CaloriesBurned.toFixed(3)} Kcal burned
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {loggedInUser._id === user._id ? (
                          <>
                            <Link
                              to={`/activity/edit/${activity._id}`}
                              className="btn bg-green-500 text-white py-1 px-3 rounded mr-2"
                            >
                              Edit
                            </Link>
                            <button className="btn bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded  mr-2 transition-colors duration-300">
                              <RemoveActivity
                                activityId={activity._id}
                                cb={() => RemoveFromDom(activity._id)}
                              />
                            </button>
                          </>
                        ) : (
                          <Link
                            to={`/user/${user._id}`}
                            className="btn bg-blue-500 text-white py-1 px-3 rounded"
                          >
                            Show
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-5">
                    No users activities yet
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
