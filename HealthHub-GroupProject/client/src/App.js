import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Create } from "./views/Create";
import { Dashboard } from "./views/Dashboard";
import { Edit } from "./views/Edit";
import Footer from "./views/Footer";
import Home from "./views/Home";
import Login from "./views/Login";
import Nav from "./views/Nav";
import Register from "./views/Register";
import Show from "./views/Show";

function App() {
  return (
    <div className="bg-light" style={{ height: "100vh", width: "100%" }}>
      <Nav />

      <Routes>
        <Route path="/" element={<Register />} default />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/new-activities" element={<Create />} />

        <Route path="/users" element={<Dashboard />} />

        <Route path="/user/:userId" element={<Show />} />

        <Route path="/activity/edit/:activityId" element={<Edit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
