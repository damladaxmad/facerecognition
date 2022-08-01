import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {Typography, Button, MenuItem, Menu, Avatar} from "@material-ui/core"
import PopupForm from "./AssignPopUp";
import axios from "axios";
import profile from "../../assets/images/tablePic.png"
import { useSelector } from "react-redux";
import moment from "moment";
import swal from "sweetalert"

const CustomersTable = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false)
  const [customer, setCustomer] = useState('')
  const activeUser = useSelector(state => state.activeUser.activeUser)

  const columns = [
   
    { title: "Department Name", field: "departmentName" , width: "8%",},
    { title: "Department Code", field: "deparmentCode" , width: "8%",},
 
    {
      title: "Created Date",
      field: "createdDate",
      render: (data) => {
        const formatted = moment(data.createdDate).format("DD/MM/YYYY");
        if (formatted == "Invalid date") return <em> no deadline</em>
        return <p>{formatted}</p>;
      },
      
    },



    
  ];

  const showModal = () =>{
    setShow(true)
    handleClose()
  }

  const hideModal = () =>{
    setShow(false)
    props.change()
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, customer) => {
    setAnchorEl(event.currentTarget);
    setCustomer(customer)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteCustomer = (id) => {
    axios.delete(`http://127.0.0.1:80/api/v1/customers/${customer._id}`).then(()=>{
      alert("Succefully Deleted").catch((err)=> {
        alert(err.response.data.message);
      })
    })
    handleClose()
    props.change()
  };

  const showSweetAlert = () => {
    setAnchorEl(null);
    swal({
      title: "Delete Employee",
      text: `Are you sure to delete ${customer.departmentName}?`,
      icon: "warning",
      buttons: {
        cancel : 'No',
        confirm : {text:'Yes',className:'sweet-warning'},
    }

    }).then((response) => {
      if (response) {
        axios.delete(`http://127.0.0.1:80/api/v1/departments/${customer._id}`).then(()=> {
          swal({text: `You have successfully deleted ${customer.departmentName}`,
          icon:"success", timer: "2000"})
          props.change()
        }).catch((err) => {
          swal({text: err.response.data.message,
      icon:"error", timer: "2000"})
        })
        props.change()
        handleClose()
      }
    })
  }

  const deleteDepartment = () => {
    showSweetAlert()
    handleClose()
  };

  const updateCustomer = () => {
    props.update(customer)
    handleClose()
  }

  const selectionHandler = (data) => {
    props.selectStudents(data)
  }

  const showProfile = (type) => {
    props.showProfile(customer, type)
  }

  let state = props.state


  return (
    <div style={{ width: "95%", margin: "auto" }}>
 {show && <PopupForm hideModal = {hideModal} customer = {customer}
 />}
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        style = {{}}
      >
       <MenuItem onClick={()=> {
          if (activeUser.privillages.includes('Delete Department'))
          deleteDepartment()
          else alert("You have no access!")
          }}>Delete Department</MenuItem>
        <MenuItem onClick={() => {
          if (activeUser.privillages.includes("Update Customer"))
          updateCustomer()
          else alert("You have no access!")
          }}>Update Department</MenuItem>
    
      </Menu>
      <MaterialTable
        columns={columns}
        data={props.data}

        localization={{
          body: {
              emptyDataSourceMessage: (
                  state
              ),
          },
      }}

        options={{
          rowStyle: {},
          showTitle: false,
          exportButton: true,
          sorting: false,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: 8,
          draggable: false,
          // rowStyle: {
          //   overflowWrap: 'break-word'
          // },
          actionsColumnIndex: -1,
          headerStyle: { background: "#EFF0F6", fontSize: "13px", },
        }}
        onSelectionChange={(rows) => selectionHandler(rows)}
        actions={[
          {
            icon: () => <BiDotsHorizontalRounded 
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
           />,
            tooltip: "Save User",
            onClick: (event, rowData) => {
              handleClick(event, rowData)
            },
            position: "row",
          },
        ]}
        style={{ borderRadius: "10px", boxShadow: "none" }}
      />
    </div>
  );
};

export default CustomersTable;
