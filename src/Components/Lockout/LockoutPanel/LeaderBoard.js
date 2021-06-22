import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import Spinner from "../../Spinner/UpdateSpinner/UpdateSpinner";

const DenseTable = (props) => {
  const location = useLocation();
  const [room, setRoom] = useState(null);
  const [load, setLoad] = useState(false);
  const socket = props.socket;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setRoom(searchParams.get("room"));
  }, [location]);

  useEffect(() => {
    setLoad(false);
  }, [props.contest]);

  const rows = [];
  props.contest.Users.map((user) => {
    rows.push({ Name: user.Name, Score: user.Score });
  });

  const updateContest = () => {
    setLoad(true);
    socket.emit("Contest-Update", { roomId: room });
  };
  return (
    <TableContainer
      component={Paper}
      style={{ width: "100%", height: "100%", paddingBottom: "3vh" }}
    >
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <em>
                <b>Name</b>
              </em>
            </TableCell>
            <TableCell align="right">
              <em>
                <b>Score</b>
              </em>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.Name}>
              <TableCell component="th" scope="row">
                {i + 1}. {row.Name}
              </TableCell>
              <TableCell align="right">{row.Score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {props.contestEnded == false ? (
        <Button
          style={{
            cursor: "pointer",
            color: "white",
            height: "35px",
            width: "90px",
            marginLeft: "35%",
            marginTop: "10px",
            borderRadius: "5px",
            background: "#872e2e",
            fontSize: "14px",
            paddingTop: "4px",
            textAlign: "center",
            boxShadow: "0 3px 10px 0px #ba6261",
          }}
          onClick={updateContest}
        >
          {load ? <Spinner /> : <p>UPDATE</p>}
        </Button>
      ) : null}
    </TableContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    contest: state.contest.contest,
    contestEnded: state.contest.contestEnded,
  };
};

export default connect(mapStateToProps, null)(DenseTable);
