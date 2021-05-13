import React from "react";

const Rules = (props) => {
  return (
    <>
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          fontFamily: "verdana",
        }}
      >
        <h1 style={{ textAlign: "center", width: "100%", color: "red" }}>
          Rules!
        </h1>
        <ol>
          <li>
            <h3>Atmost 5 people can join a contest</h3>
          </li>
          <li>
            <h3>
              To validate your submission press click on update button each
              time(after every submission)
            </h3>
          </li>
          <li>
            <h3>Person with maximum marks will be the winner</h3>
          </li>
          <li>
            <h3>Person having same marks will have same rankings</h3>
          </li>
          <li>
            <h3>The score of each question will be written on there respective block</h3>
          </li>
          <li>
            <h3>No cheating is allowed</h3>
          </li>
          
        </ol>
      </div>
    </>
  );
};

export default Rules;
