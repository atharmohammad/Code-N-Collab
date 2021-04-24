import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { HIDE_GRAPH } from "../../store/Action/action";
import { Grid, Button } from "@material-ui/core";

;

const GraphVis = (props) => {
  const [inputText, setInputText] = useState("1 5 2 1 1 4 3 1 6 1");
  const [graphKey, setGraphKey] = useState(uuidv4());
  const [directed,setDirected] = useState(false)
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#fff",
      arrows: {
        to:{enabled: directed},
      }
    },
    interaction: {
         multiselect: true,
         dragView: true
    }
  }


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
      return { id: parseInt(num), key: key, label: num, color: "yellow"};
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

  useEffect(()=>{
    setGraphKey(uuidv4());

  },[directed])


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

        <Button
          onClick={()=>setDirected(false)}
          disabled={!directed}
          style={{
            borderRight:'5px solid rgb(37 39 40)',
            backgroundColor: "green",
            color: "#fff",
            width: "12vh",
            height: "3vh",
            left:"50vh",
            fontSize: "10px",
          }}
        >
          Undirected
        </Button>


        <Button
          onClick={()=>setDirected(true)}
          disabled={directed}
          style={{
            borderLeft:'5px solid rgb(37 39 40)',
            backgroundColor: "green",
            color: "#fff",
            width: "12vh",
            height: "3vh",
            left:"50vh",
            fontSize: "10px",
          }}
        >
          Directed
        </Button>

      <Grid
        container
        direction="rows"
        style={{ border: "4px solid #fff", width: "100vh" }}
      >
        <Grid xs={3}>
          <div
           contentEditable="true"
            onInput={changeHandler}
            style={{
              width: "100%",
              height: "56vh",
              resize: "none",
              fontSize: 20,
              backgroundColor:'#fff'
            }}
          >
          1 5<br/>
          2 1<br/>
          1 4<br/>
          3 1<br/>
          6 1<br/>
          </div>
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
