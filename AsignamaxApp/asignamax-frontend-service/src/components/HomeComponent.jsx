import React from "react";
// Components imports
import HeaderComponent from "./HeaderComponent01";
import CustomCard from "./CardComponent";
import Footer from "./FooterComponent";
// CSS imports
import "../css/Home.css";

const cardConfigStudents = {
  title: "Administracion de estudiantes",
  bodyContent:
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
  imageUrl: "https://picsum.photos/200/100",
  buttonLabel: "Ir a estudiantes",
  linkto: "/students",
};

const cardConfigCourses = {
  title: "Administracion de cursos",
  bodyContent:
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
  imageUrl: "https://picsum.photos/200/100",
  buttonLabel: "Ir a cursos",
  linkTo: "/courses",
};

const HomeComponent = () => {
  return (
    <div className="MainDiv">
      <div className="Header">
        <HeaderComponent />
      </div>

      <div className="PageBody">

        <div className="OptionsContainer">
          <a href={cardConfigStudents.linkto}>
            <CustomCard cardConfig={cardConfigStudents} />
          </a>
          <a href={cardConfigCourses.linkTo}>
            <CustomCard cardConfig={cardConfigCourses} />
          </a>
        </div>
        
      </div>

      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default HomeComponent;
