import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import {Grid} from '@mui/material';

import Header from '../../components/Header';
import {userColumns} from './DataSource';
import '../styles.css';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';
import { AddCircleRounded, DeleteOutlineSharp } from '@mui/icons-material';


const ListUser = ()=>{

    const [userdata,setUserData] = useState([]);

    //to get data when the application loads
    useEffect( () =>{
    axios.get("http://localhost:3001/user").then(
        (response)=>{
            setUserData(response.data);
        })
    },[])


    // Delete one user
    const Delete = (id) =>{

        swal({
            text : "Are you sure you want to delete?",
            buttons: true,
            dangerMode: true,
        }).then( (willDelete)=>{
            if(willDelete){
                axios.delete(`http://localhost:3001/user/delete/${id}`).then(
                    (response)=>{
                        swal({
                            title : 'Done !',
                            text  : 'User is deleted',
                            icon  : 'success',
                            timer : 2000,
                            button : false,
                        })
                        setUserData(userdata.filter((val)=>{
                            return(
                              val.id !== id
                            )
                          }))
                    }
                )
            } else {
                swal({
                    text : "User details are restored !",
                    timer:2000,
                    buttons:false,
                })
            }
        })
         
    }



    //Delete all subscriptions
    const DeleteAll = (e) =>{
        e.preventDefault();

        swal({
            text : "Are you sure you want to delete?",
            buttons: true,
            dangerMode: true,
        }).then( (willDelete)=>{
            if(willDelete){
                axios.delete("http://localhost:3001/user").then(
                    (response)=>{
                        swal({
                            title : 'Done !',
                            text  : 'All Users are deleted',
                            icon  : 'success',
                            timer : 2000,
                            button : false,
                        })
                    }
                )
            } else {
                swal({
                    text : "User details are restored !",
                    buttons : false,
                    timer :2000,
                })
            }
        })
         
    }



    // action columns
    const actionColumn = [{
        field:"action",
        headerName:"Action",
        width:160,
        renderCell: (params) => {
            return (
                <div className="cellAction">
                    <Link to={`/users/${params.row.id}`}>
                        <div className="viewButton"><VisibilityIcon fontSize='small'/></div>
                    </Link>

                    <Link to={`/users/edit/${params.row.id}`}>
                        <div className="editButton"><EditIcon fontSize='small'/></div>
                    </Link>
                    
                    <div className="deleteButton"  ><DeleteIcon fontSize='small' onClick={()=>Delete(params.row.id)}/></div>
                </div>
            )
        }
    }]


  return (
   <>
         <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Users"/>

            <Grid container spacing={2}>
                <Grid item xs={9}>
                   <span className="dataTableTitle">Overview of Users</span>
                </Grid>

                <Grid item xs={3}>
                    <span style={{paddingLeft:'30px',paddingRight:'20px'}}>
                        <Button style={{backgroundColor:'red'}} size="small" variant="contained" onClick={DeleteAll} endIcon={<DeleteOutlineSharp/>}>
                            Delete All
                        </Button>
                    </span>

                    <span>
                        <Link to="/users/new">
                            <Button size="small" variant="contained" endIcon={<AddCircleRounded/>}>Add</Button>
                        </Link>
                    </span>
                </Grid>
            </Grid>
            
             <DataGrid 
               columns={userColumns.concat(actionColumn)}
               rows={userdata}
               pageSize={10}
               rowsPerPageOptions={[5]}
               disableSelectionOnClick
               style={{marginTop:'30px',fontFamily:'Asap'}}
               getRowHeight={() => 'auto'}
               autoHeight
               />

         </div>
   </>

  )
}


export default ListUser;