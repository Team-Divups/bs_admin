import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

import Header from '../../components/Header';
import { NotifyColumns } from './DataSource';

import swal from 'sweetalert';
import axios from 'axios';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ListNotification = () => {
  const [requestdata, setRequestData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/notification').then((response) => {
      setRequestData(response.data);
    });
  }, []);

  const Delete = (idRequest) => {
    swal({
      text: 'Are you sure you want to delete?',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:3001/notification/delete/${idRequest}`)
          .then((response) => {
            swal({
              title: 'Done !',
              text: 'Notification is deleted',
              icon: 'success',
              timer: 2000,
              button: false,
            });
            setRequestData(
              requestdata.filter((val) => {
                return val.idRequest !== idRequest;
              })
            );
          });
      } else {
        swal({
          text: 'Help Request details are restored !',
          timer: 2000,
          buttons: false,
        });
      }
    });
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/notifications/view/${params.row.idRequest}`}>
              <div className="viewButton">
                <VisibilityIcon fontSize="small" />
              </div>
            </Link>

            <Link to={`/notifications/edit/${params.row.idRequest}`}>
              <div className="editButton">
                <EditIcon fontSize="small" />
              </div>
            </Link>

            <div className="deleteButton">
              <DeleteIcon
                fontSize="small"
                onClick={() => {
                  Delete(params.row.idRequest);
                }}
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
        <Header category="Page" title="Notification" />
       
            <span className="dataTableTitle">Overview of Notifications</span>

        <DataGrid
          columns={NotifyColumns.concat(actionColumn)}
          rows={requestdata}
          getRowId={(row) => row.idRequest}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          style={{ marginTop: '30px', fontFamily: 'Asap' }}
          getRowHeight={() => 'auto'}
          autoHeight
        />
      </div>
    </>
  );
};

export default ListNotification;
