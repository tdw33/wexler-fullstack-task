import React from "react";
import ImageContainer from "./components/containers/ImageContainer";
import "./App.scss";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Image Management System</h1>
      <ImageContainer />
    </div>
  );
};

export default App;
