import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import { useFormik } from "formik";
import { selectClasses } from "@material-ui/core";
import axios from "axios";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select, TextField, Button} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";

const RegisterCustomers = (props) => {

  const arr = [
    { label: "Enter Code", type: "text", name: "deparmentCode" },
    { label: "Enter Name", type: "text", name: "departmentName" },
    { label: "", type: "date", name: "createdDate" },
  ];

  const validate = (values) => {
    const errors = {};
   
    if (!values.deparmentCode) {
      errors.deparmentCode = "Field is Required";
    }
    if (!values.departmentName) {
      errors.departmentName = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      departmentName: props.update ? props.customer.departmentName : "",
      deparmentCode: props.update ? props.customer.deparmentCode : "",
      createdDate: props.update ? props.customer.createdDate : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
        if (props.update){
          axios.patch(`http://127.0.0.1:80/api/v1/departments/${props.customer._id}`, values).then((res) => {
            alert("successfully updated")
            props.reset()
            props.hideModal()
          }).catch((err) => {
            alert(err.response.data.message);
            props.hideModal()

          });
          
        } else {
          axios.post(`http://127.0.0.1:80/api/v1/departments`, values).then((res) => {
            alert("Successfully Created Department")
            props.reset()
            props.hideModal()
          }).catch((err) => {
            alert(err.response.data.message);
            props.hideModal()
          });
          resetForm();
        }
    
    },
  });

 
  return (
    <Modal onClose = {props.hideModal} pwidth = "450px">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <h2>{props.update ? "Department Update" : "Department Creation"}</h2>
     

        <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px",
      flexDirection: "column", alignItems: "center" }}
      >
        {arr.map((a, index) => (
          <div>
            <TextField
              variant="outlined"
              label={a.label}
              id={a.name}
              name={a.name}
              type={a.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[a.name]}
              style={{ width: "290px", color: "black" }}
              key={index}
            />
            {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
          </div>
        ))}
  

        <Button
          style={{
            width: "210px",
            fontSize: "16px",
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
          {props.update ? "Update Department": "Create Department"}
        </Button>
      </form>

      </div>
    </Modal>
  );
};
export default RegisterCustomers;
