import React, { useEffect, useState } from "react";
import QuickActions from "../containers/DashboardContainers/QuickActions";
import StatCard from "../containers/DashboardContainers/StatCard";
import UpdateStudents from "../containers/DashboardContainers/UpdateStudents";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setDashboard } from "../redux/actions/dashboardActions";
import JsPDF from "jspdf";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import { FormControl, MenuItem, Select } from "@mui/material";

const generatePDF = () => {
  const report = new JsPDF("portrait", "pt", "a4");
  report.html(document.getElementById("uni")).then(() => {
    report.save("report.pdf");
  });
};

const Dashboard = () => {
  
  const dashboard = useSelector((state) => state.dashboard.dashboard);
  const statusArr = ["Today", "Yesterday", "Last Week",]
  const [status, setStatus] = useState(statusArr[0]);
  const statusHandler = (e) => {
    setStatus(e.target.value)
  }
  const data = [
    {id: "001", name: "Amiin Cabdullaahi Qaasim", time: "07:30am",
    status: "LOGGED IN", area: "Campus 12"},
    {id: "002", name: "Caqqil Cumar Muxudiin", time: "08:23am",
    status: "LOGGED IN", area: "Campus 10"},
    {id: "003", name: "Damlad Axmad Dasar", time: "05:30pm",
    status: "LOGGED OUT", area: "Campus 09"},
    {id: "004", name: "Jaamac Cali Cumar", time: "08:00am",
    status: "LOGGED IN", area: "Campus 13"}
  ]

  return (
    <div
      id="uni"
      style={{
        height: "100%",
        width: "95%",
        margin: "0px auto",
        display: "flex",
        gap: "14px",
        flexDirection: "column",
      }}
    >
      <h2> Dashboard</h2>
      <FormControl style={{ padding: "0px", margin: "0px" }}>
          <Select
            style={{  height: "40px", background: "white",
            width: "150px", }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            onChange={statusHandler}
          >
            {statusArr.map((status, index) => (
              <MenuItem value={status} key={index}>
                {status}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
      <div
        style={{
          display: "flex",
          gap: "12px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {data.map((d, index) => (
          <StatCard data={d} key={index} />
        ))}
      </div>
 
    </div>
  );
};

export default Dashboard;
