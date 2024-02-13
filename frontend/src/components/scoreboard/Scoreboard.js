import React, { useEffect, useState } from "react";

import Badminton from "./badminton/Badminton";
import Basketball from "./basketball/Basketball";
import Futsal from "./futsal/Futsal";
import Volleyball from "./volleyball/Volleyball";
import authService from "../../services/authService";
import Handball from "./handball/Handball";

import "../../styles/Scoreboard.css";

function Scoreboard() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log(authService.getCurrentUser());
    setCurrentUser(authService.getCurrentUser());
  }, []);

  return (
    <>
      {currentUser && currentUser.user.username === "badminton" && (
        <Badminton />
      )}
      {currentUser && currentUser.user.username === "basketball" && (
        <Basketball />
      )}
      {currentUser && currentUser.user.username === "futsal" && <Futsal />}
      {currentUser && currentUser.user.username === "volleyball" && (
        <Volleyball />
      )}
      {currentUser && currentUser.user.username === "handball" && <Handball />}
    </>
  );
}

export default Scoreboard;
