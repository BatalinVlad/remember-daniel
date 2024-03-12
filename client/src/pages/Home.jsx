import React from "react";
import Navigator from "../components/Navigator";
import About from "../components/About";
import NotesSection from "../components/NotesSection";
import Login from "../components/Login";

const Home = () => {
  return (
    <React.Fragment>
      <Login />
      <div className="HomePage">
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
