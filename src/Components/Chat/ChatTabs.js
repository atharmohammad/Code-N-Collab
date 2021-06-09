import React, { useEffect, useState,useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useLocation } from "react-router-dom";
import {AuthContext} from '../../context/auth-context'

import Chat from "./Chat";
import People from "./People";

function TabPanel(props) {
  const { value, index, children } = props;
  return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ChatPanel(props) {
  const [name, setName] = useState("");
  const [value, setValue] = React.useState(0);
  const [messages, setMessages] = useState([]);
  const [persons, setPersons] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const socket = props.socket;
  const auth = useContext(AuthContext)
  
  useEffect(() => {
    if(location.pathname === "/newContest"){
      setName(auth.user.CodeForcesHandle);
    }else{
      if (searchParams.get("name")) {
        setName(searchParams.get("name").trim().toLowerCase());
      }
    }
  }, [location]);

  useEffect(() => {
    socket.on("serverMsg", (msg) => {
      setMessages([...messages, msg]);
    });
    return () => {
      socket.off("serverMsg");
    };
  }, [messages]);

  useEffect(() => {
    socket.on("peopleInRoom", (people) => {
      setPersons(people);
    });
    return () => {
      socket.off("peopleInRoom");
    };
  }, [persons]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div stlye={{ backgroundColor: "#313332" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab style={{ minWidth: 20 }} label="Chat" />
          <Tab style={{ minWidth: 20 }} label="People" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Chat socket={props.socket} messages={messages} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <People persons={persons} you={name} />
      </TabPanel>
    </div>
  );
}
