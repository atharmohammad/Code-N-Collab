import React,{useEffect,useState} from "react"
import axios from "../../Axios/axios"
import classes from "./RoomCounts.module.css"

function RoomCount(props){
    const [rooms,setRooms] = useState(502)
    const [championship , setChampionship] = useState(112)

    return(
        <div className={classes.wrapper}>
            <p>Total Rooms Created : {rooms}</p>
            <p>Total Championships held : {championship}</p>
        </div>
    )
}

export default RoomCount