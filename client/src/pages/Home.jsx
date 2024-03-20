import React from "react";
import Navigator from "../components/Navigator";
import About from "../components/About";
import NotesSection from "../components/NotesSection";
import Login from "../components/Login";

const STARS_NUMBER = 70;

const Home = () => {
  return (
    <React.Fragment>
      <Login />
      <div className="HomePage">
        {Array.from({ length: STARS_NUMBER }).map((_, i) => (
          <div key={i} className="firefly"></div>
        ))}
        <Navigator />
        <div className="flex column">
          <About />
          <NotesSection />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
