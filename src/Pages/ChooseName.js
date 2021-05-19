import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";

const BlogPage = (props) => {
  const [name, setName] = useState("");
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const changeHandler = (e) => {
    setName(e.target.value);
  };
  const submitHandler = () => {
    let room = uuidv1();
    
    if(searchParams.has("room")){
      room = searchParams.get("room");
    }
    
    history.push({
      pathname: "/newContest",
      search: "?room=" + room,
      state:{Name:name}
    });
  };

  return (
    <>
      <div>
        <input onChange={changeHandler} />
        <button onClick={submitHandler}>Submit</button>
      </div>
    </>
  );
};

export default BlogPage;
