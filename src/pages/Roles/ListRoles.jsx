import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

import { GridListTile, GridList } from '@material-ui/core';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import {
  AddCircleRounded,
  DeleteOutlineSharp,
  Edit,
} from '@mui/icons-material';

import swal from 'sweetalert';

import role from '../../Assets/role.png';
import '../viewpage.css';
import '../styles.css';

const ListRoles = () => {
  const [roleData, setRoleData] = useState([]);

  //roles list
  useEffect(() => {
    axios.get(`http://localhost:3001/role/all`).then((response) => {
      setRoleData(response.data);
    });
  }, []);

  //Delete all roles
  const DeleteAll = (e) => {
    e.preventDefault();

    swal({
      text: 'Are you sure you want to delete?',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete('http://localhost:3001/role').then((response) => {
          swal({
            title: 'Done !',
            text: 'All roles are deleted',
            icon: 'success',
            timer: 2000,
            button: false,
          });
        });
      } else {
        swal({
          text: 'Roles details are restored !',
          buttons: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Roles" />

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <span className="dataTableTitle">Overview of Roles</span>
          </Grid>

          <Grid item xs={3}>
            <span style={{ paddingLeft: '30px', paddingRight: '20px' }}>
              {/* <Button
                style={{ backgroundColor: 'red' }}
                size="small"
                variant="contained"
                onClick={DeleteAll}
                endIcon={<DeleteOutlineSharp />}
              >
                Delete All
              </Button> */}
            </span>

            <span>
              <Link to="/roles/new">
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<AddCircleRounded />}
                >
                  Add
                </Button>
              </Link>
            </span>
          </Grid>
        </Grid>

        <GridList cols={4}>
          {roleData.map((sdata, index) => {
            return (
              <>
                <GridListTile>
                  <Card sx={{ maxWidth: 360, paddingTop: 5, paddingRight: 9 }}>
                    <img className="roleimg" src={role} alt="role" />

                    <CardContent>
                      <Typography fontFamily="Mulish">
                        <b style={{ paddingRight: '160px' }}>
                          {sdata.roleName}
                        </b>
                        <Link to={`/roles/edit/${sdata.idrole}`}>
                          <Edit sx={{ fontSize: 15 }} />
                        </Link>
                      </Typography>

                      <div style={{ paddingTop: '30px' }} className="siteinfo">
                        {sdata.description}
                      </div>
                    </CardContent>
                  </Card>
                </GridListTile>
              </>
            );
          })}
        </GridList>
      </div>
    </>
  );
};

export default ListRoles;
