import React, { useState,useEffect} from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Grid,Radio,RadioGroup,TextField} from '@material-ui/core';
import axios from 'axios';

import { Header } from '../../components';
import '../styles.css';

import { MenuItem, Select,Divider} from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

import swal from 'sweetalert';


const initialValues ={
    subId: '' ,
    name : '',
    category : '',
    type :'',
    owner : '',
    location :'',
    description:''
}

const NewSubscription =()=>{

    const [values,setValues] = useState(initialValues);
    const [file,setFile] = useState(null);
    const [FormErrors,setFormErrors]= useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    const history = useNavigate();

    //updating values
    const handleChange =  (e) =>{
        const{name,value} = e.target 
            setValues({
                     ...values,
                     [name] : value
                   })
        }

   
     //validation
     const validate = (values) =>{
        const errors = {};
        const regex = /[a-zA-Z]/;

        if (!values.subId) {
            errors.subId = "Subscription ID is required!";
        } else if (values.subId.length !== 5) {
              errors.subId = "ID must consist of exactly 5 characters";
        } else if (!regex.test(values.id)) {
              errors.subId = "Must contain atleast one alpabetic character";
        }

        if (!values.name) {
          errors.name = "Name is required!";
        } else if (values.name.length < 4) {
            errors.name = "Name must be more than 4 characters";
        } else if (values.name.length > 20) {
            errors.name = "Name cannot exceed more than 30 characters";
        }

        if (!values.type) {
          errors.type = "Subscribtion payment plan is required!";
        } 

        if (!values.owner) {
          errors.owner = "Contact person for a subscription is required";
        }
        return errors;
    }


    //submititng form
    const handleSubmit = (e) =>{
        e.preventDefault();

        setFormErrors(validate(values));
        setIsSubmit(true);
        
    }

    //Changing upon errors
    useEffect(() => {
        if (Object.keys(FormErrors).length === 0 && isSubmit) {
          AddSub();
        }
      },[FormErrors]);



    //Add subscription
    const AddSub = async ()=>{
        await axios.post('http://localhost:3001/subscription/create',values).then(()=>{
            console.log("success");
            swal({
                text: "Subscription added successfully",
                icon: "success",
                timer : 2000,
                buttons :false,
            })
            history(-1);
    })
    }


    //disabling button
    const enable = values.subId.length>0 && values.name.length>0 && values.type.length>0 && values.owner.length>0;

    

  return (
    <>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Add new Subscription"/>

            <div className='bottom'>

                <div className='left'>
                    <img 
                        src= {file ?
                            URL.createObjectURL(file)
                            :"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                        alt="profile" 
                        className='userImg'/>
                </div>

                <div className='right'>
                    <form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={6}>

                                <FormLabel required='true' className='label'>Subscription ID</FormLabel>
                                   <TextField style={{paddingBottom:'30px'}} 
                                       name='subId'
                                       value={values.subId}
                                       onChange={handleChange}
                                       error={FormErrors.subId}
                                       helperText={FormErrors.subId}
                                   />

                                <FormLabel required='true' className='label'>Name</FormLabel>
                                   <TextField style={{paddingBottom:'30px'}} 
                                       name='name'
                                       value={values.name}
                                       onChange={handleChange}
                                       error={FormErrors.name}
                                       helperText={FormErrors.name}
                                   />

                                   <FormLabel required='true' className='label'>Subscription Payment </FormLabel>
                                   <RadioGroup style={{paddingBottom:'15px'}} 
                                      name='type'
                                      value={values.type}
                                      required
                                      onChange={handleChange}
                                      error={FormErrors.type}
                                      helperText={FormErrors.type}>

                                       <FormControlLabel value="Gold" control={<Radio  color="success"/>} label="Gold"/>
                                       <FormControlLabel value="Platinum" control={<Radio  color="success"/>} label="Platinum"/>
                                       <FormControlLabel value="Silver" control={<Radio  color="success"/>} label="Silver"/>
                                   </RadioGroup>

                            </Grid>

                            <Grid item xs={6}>

                                <FormControl style={{paddingBottom:'15px'}}>
                                    <FormLabel className='label' style={{paddingBottom:'15px'}}>Subscription Category</FormLabel>
                                    <Select style={{height:'35px',textAlign:'center'}} 
                                      id="demo-simple-select"
                                      name='category'
                                      value={values.category}
                                      onChange={handleChange}>
                                        
                                        <MenuItem value="Restuarant">Restuarant</MenuItem>
                                        <MenuItem value='Hotel'>Hotel</MenuItem>
                                        <MenuItem value="Resort">Resort</MenuItem>
                                        <MenuItem value="Villa">Villa</MenuItem>
                                        <MenuItem value='Other'>Other</MenuItem>
                                       
                                    </Select>
                                </FormControl>      
                            

                                <FormLabel  required='true' className='label'>Contact Person</FormLabel>
                                   <TextField style={{paddingBottom:'30px'}} 
                                       name='owner'
                                       value={values.owner}
                                       onChange={handleChange}
                                       error={FormErrors.owner}
                                       helperText={FormErrors.owner}
                                   />

                                <FormLabel className='label'>Location</FormLabel>
                                   <TextField style={{paddingBottom:'30px'}} 
                                       name='location'
                                       value={values.location}
                                       onChange={handleChange}
                                    />  

                                    <div>
                                       <FormLabel className='label'>
                                        Subscription Logo : <DriveFolderUploadIcon/>
                                       </FormLabel>
                                       <input style={{paddingTop:'15px',paddingBottom:'15px'}}
                                           type='file'
                                           onChange={(e)=>{setFile(e.target.value);}}
                                       />
                                   </div> 

                                   
                            </Grid>
                        </Grid>

                        <br/><Divider orientation='horizontal' style={{width:'75%'}}/><br/><br/>

                        <div className='formTitle'>Description</div>

                           <FormLabel className='label'>Short Description about the subscription</FormLabel>
                           <TextField style={{paddingBottom:'30px'}}
                               variant='outlined'
                               fullWidth
                               multiline
                               name = 'description'
                               value={values.description}
                               onChange={handleChange}
                            />  

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

export default NewSubscription;