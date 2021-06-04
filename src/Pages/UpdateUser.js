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

const UpdateUser = (props) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const Amongus = [Amongus1, Amongus2, Amongus3, Amongus5, Amongus6];
  const [name, setName] = useState("Adnan");
  const [amongusChar, setAmongusChar] = useState(1);

  return (
    <>
      {showAvatarModal ? (
        <AvatarModal cancelHandler={() => setShowAvatarModal(false)} />
      ) : null}
      <div style={{ paddingTop: "30px" }}>
        <div
          style={{
            margin: "auto",
            padding: "20px",
            minHeight: "80vh",
            width: "80%",
            border: "20px double grey",
            borderRadius: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ margin: "10px" }}>
              <img
                src={Amongus[1]}
                alt="avatar"
                style={{ height: "80px", width: "80px", borderRadius: "10px" }}
              />
            </div>
            <Button
              onClick={() => setShowAvatarModal(true)}
              style={{ background: "#336abc", color: "#fff" }}
            >
              Choose Avatar
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
              <UpdateFeild width="30%" value={name} title="Name" />

              <UpdateFeild width="67%" value={name} title="Instituion" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <UpdateFeild width="48%" value={name} title="Designation" />
              <UpdateFeild width="48%" value={name} title="codeforcesHandle" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <CountryFeild country={1} width={'30%'} />
              <UpdateFeild width="67%" value={name} title="Instituion" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
