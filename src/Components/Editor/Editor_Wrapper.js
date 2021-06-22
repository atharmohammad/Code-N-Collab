import React, { useEffect, useState } from "react";
import { Convergence } from "@convergence/convergence";
import { useLocation } from "react-router-dom";

import Spinner from "../Spinner/EditorSpinner/EditorSpinner";
import Editor from "./Editor";

//Wrapper for connecting editor to convergence

const Wrapper = (props) => {
  const socket = props.socket;
  const location = useLocation();
  const [domain, setDomain] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    Convergence.connectAnonymously(
      process.env.REACT_APP_CONVERGENCE_URL,
      searchParams.get("name").trim()
    )
      .then((dom) => {
        setDomain(dom);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    return () => {
      if (domain) {
        domain.dispose();
      }
    };
  }, [domain]);

  return (
    <>
      {domain ? (
        <Editor socket={socket} domain={domain} />
      ) : (
        <div style={{ background: "black", height: "100%", width: "100%" }}>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Wrapper;
