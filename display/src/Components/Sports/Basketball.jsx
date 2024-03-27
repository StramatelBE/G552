import React from "react";
import "../main.css";

const Scoreboard = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <div
        style={{
          width: "25px",
          height: "46px",
          left: "456px",
          top: "195px",
          position: "absolute",
          textAlign: "center",
          color: "#EBFF00",
          fontSize: "50px",
          fontFamily: '"D-DIN-Bold"',
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        0
      </div>{" "}
      <div
        style={{
          width: "15px",
          height: "15px",
          left: "385px",
          top: "185px",
          position: "absolute",
          background: "#00A13B",
          borderRadius: "9999px",
        }}
      ></div>{" "}
      <div
        style={{
          width: "15px",
          height: "15px",
          left: "385px",
          top: "162px",
          position: "absolute",
          background: "#00A13B",
          borderRadius: "9999px",
        }}
      ></div>{" "}
      <div
        style={{
          width: "15px",
          height: "15px",
          left: "385px",
          top: "139px",
          position: "absolute",
          background: "#00A13B",
          borderRadius: "9999px",
        }}
      ></div>{" "}
      <div
        style={{
          width: "50px",
          height: "100px",
          left: "402px",
          top: "0px",
          position: "absolute",
          color: "#FF0000",
          fontSize: "100px",
          fontFamily: '"D-DIN-Bold"',
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        0
      </div>{" "}
      <div
        style={{
          width: "127px",
          height: "56px",
          left: "363px",
          top: "85px",
          position: "absolute",
          textAlign: "center",
          color: "white",
          fontSize: "45px",
          fontFamily: '"D-DIN-Bold"',
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        GUEST
      </div>{" "}
      <div
        style={{
          width: "25px",
          height: "46px",
          left: "31px",
          top: "195px",
          position: "absolute",
          textAlign: "center",
          color: "#EBFF00",
          fontSize: "50px",
          fontFamily: '"D-DIN-Bold"',
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        0
      </div>{" "}
      <div
        style={{
          width: "15px",
          height: "15px",
          left: "111px",
          top: "185px",
          position: "absolute",
          background: "#00A13B",
          borderRadius: "9999px",
        }}
      ></div>{" "}
      <div
        style={{
          width: "15px",
          height: "15px",
          left: "111px",
          top: "162px",
          position: "absolute",
          background: "#00A13B",
          borderRadius: "9999px",
        }}
      ></div>{" "}
      <div
        style={{
          width: "15px",
          height: "15px",
          left: "111px",
          top: "139px",
          position: "absolute",
          background: "#00A13B",
          borderRadius: "9999px",
        }}
      ></div>{" "}
      <div
        style={{
          width: "50px",
          height: "100px",
          left: "60px",
          top: "0px",
          position: "absolute",
          color: "#FF0000",
          fontSize: "100px",
          fontFamily: '"D-DIN-Bold"',
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        0
      </div>{" "}
      <div
        style={{
          width: "117px",
          height: "56px",
          left: "26px",
          top: "83px",
          position: "absolute",
          textAlign: "center",
          color: "white",
          fontSize: "45px",
          fontFamily: '"D-DIN-Bold"',
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        HOME
      </div>{" "}
      <div
        style={{
          width: "237px",
          height: "76px",
          left: "137px",
          top: "134px",
          position: "absolute",
          textAlign: "center",
          color: "white",
          fontSize: "100px",
          fontFamily: '"D-DIN-Bold"',
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        00:00
      </div>{" "}
      <img
        style={{
          width: "130px",
          height: "21px",
          left: "191px",
          top: "224px",
          position: "absolute",
        }}
        src="https://via.placeholder.com/130x21"
      />{" "}
      <img
        style={{
          width: "32px",
          height: "65px",
          left: "414px",
          top: "135px",
          position: "absolute",
        }}
        src="https://via.placeholder.com/32x65"
      />{" "}
      <div
        style={{
          width: "26px",
          height: "64px",
          left: "243px",
          top: "18px",
          position: "absolute",
          color: "#00A13B",
          fontSize: "60px",
          fontFamily: '"D-DIN-Bold"',
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        1
      </div>{" "}
    </div>
  );
};

export default Scoreboard;
