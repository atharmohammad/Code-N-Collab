import React from "react";

const Rules = (props) => {
  return (
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          fontFamily: "verdana",
          overflow:"auto",
        }}
      >
        <h1 style={{ textAlign: "center", width: "100%", color: "red" }}>
          Rules!
        </h1>
        <ol>
        <li>
            <h3>Share this page's URL before clicking start with your friends to compete with them</h3>
          </li>
          <li>
            <h3>Maximum of 4 People can Join a Contest</h3>
          </li>
          <li>
            <h3>Person who solves a problem first will get its point added to his Score, After that No one will get point for that problem even if they solve it</h3>
          </li>
          <li>
            <h3>
              To update your LeaderBoard and Unsolved Problems Click Update
            </h3>
          </li>
          <li>
            <h3>Person Who Scores Maximum Will be the Winner</h3>
          </li>
          <li>
            <h3>Choose tags and rating for problems you want to compete for and press Start Contest</h3>
          </li>
          <li>
            <h3>The score of each question will be written on there respective block</h3>
          </li>
          <li>
            <h3>Person who Click Start Contest his configuration for contest would be taken into account so please discuss before starting</h3>
          </li>
          <li>
            <h3>for problem blocks : Blue = unsolved , green = Solved by you , red = already solved by someone else</h3>
          </li>
        </ol>
      </div>
  );
};

export default Rules;
