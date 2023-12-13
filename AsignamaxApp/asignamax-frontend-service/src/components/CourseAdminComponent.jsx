import React from "react";
// Components imports
import HeaderComponent from "./HeaderComponent01";
// CSS imports
import '../css/Home.css';


const CourseAdminComponent = () => {
  return (
    <div className="MainDiv">
        
      <div className="Header">
        <HeaderComponent />
      </div>

      <div className="PageBody">

        <div className="OptionsContainer">
        
        </div>

      </div>

      <div className="Footer">
      </div>


    </div>
  );
};

export default CourseAdminComponent;