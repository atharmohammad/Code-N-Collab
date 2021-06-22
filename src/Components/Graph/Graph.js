import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from "uuid";

import { HIDE_GRAPH } from "../../store/Action/action";
import classes from "./graph.module.css";

const GraphVis = (props) => {
  const [inputText, setInputText] = useState("1 5 2 1 1 4 3 1 6 1");
  const [graphKey, setGraphKey] = useState(uuidv4());
  const [directed, setDirected] = useState(false);
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#fff",
      arrows: {
        to: { enabled: directed },
      },
    },
    interaction: {
      multiselect: true,
      dragView: true,
    },
  };

  const changeHandler = async (e) => {
    setInputText(e.currentTarget.innerText);
  };

  useEffect(() => {
    setGraphKey(uuidv4());
    let text = inputText.replace(/\D/g, " ").split(" ");

    const SanitizedText = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] != "") {
        SanitizedText.push(text[i]);
      }
    }

    const nodes = [...new Set(SanitizedText)].map((num, key) => {
      return { id: parseInt(num), key: key, label: num, color: "yellow" };
    });

    const edges = [];
    for (let i = 0; i < SanitizedText.length; i += 2) {
      if (i + 1 < SanitizedText.length) {
        edges.push({
          from: parseInt(SanitizedText[i]),
          to: parseInt(SanitizedText[i + 1]),
        });
      }
    }

    setGraph({
      nodes,
      edges,
    });
  }, [inputText]);

  useEffect(() => {
    setGraphKey(uuidv4());
  }, [directed]);

  return (
    <Grid className={classes.main}>
      <Grid className={classes.btnContainer}>
        <Button
          onClick={() => setDirected(false)}
          disabled={!directed}
          style={{
            borderRadius: "5px solid",
            backgroundColor: "green",
            color: "#fff",
            width: "80px",
            height: "20px",
            fontSize: "10px",
            margin: "10px",
          }}
        >
          Undirected
        </Button>

        <Button
          onClick={() => setDirected(true)}
          disabled={directed}
          style={{
            borderRadius: "5px solid",
            backgroundColor: "green",
            color: "#fff",
            width: "80px",
            height: "20px",
            fontSize: "10px",
            margin: "10px",
          }}
        >
          Directed
        </Button>

        <Button
          onClick={props.onClickGraph}
          style={{
            backgroundColor: "#872e2e",
            color: "#fff",
            width: "5vh",
            height: "3vh",
            fontSize: "10px",
            margin: "10px",
          }}
        >
          close
        </Button>
      </Grid>

      <Grid className={classes.graphContainer}>
        <Grid xs={3}>
          <div
            contentEditable="true"
            onInput={changeHandler}
            style={{
              width: "100%",
              height: "50vh",
              fontSize: 20,
              backgroundColor: "#fff",
            }}
          >
            1 5<br />
            2 1<br />
            1 4<br />
            3 1<br />
            6 1<br />
          </div>
        </Grid>
        <Grid xs={9}>
          <Graph
            graph={graph}
            options={options}
            key={graphKey}
            style={{
              height: "50vh",
              width: "100%",
              backgroundColor: "#6e7053",
              border: "#fff",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickGraph: () => dispatch({ type: HIDE_GRAPH }),
  };
};

export default connect(null, mapDispatchToProps)(GraphVis);
