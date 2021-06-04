import { useEffect, useState, useContext } from "react";
import { Grid, Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import AvatarModal from "../Components/Modal/AvatarModal";
import Amongus1 from "../Assets/images/amongus1.png";
import Amongus2 from "../Assets/images/amongus2.png";
import Amongus3 from "../Assets/images/amongus3.png";
import Amongus4 from "../Assets/images/amongus4.png";
import Amongus5 from "../Assets/images/amongus5.png";
import Amongus6 from "../Assets/images/amongus6.png";
import UpdateFeild from "../Components/updateUserHelper/UpdateFeilds";
import CountryFeild from "../Components/updateUserHelper/CountryFeild";

const Amongus = [Amongus1, Amongus2, Amongus3, Amongus5, Amongus6];

const UpdateUser = (props) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [name, setName] = useState("Adnan");
  const [designation, setDesignation] = useState("Web developer");
  const [moto, setMoto] = useState("To be a good competitive Programmer");
  const [institution, setInstitution] = useState("Jamia Millia Islamia");
  const [codeForcesHandle, setCodeForcesHandle] = useState("AdnanShamsi");
  const [codeForcesLink, setCodeForcesLink] = useState(null);
  const [githubLink, setGithubLink] = useState(null);
  const [codechefLink, setCodechefLink] = useState(null);
  const [atcoderLink, setAtcoderLink] = useState(null);
  const [linkedInLink, setLinkedInLink] = useState(null);

  const [amongusChar, setAmongusChar] = useState(0);
  const [country, setCountry] = useState(1);

  return (
    <>
      {showAvatarModal ? (
        <AvatarModal
          cancelHandler={() => setShowAvatarModal(false)}
          changeHandler={(e) => setAmongusChar(e)}
        />
      ) : null}
      <div style={{ paddingTop: "30px" }}>
        <div
          style={{
            margin: "auto",
            padding: "20px",
            minHeight: "60vh",
            width: "80%",
            border: "20px double grey",
            borderRadius: "20px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <div style={{ margin: "10px" }}>
                <img
                  src={Amongus[amongusChar]}
                  alt="avatar"
                  style={{
                    height: "120px",
                    width: "110px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                <Button
                  style={{
                    height: "60px",
                    marginTop: "-100px",
                    width: "200px",
                    background: "#336abc",
                    color: "#fff",
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
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
    </>
  );
};

export default UpdateUser;
