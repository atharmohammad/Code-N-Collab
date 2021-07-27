import Amongus1 from "../../Assets/images/amongus1.png";
import Amongus2 from "../../Assets/images/amongus2.png";
import Amongus3 from "../../Assets/images/amongus3.png";
import Amongus4 from "../../Assets/images/amongus4.png";
import Amongus5 from "../../Assets/images/amongus5.png";
import Amongus6 from "../../Assets/images/amongus6.png";
import Amongus7 from "../../Assets/images/amongus7.png";
import Amongus8 from "../../Assets/images/amongus8.png";

import Pokemon1 from "../../Assets/images/pokemon (1).png";
import Pokemon2 from "../../Assets/images/pokemon (2).png";
import Pokemon3 from "../../Assets/images/pokemon (3).png";
import Pokemon4 from "../../Assets/images/pokemon (4).png";
import Pokemon5 from "../../Assets/images/pokemon (5).png";

import Naruto1 from "../../Assets/images/naruto_pic (1).png";
import Naruto2 from "../../Assets/images/naruto_pic (2).png";
import Naruto3 from "../../Assets/images/naruto_pic (3).png";
import Naruto4 from "../../Assets/images/naruto_pic (4).png";
import Naruto5 from "../../Assets/images/naruto_pic (5).png";
import Naruto6 from "../../Assets/images/naruto_pic (6).png";
import Naruto7 from "../../Assets/images/naruto_pic (7).png";
import Naruto8 from "../../Assets/images/naruto_pic (8).png";
import Naruto9 from "../../Assets/images/naruto_pic (9).png";
import Naruto10 from "../../Assets/images/naruto_pic (10).png";
import Naruto11 from "../../Assets/images/naruto_pic (11).png";


import Goku1 from "../../Assets/images/goku (1).png";
import Goku2 from "../../Assets/images/goku (2).png";
import Goku3 from "../../Assets/images/goku (3).png";
import Goku4 from "../../Assets/images/goku (4).png";

import dio from "../../Assets/images/dio_hero.jpeg";

import Saitama from "../../Assets/images/saitama (2).jpeg";


const AvatarArray = [
  Amongus1,
  Amongus2,
  Amongus3,
  Amongus4,
  Amongus5,
  Amongus6,
  Amongus7,
  Amongus8,
  

  Naruto1,
  Naruto2,
  Naruto3,
  Naruto4,
  Naruto5,
  Naruto6,
  Naruto7,
  Naruto8,
  Naruto9,
  Naruto10,
  Naruto11,

  Goku1,
  Goku2,
  Goku3,
  Goku4,
 
  Pokemon1,
  Pokemon2,
  Pokemon3,
  Pokemon4,
  Pokemon5,

  dio,
  Saitama,
];
const Avatar = (key) => {
  return AvatarArray[key];
};

const AllAvatars = () => {
  return AvatarArray;
};

export { AllAvatars };

export default Avatar;
