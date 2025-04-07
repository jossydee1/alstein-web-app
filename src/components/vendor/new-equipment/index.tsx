import React from "react";
import Intro from "./Intro";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const NewEquipmentContent = () => {
  return (
    <div className="space-y-9">
      <Intro />
      <StepOne />
      <StepTwo />
      <StepThree />
      <StepFour />
      <StepFive />
    </div>
  );
};

export default NewEquipmentContent;
