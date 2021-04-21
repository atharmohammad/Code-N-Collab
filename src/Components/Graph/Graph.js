import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { HIDE_GRAPH } from "../../store/Action/action";
import { Grid, Button } from "@material-ui/core";

const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#fff",
  },
};

const GraphVis = (props) => {
  const [inputText, setInputText] = useState("");
  const [graphKey, setGraphKey] = useState(uuidv4());

  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  const changeHandler = async (e) => {
    setInputText(e.target.value);
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

  return (
    <Grid
      direction="column"
      justify="center"
      alignItems="center"
      style={{
        position: "fixed",
        zIndex: "400",
        backgroundColor: "black",
        height: "60vh",
        width: "110vh",
        boxShadow: "1px 1px 1px black",
        background: "rgb(39, 41, 43,0.8)",
        padding: "1vh 2vh 2vh 10vh",
        left: "23%",
        top: "18%",
        transition: "all 0.3s ease-out",
        borderRadius: "20px",
      }}
    >
      <Button
        onClick={props.onClickGraph}
        style={{
          backgroundColor: "#872e2e",
          color: "#fff",
          width: "5vh",
          height: "3vh",
          fontSize: "10px",
        }}
      >
        close
      </Button>

      <Grid
        container
        direction="rows"
        style={{ border: "4px solid #fff", width: "100vh" }}
      >
        <Grid xs={3}>
          <textarea
            placeHolder="Graph Input..."
            rows={17}
            onChange={changeHandler}
            style={{
              width: "100%",
              height: "55vh",
              resize: "none",
              fontSize: 20,
            }}
          ></textarea>
        </Grid>
        <Grid xs={9}>
          <Graph
            graph={graph}
            options={options}
            key={graphKey}
            style={{
              height: "56vh",
              width: "100%",
              backgroundColor: "#34214a",
              border: "#34214a",
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
