import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Grid, Button, TextField } from "@mui/material";

import Header from "../../components/Header";
import { subColumns } from "./DataSource";
import "../styles.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  AcUnit,
  AddCircleRounded,
  DeleteOutlineSharp,
  DeleteSweepRounded,
} from "@mui/icons-material";

const ListSubscription = () => {
  const [subdata, setSubData] = useState([]);
  const [searchdata, setSearchdata] = useState("");

  //to get data when the application loads
  useEffect(() => {
    axios.get("http://localhost:3001/subscription").then((response) => {
      setSubData(response.data);
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

  // Delete one subscription
  const Delete = (id) => {
    swal({
      text: "Are you sure you want to delete?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`http://localhost:3001/subscription/deleteid`, {
            visibility: 0,
            status: "Inactive",
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
          text: "Subscription details are restored !",
          timer: 2000,
          buttons: false,
        });
      }
    });
  };

  // freeze one subscription
  const FreezeSub = (id) => {
    swal({
      text: "Are you sure you want to freeze?",
      buttons: true,
      dangerMode: true,
    }).then((willfreeze) => {
      if (willfreeze) {
        axios
          .put(`http://localhost:3001/subscription/freezeid`, {
            visibility: 0,
            status: "Freeze",
            id: id,
          })
          .then((response) => {
            swal({
              title: "Done !",
              text: "Subscription is Freezed",
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
          text: "Subscription is not freezed !",
          timer: 2000,
          buttons: false,
        });
      }
    });
  };

  //Delete all subscriptions
  const DeleteAll = (e) => {
    e.preventDefault();

    swal({
      text: "Are you sure you want to delete?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put("http://localhost:3001/subscription/delete", {
            visibility: 0,
            status: "Inactive",
          })
          .then((response) => {
            swal({
              title: "Done !",
              text: "All Subscriptions are deleted",
              icon: "success",
              timer: 2000,
              button: false,
            });
            setSubData(
              subdata.filter((val) => {
                return val.visibility === 1;
              })
            );
          });
      } else {
        swal({
          text: "Subscription details are restored !",
          buttons: false,
          timer: 2000,
        });
      }
    });
  };

  // action columns
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/subscriptions/${params.row.id}`}>
              <div className="viewButton">
                <VisibilityIcon fontSize="small" />
              </div>
            </Link>

            <Link to={`/subscriptions/edit/${params.row.id}`}>
              <div className="editButton">
                <EditIcon fontSize="small" />
              </div>
            </Link>

            <div className="deleteButton">
              <DeleteIcon
                fontSize="small"
                onClick={() => Delete(params.row.id)}
              />
            </div>

            <div>
              <AcUnit
                fontSize="small"
                color="info"
                onClick={() => FreezeSub(params.row.id)}
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
        <Header category="Pages" title="Subscriptions" />

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <span className="dataTableTitle">Overview of Subscriptions</span>
          </Grid>

          <Grid item xs={3}>
            <TextField
              placeholder="search"
              type="search"
              onChange={handleChange}
              value={searchdata}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid><br/>

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <p></p>
          </Grid>

          <Grid item xs={5}>
            <span style={{ paddingLeft: "100px" }}>
              <Link to="/subscriptions/bin">
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  endIcon={<DeleteSweepRounded />}
                >
                  Recycle Bin
                </Button>
              </Link>
            </span>
            <span style={{ paddingLeft: "40px", paddingRight: "25px" }}>
              <Button
                style={{ backgroundColor: "red" }}
                size="small"
                variant="contained"
                onClick={DeleteAll}
                endIcon={<DeleteOutlineSharp />}
              >
                Delete All
              </Button>
            </span>

            <span>
              <Link to="/subscriptions/new">
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<AddCircleRounded />}
                >
                  Create
                </Button>
              </Link>
            </span>
          </Grid>
        </Grid>

        <DataGrid
          columns={subColumns.concat(actionColumn)}
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

export default ListSubscription;
