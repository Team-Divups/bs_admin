import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import { Grid, TextField } from "@mui/material";

import { deletedsubColumns } from "./DataSource";
import "../styles.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Restore } from "@mui/icons-material";


import swal from "sweetalert";


const DeletedSubscriptions = () => {

  const [subdata, setSubData] = useState([]);
  const [searchdata, setSearchdata] = useState("");

  //to get data when the application loads
  useEffect(() => {
    axios.get("http://localhost:3001/bin").then((response) => {
      setSubData(response.data);
      console.log(response.data);
    });
  }, []);

  //search functionality
  const handleChange = (e) => {
    e.preventDefault();
    setSearchdata(e.target.value.toLowerCase());

    if (searchdata.length > 0) {
      setSubData(
        subdata.filter((val) => {
          return val.name.toLowerCase().includes(searchdata);
        })
      );
    }
  };

  //Restore subscription
  const Restorage = (id) => {
    swal({
      text: "Are you sure you want to restore?",
      buttons: true,
      dangerMode: true,
    }).then((willRestore) => {
      if (willRestore) {
        axios
          .put(`http://localhost:3001/bin/restore`, {
            visibility: 1,
            status: "Active",
            id: id,
          })
          .then((response) => {
            swal({
              title: "Done !",
              text: "Subscription is restored",
              icon: "success",
              timer: 2000,
              button: false,
            });
            setSubData(
              subdata.filter((val) => {
                return val.id !== id;
              })
            );
          });
      } else {
        swal({
          text: "Subscription is not restored !",
          timer: 2000,
          buttons: false,
        });
      }
    });
  };

   // Delete one subscription
   const Delete = (id) => {
    swal({
      text: "Are you sure you want to delete?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`http://localhost:3001/bin/fulldelete`, {
            id: id,
          })
          .then((response) => {
            swal({
              title: "Done !",
              text: "Subscription is deleted",
              icon: "success",
              timer: 2000,
              button: false,
            });
            setSubData(
              subdata.filter((val) => {
                return val.id !== id;
              })
            );
          });
      } else {
        swal({
          text: "Subscription details are not delted !",
          timer: 2000,
          buttons: false,
        });
      }
    });
  };


  // action columns
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/subscriptions/${params.row.id}`}>
              <div className="viewButton">
                <VisibilityIcon fontSize="small" />
              </div>
            </Link>

            <div className="deleteButton">
              <Restore
                color="success"
                fontSize="small"
                onClick={() => Restorage(params.row.id)}
              />
            </div>

            <div className="deleteButton">
              <DeleteIcon
                fontSize="small"
                onClick={() => Delete(params.row.id)}
              />
            </div>

          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      
        <Grid container spacing={2}>
          <Grid item xs={8}>
          <span className="dataTableTitle">Overview of Terminated Subscriptions</span>
          </Grid>
          <Grid item xs={4}>
            <TextField
              placeholder="search"
              type="search"
              onChange={handleChange}
              value={searchdata}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>

        <DataGrid
          columns={deletedsubColumns.concat(actionColumn)}
          rows={subdata}
          pageSize={8}
          rowsPerPageOptions={[5]}
          style={{ marginTop: "30px", fontFamily: "Asap" }}
          getRowHeight={() => "auto"}
          autoHeight
        />
      </div>
    </>
  );
};

export default DeletedSubscriptions;
