import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import Modal from "../../Modal/Modal";

const RegisterEmployees = (props) => {

  const arr = [
    { label: "Enter ID", type: "text", name: "employeeId" },
    { label: "Enter FullName", type: "gmail", name: "name" },
    { label: "Enter Department", type: "text", name: "department" },
    { label: "Enter Email", type: "text", name: "email" },
    { label: "Enter Sex", type: "gmail", name: "gender" },
    { label: "Enter ImageName", type: "text", name: "image" },
    { label: "Enter Area", type: "text", name: "area" },
    { label: "Enter Roll", type: "gmail", name: "role" },
  ];

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Field is Required";
    } else if (values.email.length < 4) {
      errors.email = "Must be 5 characters or more";
    }
    if (!values.name) {
      errors.name = "Field is Required";
    }
   
    if (!values.role) {
      errors.role = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: props.update ? props.empoloyee.email : "",
      name: props.update ? props.empoloyee.name : "",
      department: props.update ? props.empoloyee.department : "",
      area: props.update ? props.empoloyee.area : "",
      employeeId: props.update ? props.empoloyee.employeeId : "",
      gender: props.update ? props.empoloyee.gender : "",
      role: props.update ? props.empoloyee.role : "",
      image: props.update ? props.empoloyee.image : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (props.update){
        axios.patch(`http://127.0.0.1:80/api/v1/employees/${props.empoloyee._id}`, values).then((res) => {
          alert("Successfully Updated")
          props.change()
          props.hideModal()
        }).catch((err) => {
          alert(err.response.data.message);
        });
        props.reset()
      } else {
        axios.post(`http://127.0.0.1:80/api/v1/employees`, values).then((res) => {
          alert("Successfully Created")
          props.change()
          props.hideModal()
        }).catch((err) => {
          alert(err.response.data.message);
        });
        resetForm();
        props.reset()
      }    
    
    },
  });

 
  return (
    <Modal onClose = {props.hideModal} pwidth = "770px"
    pmarginLeft = "23%">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px",
          padding: "10px"
        }}
      >
        <h2>{props.update ? "Employee Update" : "Employee Creation"}</h2>
     

        <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px",
      flexDirection: "row", alignItems: "center",
    flexWrap: "wrap" }}
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
              style={{ width: "230px", color: "black" }}
              key={index}
            />
            {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
          </div>
        ))}
  

        <Button
          style={{
            width: "230px",
            fontSize: "16px",
            height:"50px",
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
          {props.update ? "Update Employee": "Create Employee"}
        </Button>
      </form>

      </div>
    </Modal>
  );
};

export default RegisterEmployees;
