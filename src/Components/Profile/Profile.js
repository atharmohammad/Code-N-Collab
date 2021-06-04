import { useEffect, useState } from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";
import ProfileFeild from "./ProfileFeild";
import Amongus1 from "../../Assets/images/amongus1.png";
import EditIcon from "@material-ui/icons/Edit";

const Profile = (props) => {
  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "50px",
          padding: "30px",
          height: "80%",
          fontSize: "25px",
          border: "2px solid grey",
          boxShadow: "5px 5px 5px #888888",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              borderBottom: "2px solid grey",
              width: "100%",
              margin: "auto",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                src={Amongus1}
                alt="avatar"
                style={{ height: "80px", width: "80px", borderRadius: "10px" }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  margin: "10px",
                }}
              >
                <div>Adnan Shamsi</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Tooltip title="update profile">
                <IconButton>
                  <EditIcon style={{ cursor: "pointer" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div
            style={{
              width: "90%",
              margin: "auto",
              marginTop: "20px",
              borderRadius: "10px",
            }}
          >
            <ProfileFeild title="Designation" value="Web Developer" />
            <ProfileFeild title="Country" value="India" />
            <ProfileFeild title="Institute" value="Jamia Millia Islamia" />
            <ProfileFeild
              title="Motto"
              value="To complete code-n-collab work"
            />
            <ProfileFeild title="CodeForces Handle" value="AdnanShamsi" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
