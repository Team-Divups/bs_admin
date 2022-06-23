import React from 'react';
import Header from '../../components/Header';

import { useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

import { Button,FormControlLabel, FormLabel, Grid,Radio,RadioGroup} from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import swal from 'sweetalert';

const EditUser=()=>{

  const [role,setRole] = useState();
  const [status,setStatus]=useState();

  const {userid} = useParams();
  const history= useNavigate();

  useEffect( () =>{
    axios.get(`http://localhost:3001/subscription/${userid}`).then(
      (response)=>{
          setRole(response.role);
          setStatus(response.status);
      })
  },[userid])

  //Edit user
  const EditUser = async (id)=>{
    await axios.put('http://localhost:3001/user/edit',{
      role: role,
      status :status,
      id:id
    }).then(()=>{
          swal({
              text: "User updated successfully",
              icon: "success",
              timer : 6000,
              buttons :false,
          })
  })
  }

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Edit User"/>

            <form onSubmit={()=>{EditUser(userid)}}>
              <Grid container spacing={2} columnSpacing={5}>

                <Grid item xs={6}>
                    <FormLabel required='true' className='label'>Role</FormLabel>
                    <RadioGroup style={{paddingBottom:'20px'}} 
                      name='role'
                      value={role}
                      required
                      onChange={(e)=>{setRole(e.target.value)}}>

                        <FormControlLabel value="1" control={<Radio color='success'/>} label="Admin"/>
                        <FormControlLabel value="2" control={<Radio color='success'/>} label="Moderator"/>
                        <FormControlLabel value="3" control={<Radio color='success'/>} label="User"/>

                    </RadioGroup>
                </Grid>

                <Grid item xs={6}>
                  

                    <FormLabel required='true' className='label'>Status</FormLabel>
                    <RadioGroup style={{paddingBottom:'20px'}} 
                      name='status'
                      value={status}
                      required
                      onChange={(e)=>{setStatus(e.target.value)}}>
                                       
                        <FormControlLabel value="0" control={<Radio color='success'/>} label="Invited"/>
                        <FormControlLabel value="1" control={<Radio color='success'/>} label="Active"/>

                    </RadioGroup>
                </Grid>
              </Grid>

              <div style={{paddingTop:'50px'}}>
                <span style={{paddingLeft:'60%'}}>
                  <Button  variant='contained' color="info" type="submit">Save</Button>
                </span>

                <span style={{paddingLeft:'10%'}} onClick={() => history('/users')}>
                  <Button variant='contained' color='secondary'> 
                    <ArrowBackIosNewIcon fontSize="small" />Back
                  </Button>
                </span>
              </div>

            </form>
          </div>
    </>
  )
}

export default EditUser;