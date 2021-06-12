import { useEffect, useState, useContext } from "react";
import { Grid, Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
  const [amongusChar, setAmongusChar] = useState(
    parseInt(user.Avatar)
  );
  const [country, setCountry] = useState(user.Country);
  const [startSpinner, setSpinner] = useState(false);

  const history = useHistory();

  const updateProfile = async () => {
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
      console.log(e);
    }
  };

  const backHandler = () => {
    history.push("/me");
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
        <Back clicked={backHandler} />
        <Nav />
        {startSpinner ? (
          <Spinner />
        ) : (
          <div
            style={{
              margin: "auto",
              padding: "20px",
              minHeight: "70%",
              width: "70%",
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                  style={{ alignSelf: "center" }}
                  alt="profile"
                />

                <Button
                  style={{
                    height: "20%",
                    padding: "5px 10px 5px 10px",
                    background: "#336abc",
                    color: "#fff",
                    top: "0",
                  }}
                  onClick={updateProfile}
                >
                  Update
                </Button>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <UpdateFeild
                    width="25%"
                    value={name}
                    title="Name"
                    placeHolder="Adnan Shamsi"
                    changeHandler={(e) => setName(e)}
                  />

                  <UpdateFeild
                    width="50%"
                    value={institution}
                    title="Institution"
                    placeHolder="IIT"
                    changeHandler={(e) => setInstitution(e)}
                  />
                  <CountryFeild
                    width="20%"
                    country={country}
                    changeHandler={(e) => setCountry(e)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <UpdateFeild
                    width="48%"
                    value={designation}
                    title="Designation"
                    placeHolder="web developer"
                    changeHandler={(e) => setDesignation(e)}
                  />
                  <UpdateFeild
                    width="48%"
                    value={moto}
                    title="Moto"
                    changeHandler={(e) => setMoto(e)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <UpdateFeild
                    width="30%"
                    value={codeForcesHandle}
                    title="Codeforces Handle"
                    placeHolder="Tourist"
                    changeHandler={(e) => setCodeForcesHandle(e)}
                  />
                  <UpdateFeild
                    width="67%"
                    value={codeForcesLink}
                    title="CodeForces Profile Link"
                    placeHolder="https://codeforces.com/profile/tourist"
                    changeHandler={(e) => setCodeForcesLink(e)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <UpdateFeild
                    width="48%"
                    value={codechefLink}
                    title="Codechef Profile Link"
                    placeHolder="https://www.codechef.com/users/gennady.korotkevich"
                    changeHandler={(e) => setCodechefLink(e)}
                  />
                  <UpdateFeild
                    width="48%"
                    value={atcoderLink}
                    title="Atcoder Profile Link"
                    placeHolder="https://www.codechef.com/users/gennady.korotkevich"
                    changeHandler={(e) => setAtcoderLink(e)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <UpdateFeild
                    width="48%"
                    value={githubLink}
                    title="Github Profile Link"
                    changeHandler={(e) => setGithubLink(e)}
                  />
                  <UpdateFeild
                    width="48%"
                    value={linkedInLink}
                    title="LinkedIn Profile Link"
                    changeHandler={(e) => setLinkedInLink(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateUser;
