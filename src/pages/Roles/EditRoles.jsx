import React from 'react';
import Header from '../../components/Header';

import { useState,useEffect} from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';

import { Button, FormLabel, TextField} from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import swal from 'sweetalert';

const EditRoles=()=>{

  const {roleid} = useParams();
  const history= useNavigate();

  const [roleData,setRoleData]=useState({
    roleName :'',
    description :''
  })


   //role info
   useEffect( () =>{
    axios.get(`http://localhost:3001/role/${roleid}`).then(
      (response)=>{
          setRoleData(response.data);
      })
  },[roleid])


  const handleChange =  (e) =>{
    const{name,value} = e.target 
        setRoleData({
                 ...roleData,
                 [name] : value
               })
  }

  const enable = roleData.roleName && roleData.description;

  return (
    <>
      <div className="formPage">
        <Header title="Edit Role"/>
             <div className='FormContainer'>
             <form>
               <FormLabel color="success" required='true' className='label'>Role Name</FormLabel><br/>
                    <TextField style={{paddingBottom:'30px'}} 
                      variant='outlined'
                      fullWidth
                      name = 'roleName'
                      value={roleData.roleName}
                      onChange={handleChange}
                      /> <br/>

               <FormLabel required='true' className='label'>Role Previlages and short description</FormLabel><br/>
                    <TextField style={{paddingBottom:'30px'}}
                      variant='outlined'
                      fullWidth
                      multiline
                      name = 'description'
                      value={roleData.description}
                      onChange={handleChange}
                    />

              <div style={{paddingTop:'50px'}}>

                <span style={{paddingLeft:'55%'}}>
                  <Button  variant='contained' color="info" type="submit" disabled={!enable}>Save</Button>
                </span>

                <span style={{paddingLeft:'10%'}} onClick={() => history(-1)}>
                  <Button variant='contained' color='secondary'> 
                    <ArrowBackIosNewIcon fontSize="small" />Back
                  </Button>
                </span>

              </div>
             </form>     
             </div>
     
          </div>
    </>
  )
}

export default EditRoles;