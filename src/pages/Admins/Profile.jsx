import React from 'react';
import Header from '../../components/Header';

import { useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

import { Button, FormLabel, Grid,TextField} from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import swal from 'sweetalert';

  

const Profile=()=>{
  
    const [values,setValues] = useState({
        firstName : '',
        lastName : '',
        email :'',
        password :'',
        position : '',
        companyID:'',
      });
    
      const [file,setFile] = useState(null);
      const [FormErrors,setFormErrors]=useState({});
      const [isSubmit, setIsSubmit] = useState(false);
    
      const {userid} = useParams();
      const history= useNavigate();
    
       //user info
       useEffect( () =>{
        axios.get(`http://localhost:3001/user/${userid}`).then(
          (response)=>{
              setValues({...response.data[0]});
          })
          console.log(values.status);
      },[userid])
    
      
    
      //validation
      const validate = (values) =>{
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const pasregex = /[a-zA-Z]/;
    
        if (!values.firstName) {
          errors.firstName = "First Name is required!";
        } else if (values.firstName.length < 4) {
            errors.firstName = "First Name must be more than 4 characters";
        } else if (values.firstName.length > 20) {
            errors.firstName = "First Name cannot exceed 15 characters";
        }
    
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
    
        if (!values.password) {
          errors.password = "Paassword is required!";
        } else if (values.password.length < 4) {
          errors.password = "Password is too short!";
        }else if(!pasregex.test(values.password)){
          errors.password='Must contain atleast one alphabhetic character'
        }
    
        if (!values.position) {
          errors.position = "Position is required";
        }
    
        if (!values.companyID) {
          errors.companyID = "Company ID is required!";
        } else if (values.companyID.length !== 8) {
            errors.companyID = "ID must consist of exactly 8 characters";
        }
    
        return errors;
      }
    
    
    
      const handleSubmit = (e) =>{
        e.preventDefault();
    
        setFormErrors(validate(values));
        setIsSubmit(true);
      }
    
    
    
      //Changing upon errors
      useEffect(() => {
        if (Object.keys(FormErrors).length === 0 && isSubmit) {
          EditProfile();
        }
      },[FormErrors]);
    
    
      //updating values
      const handleChange =  (e) =>{
        const{name,value} = e.target 
            setValues({
                     ...values,
                     [name] : value
                   })
      }
    
      
      //Add user
      const EditProfile = async (id)=>{
        await axios.put('http://localhost:3001/user/profileedit',{values,id}).then(()=>{
            console.log("success");
              swal({
                  text: "Profile updated successfully",
                  icon: "success",
                  timer : 2000,
                  buttons :false,
              })
      })
      }
    
    
      //disabling button
      const enable = values.firstName && values.email &&  values.password && values.companyID && values.position 
    

  return (
    <>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Profile Settings"/>

        <div className='bottom'>
           {/* left side with image*/ }
          <div className='left'>
            <img 
              src= {file ?
                  URL.createObjectURL(file)
                  :"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                  alt="profile" 
                  className='userImg'
            />
          </div>

          <div className='right'>

            <form onSubmit={()=>{handleSubmit(values.id)}}>
              <Grid container spacing={2} columnSpacing={5}>

                <Grid item xs={6}>

                  <FormLabel color="success" required='true' className='label'>First Name</FormLabel>
                    <TextField style={{paddingBottom:'30px'}} 
                      name = 'firstName'
                      value={values.firstName}
                      onChange={handleChange}
                      error={FormErrors.firstName}
                      helperText={FormErrors.firstName}
                      />


                  <FormLabel required='true' className='label'>Company ID</FormLabel>
                    <TextField style={{paddingBottom:'30px'}}
                      name = 'companyID'
                      value={values.companyID}
                      onChange={handleChange}
                      error={FormErrors.companyID}
                      helperText={FormErrors.companyID}
                    />
                  

                  <FormLabel required='true' className='label'>Password</FormLabel>
                    <TextField style={{paddingBottom:'30px'}}
                      type='password'
                      name = 'password'
                      value={values.password}
                      onChange={handleChange}
                      error={FormErrors.password}
                      helperText={FormErrors.password}
                    />

                  
                 <div>
                    <FormLabel className='label'>
                        Profile Photo : <DriveFolderUploadIcon/>
                    </FormLabel>
                        <input style={{paddingTop:'15px',paddingBottom:'15px'}}
                            type='file'
                            onChange={(e)=>{setFile(e.target.value);}}
                            />
                 </div> 
                
                </Grid>

                <Grid item xs={6}>
                  
                  <FormLabel  className='label'>Last Name</FormLabel>
                    <TextField style={{paddingBottom:'30px'}}
                      name = 'lastName'
                      value={values.lastName}
                      onChange={handleChange}
                      error={FormErrors.lastName}
                      helperText={FormErrors.lastName}
                    />

                  <FormLabel required='true' className='label'>Email</FormLabel>
                    <TextField style={{paddingBottom:'30px'}} 
                      name = 'email'
                      value={values.email}
                      onChange={handleChange}
                      error={FormErrors.email}
                      helperText={FormErrors.email}
                    />

                  <FormLabel required='true' className='label'>Position</FormLabel>
                    <TextField style={{paddingBottom:'30px'}}
                      name = 'position'
                      value={values.position}
                      onChange={handleChange}
                      error={FormErrors.position}
                      helperText={FormErrors.position}
                    />

                </Grid>
              </Grid>

              <div style={{paddingTop:'50px'}}>

                <span style={{paddingLeft:'60%'}}>
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
      </div>
    </>
  )
}

export default  Profile;