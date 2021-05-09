import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ChatTabs from "../../Chat/ChatTabs";
import Filter from "../Filter/Filter";

const FilterContest = (props) => {
  const socket = props.socket;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "flex-end" }}>
        <Filter />
        <ChatTabs socket={socket} />
      </div>
      <div
        style={{
          background: "blue",
          color: "#fff",
          border: "2px solid white",
          borderRadius: "5px",
          padding: "10px",
          width: "140px",
          alignText: "center",
          cursor: "pointer",
        }}
      >
        Start Contest
      </div>
    </div>
  );
};

export default FilterContest;
