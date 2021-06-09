import { useEffect, useState, useContext } from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { AuthContext } from "../../context/auth-context";

import SelectAvatar from "../SelectAvatars/SelectAvatars";
import ProfileFeild from "./ProfileFeild";
import ProfileTitle from "../../Assets/images/Profile.png";

import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import CodeforcesIcon from "../../Assets/images/Codeforces.png";
import LinkedInIcon from "../../Assets/images/Linkedin.png";
import GithubIcon from "../../Assets/images/Github.png";
import CodechefIcon from "../../Assets/images/codechef.png";
import AtcoderIcon from "../../Assets/images/atcoder.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Profile = (props) => {
  const history = useHistory();
  const user = props.user;
  const auth = useContext(AuthContext);
  const [msg, setMsg] = useState(null);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "15%",
          boxSizing: "border-box",
        }}
      >
        <img
          src={ProfileTitle}
          style={{ height: "70px", width: "200px" }}
          alt="code-n-collab"
        />
      </div>
      <div
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "35px",
          padding: "30px",
          boxSizing: "border-box",
          fontSize: "25px",
          border: "10px double #fff",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "5px 40px 5px 40px",
            background: "#fff",
            boxSizing: "border-box",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              borderBottom: "2px solid grey",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                src={SelectAvatar(parseInt(user.Avatar.slice(-1)))}
                alt="avatar"
                style={{ height: "80px", width: "80px", borderRadius: "10px" }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  margin: "10px",
                  fontFamily: ["edgwick Ave Display", "cursive"].join(),
                }}
              >
                <div>{user.Name}</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              {auth.user && user._id === auth.user._id ? (
                <Tooltip
                  title="update profile"
                  onClick={() => history.push("/updateUser")}
                >
                  <IconButton>
                    <EditIcon style={{ cursor: "pointer" }} />
                  </IconButton>
                </Tooltip>
              ) : null}
              <Tooltip
                title="share"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  return setMsg('copied to clipboard');
                }}
              >
                <IconButton>
                  <ShareIcon style={{ cursor: "pointer" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div
            style={{
              width: "90%",
              margin: "auto",
            }}
          >
            <ProfileFeild title="Designation" value={user.Designation} />
            <ProfileFeild title="Country" value={user.Country} />
            <ProfileFeild title="Institution" value={user.Institution} />
            <ProfileFeild title="Motto" value={user.Moto} />
            <ProfileFeild
              title="CodeForces Handle"
              value={user.CodeforcesHandle}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <a
              title="Codeforces"
              style={{
                display: "inline-block",
                margin: "10px",
                boxSizing: "border-box",
              }}
              href={user.Codeforces}
              target="_blank"
            >
              <img
                src={CodeforcesIcon}
                alt="Codeforces"
                style={{
                  height: "50px",
                  marginTop: "10px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              />
            </a>
            <a
              title="Codechef"
              style={{
                display: "inline-block",
                margin: "10px",
                boxSizing: "border-box",
              }}
              href={user.Codechef}
              target="_blank"
            >
              <img
                src={CodechefIcon}
                alt="Codechef"
                style={{
                  height: "50px",
                  marginTop: "10px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              />
            </a>
            <a
              title="Atcoder"
              style={{
                display: "inline-block",
                margin: "10px",
                boxSizing: "border-box",
              }}
              href={user.AtCoder}
              target="_blank"
            >
              <img
                src={AtcoderIcon}
                alt="Atcoder"
                style={{
                  height: "50px",
                  marginTop: "10px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              />
            </a>
            <a
              title="linkedIn"
              style={{
                display: "inline-block",
                margin: "10px",
                boxSizing: "border-box",
              }}
              target="_blank"
              href={user.Linkedin}
            >
              <img
                src={LinkedInIcon}
                alt="Linkedin"
                style={{
                  height: "50px",
                  marginTop: "10px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              />
            </a>
            <a
              title="Github"
              style={{
                display: "inline-block",
                margin: "10px",
                boxSizing: "border-box",
              }}
              href={user.Github}
              target="_blank"
            >
              <img
                src={GithubIcon}
                alt="Github"
                style={{
                  height: "50px",
                  marginTop: "10px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              />
            </a>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={msg}
        autoHideDuration={3000}
        onClose={()=>setMsg(null)}
      >
        <Alert onClose={()=>setMsg(null)} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Profile;
