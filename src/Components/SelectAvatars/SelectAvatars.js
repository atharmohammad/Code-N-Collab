import React, { useEffect, useState, useRef } from "react";
import Amongus1 from "../../Assets/images/amongus1.png";
import Amongus2 from "../../Assets/images/amongus2.png";
import Amongus3 from "../../Assets/images/amongus3.png";
import Amongus4 from "../../Assets/images/amongus4.png";
import Amongus5 from "../../Assets/images/amongus5.png";
import Amongus6 from "../../Assets/images/amongus6.png";
import Amongus7 from "../../Assets/images/amongus7.png";

const AvatarArray = [
  Amongus1,
  Amongus2,
  Amongus3,
  Amongus4,
  Amongus5,
  Amongus6,
  Amongus6,
  Amongus7,
];
const Avatar = (key) => {
  return AvatarArray[key];
};

const AllAvatars = () => {
  return AvatarArray;
};

export { AllAvatars };

export default Avatar;
