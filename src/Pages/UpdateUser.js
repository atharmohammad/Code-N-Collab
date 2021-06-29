import { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Snacker from "../Components/Snacker/Snaker";
import { AuthContext } from "../context/auth-context";
import AvatarModal from "../Components/Modal/AvatarModal";
import Back from "../Components/Back/Back";
import Nav from "../Components/Nav/Nav";
import Stars from "../Components/Stars/Stars";
import ProfileUpdate from "../Assets/images/ProfileUpdate.png";
import axios from "../Axios/axios";
import Spinner from "../Components/Spinner/BlogSpinner";
import SelectAvatar from "../Components/SelectAvatars/SelectAvatars";
import UpdateFeild from "../Components/updateUserHelper/UpdateFeilds";
import CountryFeild from "../Components/updateUserHelper/CountryFeild";
import classes from "./pages.module.css";
import HomeIcon from "../Components/Home/Home"


const UpdateUser = (props) => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [name, setName] = useState(user.Name);
  const [designation, setDesignation] = useState(user.Designation);
  const [moto, setMoto] = useState(user.Moto);
  const [institution, setInstitution] = useState(user.Institution);
  const [codeForcesHandle, setCodeForcesHandle] = useState(
    user.CodeforcesHandle
  );
  const [codeForcesLink, setCodeForcesLink] = useState(user.Codeforces);
  const [githubLink, setGithubLink] = useState(user.Github);
  const [codechefLink, setCodechefLink] = useState(user.Codechef);
  const [atcoderLink, setAtcoderLink] = useState(user.AtCoder);
  const [linkedInLink, setLinkedInLink] = useState(user.Linkedin);
  const [amongusChar, setAmongusChar] = useState(parseInt(user.Avatar));
  const [country, setCountry] = useState(user.Country);
  const [startSpinner, setSpinner] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const history = useHistory();

  const updateProfile = async () => {
    if (!name && !name.trim()) return setErrorMsg("Name cant be empty");

    const data = {
      Name: name,
      Moto: moto,
      CodeforcesHandle: codeForcesHandle,
      Codeforces: codeForcesLink,
      Codechef: codechefLink,
      Github: githubLink,
      AtCoder: atcoderLink,
      Linkedin: linkedInLink,
      Avatar: amongusChar,
      Designation: designation,
      Country: country,
      Institution: institution,
    };
    try {
      setSpinner(true);
      const user = await axios.patch(`/user/updateProfile/`, data);
      auth.login(user.data, auth.token);
      setSpinner(false);
      history.push("/me");
    } catch (e) {
      setErrorMsg("Oops something went wrong");
    }
    setSpinner(false);
  };

  return (
    <>
      {showAvatarModal ? (
        <AvatarModal
          cancelHandler={() => setShowAvatarModal(false)}
          changeHandler={(e) => setAmongusChar(e)}
        />
      ) : null}
      <div
        style={{
          background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)",
          minHeight: "100vh",
          paddingBottom: "50px",
        }}
      >
        <Stars />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{ display: "flex", position: "sticky", marginTop: "20px" }}
          >
            <Back />
            <HomeIcon />
          </div>

          <Nav />
        </div>

        {startSpinner ? (
          <Spinner />
        ) : (
          <div
            style={{
              margin: "auto",
              padding: "1vw",
              minHeight: "70%",
              width: "90vw",
              maxWidth: "1000px",
              border: "10px double #fff",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                margin: "auto",
                padding: "20px",
                minHeight: "70%",
                borderRadius: "20px",
                background: "#fff",
              }}
            >
              <div className={classes.upperMain}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <div style={{ margin: "10px" }}>
                    <img
                      src={SelectAvatar(amongusChar)}
                      alt="avatar"
                      style={{
                        height: "120px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <Button
                    onClick={() => setShowAvatarModal(true)}
                    style={{
                      fontSize: "12px",
                      height: "30px",
                      width: "130px",
                      background: "#8e33bc",
                      color: "#fff",
                    }}
                  >
                    Choose Avatar
                  </Button>
                </div>
                <img
                  src={ProfileUpdate}
                  className={classes.updateImg}
                  alt="profile"
                />

                <div className={classes.upperUpdateBtn} onClick={updateProfile}>
                  Update
                </div>
              </div>
              <div>
                <div className={classes.updateDivContainer}>
                  <UpdateFeild
                    value={name}
                    title="Name"
                    placeHolder="Adnan Shamsi"
                    changeHandler={(e) => setName(e)}
                    autoFocus={true}
                  />

                  <UpdateFeild
                    value={institution}
                    title="Institution"
                    placeHolder="IIT"
                    changeHandler={(e) => setInstitution(e)}
                  />
                  <CountryFeild
                    country={country}
                    changeHandler={(e) => setCountry(e)}
                  />
                </div>
                <div className={classes.updateDivContainer}>
                  <UpdateFeild
                    value={designation}
                    title="Designation"
                    placeHolder="web developer"
                    changeHandler={(e) => setDesignation(e)}
                  />
                  <UpdateFeild
                    value={moto}
                    title="Moto"
                    changeHandler={(e) => setMoto(e)}
                  />
                </div>
                <div className={classes.updateDivContainer}>
                  <UpdateFeild
                    value={codeForcesHandle}
                    title="Codeforces-Handle"
                    placeHolder="Tourist"
                    changeHandler={(e) => setCodeForcesHandle(e)}
                  />
                  <UpdateFeild
                    value={codeForcesLink}
                    title="CodeForces-Profile-Link"
                    placeHolder="https://codeforces.com/profile/tourist"
                    changeHandler={(e) => setCodeForcesLink(e)}
                  />
                </div>
                <div className={classes.updateDivContainer}>
                  <UpdateFeild
                    value={codechefLink}
                    title="Codechef-Profile-Link"
                    placeHolder="https://www.codechef.com/users/gennady.korotkevich"
                    changeHandler={(e) => setCodechefLink(e)}
                  />
                  <UpdateFeild
                    value={atcoderLink}
                    title="Atcoder-Profile-Link"
                    placeHolder="https://www.codechef.com/users/gennady.korotkevich"
                    changeHandler={(e) => setAtcoderLink(e)}
                  />
                </div>
                <div className={classes.updateDivContainer}>
                  <UpdateFeild
                    value={githubLink}
                    title="Github-Profile-Link"
                    changeHandler={(e) => setGithubLink(e)}
                  />
                  <UpdateFeild
                    value={linkedInLink}
                    title="LinkedIn-Profile-Link"
                    changeHandler={(e) => setLinkedInLink(e)}
                  />
                </div>
              </div>
              <div className={classes.lowerUpdateNBtn} onClick={updateProfile}>
                Update
              </div>
            </div>
          </div>
        )}
      </div>
      <Snacker
        open={errorMsg != null}
        message={errorMsg}
        severity="error"
        onClose={() => setErrorMsg(null)}
      />
    </>
  );
};

export default UpdateUser;
