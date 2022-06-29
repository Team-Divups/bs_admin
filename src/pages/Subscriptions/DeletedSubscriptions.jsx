import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";

import { deletedsubColumns } from "./DataSource";
import Header from "../../components/Header";
import "../styles.css";

import VisibilityIcon from "@mui/icons-material/Visibility";

import swal from "sweetalert";
import { Restore } from "@mui/icons-material";

const DeletedSubscriptions = () => {
  const [subdata, setSubData] = useState([]);

  //to get data when the application loads
  useEffect(() => {
    axios.get("http://localhost:3001/bin").then((response) => {
      setSubData(response.data);
      console.log(response.data);
    });
  }, []);

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
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Pages" title="Subscriptions History" />

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
