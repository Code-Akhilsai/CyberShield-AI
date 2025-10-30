import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import splashAnimation from "./assets/Cloud-Security.json";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ⏳ Navigate to Home after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Lottie
        animationData={splashAnimation}
        loop={false}
        style={{ width: 300, height: 300 }}
      />
      <h2 style={{ color: "white", marginTop: 20 }}>Loading...</h2>
    </div>
  );
};

export default Splash;
