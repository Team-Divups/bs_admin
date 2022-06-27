import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import {Grid,Button} from '@mui/material';

import Header from '../../components/Header';
import {subColumns} from './DataSource';
import '../styles.css';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AddCircleRounded, DeleteOutlineSharp } from '@mui/icons-material';



const ListSubscription = ()=>{

    const [subdata,setSubData] = useState([]);

    //to get data when the application loads
    useEffect( () =>{
    axios.get("http://localhost:3001/subscription").then(
        (response)=>{
            setSubData(response.data);
        })
    },[])


    // Delete one subscription
    const Delete = (id) =>{

        swal({
            text : "Are you sure you want to delete?",
            buttons: true,
            dangerMode: true,
        }).then( (willDelete)=>{
            if(willDelete){
                axios.put(`http://localhost:3001/subscription/deleteid`,{
                    visibility : 0 ,
                    id:id
                }).then(
                    (response)=>{
                        swal({
                            title : 'Done !',
                            text  : 'Subscription is deleted',
                            icon  : 'success',
                            timer : 2000,
                            button : false,
                        })
                        setSubData(subdata.filter((val)=>{
                            return(
                              val.visibility === 1
                            )
                          }))
                    }
                )
            } else {
                swal({
                    text : "Subscription details are restored !",
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
                axios.put("http://localhost:3001/subscription/delete",{
                    visibility:0
                }).then(
                    (response)=>{
                        swal({
                            title : 'Done !',
                            text  : 'All Subscriptions are deleted',
                            icon  : 'success',
                            timer : 2000,
                            button : false,
                        })
                        setSubData(subdata.filter((val)=>{
                            return(
                              val.visibility === 1
                            )
                          }))
                    }
                )
            } else {
                swal({
                    text : "Subscription details are restored !",
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
        width:140,
        renderCell: (params) => {
            return (
                <div className="cellAction">
                    <Link to={`/subscriptions/${params.row.id}`}>
                        <div className="viewButton"><VisibilityIcon fontSize='small'/></div>
                    </Link>

                    <Link to={`/subscriptions/edit/${params.row.id}`}>
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
            <Header category="Page" title="Subscriptions"/>

            <Grid container spacing={2}>
                <Grid item xs={9}>
                   <span className="dataTableTitle">Overview of Subscriptions</span>
                </Grid>

                <Grid item xs={3}>
                    <span style={{paddingLeft:'30px',paddingRight:'20px'}}>
                        <Button style={{backgroundColor:'red'}} size="small" variant="contained" onClick={DeleteAll} endIcon={<DeleteOutlineSharp/>}>
                            Delete All
                        </Button>
                    </span>

                    <span>
                        <Link to="/subscriptions/new">
                            <Button size="small" variant="contained" endIcon={<AddCircleRounded/>}>Add</Button>
                        </Link>
                    </span>
                </Grid>
            </Grid>
            
            
             <DataGrid 
               columns={subColumns.concat(actionColumn)}
               rows={subdata}
               pageSize={10}
               rowsPerPageOptions={[5]}
               style={{marginTop:'30px',fontFamily:'Asap'}}
               getRowHeight={() => 'auto'}
               autoHeight
               />

         </div>
   </>

  )
}


export default ListSubscription;