import React from "react";
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

import classes from "./lockout.module.css";
import {connect} from "react-redux";

const DenseTable = (props) => {
  const rows = [];
  props.contest.Users.map(user=>{
    rows.push({Name:user.Name,Score:user.Score});
  })
  return (
    <TableContainer
      component={Paper}
      style={{ width: "100%", height: "100%",paddingBottom:"3vh" }}
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
          {rows.map((row) => (
            <TableRow key={row.Name}>
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="right">{row.Score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        style={{
          cursor: "pointer",
          color: "white",
          height: "30px",
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
      >
        UPDATE
      </Button>
    </TableContainer>
  );
};

const mapStateToProps = state =>{
  return{
    contest:state.contest.contest
  }
}

export default connect(mapStateToProps,null)(DenseTable);
