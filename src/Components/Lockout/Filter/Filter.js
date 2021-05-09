import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function Filter(props) {
  const [tags, setTags] = useState("");

  const handleChange = (event) => {
    setTags(event.target.value);
  };

  return (
    <div style={{ width: "84%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TextField id="outlined-basic" label="Min-Rating" variant="outlined" />
        <TextField id="outlined-basic" label="Max-Rating" variant="outlined" />
        <FormControl>
          <InputLabel style={{ color: "black" }}>Tags</InputLabel>
          <Select
            onChange={handleChange}
            displayEmpty
            value={tags}
            style={{ width: "150px" }}
          >
            <MenuItem value="greedy">
              <em>greedy</em>
            </MenuItem>
            <MenuItem value="implementation">implementation</MenuItem>
            <MenuItem value="array">Array</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
