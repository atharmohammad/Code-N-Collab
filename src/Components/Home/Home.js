import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { useHistory } from 'react-router-dom';

export default function Home(props){
    const history = useHistory();
    
    return (
      <HomeOutlinedIcon
        style={{
          backgroundColor: "#fff",
          borderRadius: "50%",
          height: "30px",
          width: "30px",
          cursor:'pointer',
          margin:'3.7px',
          border:'3px solid blue'
        }}
        onClick={() => history.push("/homepage")}
      />
    );
}