import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import { Tooltip, IconButton } from "@material-ui/core";
import AdminStar from "../../Assets/images/star.png";

import Snacker from "../Snacker/Snaker";
import ProfileFeild from "./ProfileFeild";
import classes from "./profile.module.css";
import { AuthContext } from "../../context/auth-context";
import SelectAvatar from "../SelectAvatars/SelectAvatars";
import GithubIcon from "../../Assets/images/Github.png";
import ProfileTitle from "../../Assets/images/Profile.png";
import LinkedInIcon from "../../Assets/images/Linkedin.png";
import CodechefIcon from "../../Assets/images/codechef.png";
import AtcoderIcon from "../../Assets/images/atcoder.png";
import CodeforcesIcon from "../../Assets/images/Codeforces.png";

const Profile = (props) => {
  const history = useHistory();
  const user = props.user;
  const auth = useContext(AuthContext);
  const [msg, setMsg] = useState(null);

  return (
    <>
      <div className={classes.img_div}>
        <img
          src={ProfileTitle}
          style={{ height: "70px", width: "200px" }}
          alt="code-n-collab"
        />
      </div>
      <div className={classes.outerBox}>
        <div className={classes.innerBox}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              borderBottom: "2px solid grey",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                src={SelectAvatar(user.Avatar)}
                alt="avatar"
                style={{ height: "80px", width: "80px", borderRadius: "10px" }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  margin: "10px",
                  fontFamily: ["Fira Sans", "sans-serif"].join(),
                }}
              >
                <div>{user.Name}</div>
                {user.SuperUser ? (
                  <div
                    style={{
                      marginLeft: "8px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    Admin
                    <img
                      style={{ height: "20px", marginLeft: "2px" }}
                      src={AdminStar}
                      alt=""
                    />
                  </div>
                ) : null}
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
                  if (
                    window.location.pathname === "/me" &&
                    localStorage.getItem("userData")
                  ) {
                    const user_id = JSON.parse(localStorage.getItem("userData"))
                      .user._id;
                    navigator.clipboard.writeText(
                      `${window.location.origin}/profile/?user=${user_id}`
                    );
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                  return setMsg("copied to clipboard");
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
      <Snacker
        open={msg != null}
        message={msg}
        onClose={() => setMsg(null)}
      />
    </>
  );
};

export default Profile;
