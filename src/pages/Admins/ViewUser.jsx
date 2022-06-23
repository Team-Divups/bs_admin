import axios from 'axios';
import React, { useEffect, useState} from 'react'
import {useParams,Link} from 'react-router-dom';
import {Card, CardContent, CardMedia, Typography,Grid,Box,Divider} from '@mui/material';

import Header from '../../components/Header';
import site from '../../Assets/site.jpg';
import sitesm from '../../Assets/site.png';

import '../viewpage.css';
import { Edit } from '@mui/icons-material';



const ViewUser = ()=>{

    const {userid} = useParams();

    const [userData,setUserData] = useState([]);
    const [roleData,setRoleData] = useState([]);
    
  
    //user info
    useEffect( () =>{
        axios.get(`http://localhost:3001/user/${userid}`).then(
          (response)=>{
              setUserData({...response.data[0]});
          })
      },[userid])


    //role details list
    useEffect( () =>{
      axios.get(`http://localhost:3001/role`).then(
        (response)=>{
            setRoleData(response.data);
        })
    },[])

  
  return (
    <>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="User Overview"/>
            
            <Card>
              <CardMedia
                component="img"
                className='cardHeaderImage'
                image={site}
                alt="site"/>
            </Card>

          
                  <Card>
                    <CardContent>

                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={1.1}>
                          <img src={sitesm} alt="profile" className='profileimg'/>
                        </Grid>

                        <Grid item xs={9.5}>
                          <Box height="100%" mt={0.5} lineHeight={1}>
                            <Typography variant='h5' fontFamily='Mulish'><b>{userData.firstName} {userData.lastName}</b></Typography>
                            <Typography className='category'>{userData.position}</Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={1}>
                        
                            {userData.role=== 1 ? (
                              <span className='modebtn' style={{backgroundColor:'#355C7D'}}>Admin</span>
                            ) : userData.role=== 2 ? (
                              <span><span className='modebtn' style={{backgroundColor:"#6C5B7B"}}>Moderator</span></span>
                            ) : (
                              <span ><span className='modebtn' style={{backgroundColor:'#F8B195'}}>User</span></span>
                            )}
                     
                        </Grid>
                      </Grid>

                     

                      <Grid container spacing={2} columnSpacing={8}>

                        <Grid item xs={6} >
                          <Box className='content'>
                            <Typography fontFamily='Asap'><b style={{paddingRight:'220px'}}>User Information</b>
                            <Link to={`/users/edit/${userData.id}`}>
                              <Edit sx={{fontSize:15}}/>
                            </Link></Typography>
                             
                            <Divider orientation='horizontal' style={{paddingTop:'15px',width:'75%'}}/>

                            <div className='infodesc'>

                              <div style={{fontSize:'13px',lineHeight:'2.4'}}>
                              <p><span style={{color:'black'}}><b>Company ID  :    </b> </span>{userData.companyID}</p>
                              <p><span style={{color:'black'}}><b>Designation  :    </b> </span>{userData.position}</p>
                              <p><span style={{color:'black'}}><b>Email  :    </b> </span>{userData.email}</p>
                              
                              </div>
                            </div>
                            
                          </Box>
                        </Grid>

                        <Grid item xs={6}>

                          <Box className='content'>
                            <Typography fontFamily='Asap' ><b>Previlages and access</b></Typography>
                            <Divider orientation='horizontal' style={{paddingTop:'15px',width:'75%'}}/><br/>
                           
                                {roleData.map((tdata,index)=>{
                                  return(
                                    <>
                                    {tdata.idrole===userData.role ? (
                                      <div className='userinfo'>{tdata.description}</div>
                                    ):(
                                      <span></span>
                                    )}    
                                    </>
                                  )
                                })}
                            
                          </Box>
                        </Grid>
                      </Grid>
                      
                    </CardContent>
                  </Card>
        </div>
    </>
  )
}

export default ViewUser;