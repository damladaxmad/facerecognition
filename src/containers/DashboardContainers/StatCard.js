import React from "react";
import { Avatar, Typography, makeStyles } from "@material-ui/core";
import { IoMdStats } from "react-icons/io";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      marginLeft: theme.spacing(2),
      cursor: "pointer",
      backgroundColor: "#F0F2FA",
    },
  };
});

const StatCard = (props) => {
  const classes = useStyles();

  return (
      
    <div
      style={{
        width: "90%",
        height: "50px",
        background: "#FFFFFF",
        borderRadius: "10px",
        padding: "0px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "1px 1px 1px #9E9E9E"
      }}
    >
        <p
          style={{
            margin: "0px",
            fontSize: "16px",
            color: "black",
          }}
        >
        {props.data.id}
        </p>
        <Typography
          style={{
            color: "black",
            margin: "0px",
            fontSize: "14px",
          }}
        >
         {props.data.name}
        </Typography>

        <Typography
          style={{
            color: "black",
            margin: "0px",
            fontSize: "14px",
          }}
        >
          {props.data.area}
        </Typography>

        <Typography
          style={{
            color: "black",
            margin: "0px",
            fontSize: "14px",
          }}
        >
          {props.data.time}
        </Typography>

        <Typography
          style={{
            color: props.data.status == "LOGGED IN" ? "#0061F7" : "#F76A0A",
            margin: "0px",
            fontSize: "14px",
          }}
        >
          {props.data.status}
        </Typography>

        
    </div>
  );
};

export default StatCard;
