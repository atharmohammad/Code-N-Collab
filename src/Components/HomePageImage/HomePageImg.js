import HomePageImg from "../../Assets/images/HomePageImg.png";
import { useHistory } from "react-router-dom";
import { getThemeProps } from "@material-ui/styles";

const HomePageIcon = (props) => {
  const history = useHistory();
  return (
    <img
      src={HomePageImg}
      alt="Code-N-Collab"
      onClick={() => history.push("/homepage")}
      style={{ ...props.styleImg, cursor: "pointer" }}
    />
  );
};

export default HomePageIcon;
