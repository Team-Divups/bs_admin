import { Button, FormControl, FormControlLabel, FormLabel, Grid,Radio,RadioGroup,TextField} from '@material-ui/core';
import { Select,MenuItem} from '@mui/material';
import { useState,useEffect} from 'react';
import {Header} from '../../components';

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import './Forms.css';


const initialValues = {
    name : '',
    email :'',
    company : '',
    role : 'user',
    isJoined :'joined',
    addedDate : new Date()
}

const Forms = ()=>{

    // state initializations
    const [values,setValues] = useState(initialValues);
    const [file,setFile] = useState(null);
    const [FormErrors,setFormErrors]= useState({});
    const [isSubmit, setIsSubmit] = useState(false);


   //updating values
    const handleChange =  (e) =>{
        const{name,value} = e.target 
            setValues({
                     ...values,
                     [name] : value
                   })

        }

    //updating date values
    const convertdate = (name, value) => ({
        target: {
            name, value
        }
    })


    //validation
    const validate = (values) =>{
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.name) {
          errors.name = "Name is required!";
        } else if (values.name.length < 4) {
            errors.name = "Name must be more than 4 characters";
        } else if (values.name.length > 20) {
            errors.name = "Name cannot exceed more than 20 characters";
        }

        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }

        if (!values.company) {
          errors.company = "Comapany is required";
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
          alert("Validation Completed");
          AddUser();
        }
      },[FormErrors]);

    
    // Resetting form
    const resetForm = () => {
        setValues(initialValues);
        setFormErrors({})
    }

    //Add user
    const AddUser = ()=>{
        alert("User Added");
        //resetForm();
    }

    //disabling button
    const enable = values.name.length>0 && values.email.length>0 && values.company.length>0;
    

    return(
        <>
             <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Page" title="Forms" />

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
                       <form onSubmit={handleSubmit}>
                           <Grid container>
                           <Grid item xs= {6}>
                               <FormLabel color="success" required='true' className='label'>Name</FormLabel>
                                   <TextField style={{paddingBottom:'30px'}} 
                                       name = 'name'
                                       value={values.name}
                                       onChange={handleChange}
                                       error={FormErrors.name}
                                       helperText={FormErrors.name}
                                   />
                                 
                                   <FormLabel required='true' className='label'>Email</FormLabel>
                                   <TextField style={{paddingBottom:'30px'}} 
                                       name = 'email'
                                       value={values.email}
                                       onChange={handleChange}
                                       error={FormErrors.email}
                                       helperText={FormErrors.email}
                                   />
                                

                                   <FormLabel required='true' className='label'>Company</FormLabel>
                                   <TextField style={{paddingBottom:'20px'}}
                                       name = 'company'
                                       value={values.company}
                                       onChange={handleChange}
                                       error={FormErrors.company}
                                       helperText={FormErrors.company}
                                   />

                                   <div>
                                       <FormLabel className='label'>
                                       Image : <DriveFolderUploadIcon/>
                                       </FormLabel>
                                       <input style={{paddingTop:'15px',paddingBottom:'15px'}}
                                           type='file'
                                           onChange={(e)=>{setFile(e.target.value);}}
                                       />
                                   </div>
                            </Grid>

                            <Grid item xs= {6}>

                               <FormControl>
                                   <FormLabel required='true' className='label'>Role</FormLabel>
                                   <RadioGroup style={{paddingBottom:'20px'}} 
                                      name='role'
                                      row={true}
                                      value={values.role}
                                      required
                                      onChange={handleChange}
                                   >
                                       <FormControlLabel value="Admin" control={<Radio  color="success"/>} label="Admin"/>
                                       <FormControlLabel value="Collaborator" control={<Radio />} label="Collaborator"/>
                                       <FormControlLabel value="User" control={<Radio  color="success"/>} label="User"/>
                                   </RadioGroup>
                               </FormControl>

                               <FormControl>
                                   <FormLabel required='true' className='label'>Status </FormLabel>
                                   <RadioGroup style={{paddingBottom:'20px'}} 
                                      name='isJoined'
                                      row={true}
                                      value={values.isJoined}
                                      required
                                      onChange={handleChange}
                                   >
                                       <FormControlLabel value="joined" control={<Radio  color="success"/>} label="Joined"/>
                                       <FormControlLabel value="invited" control={<Radio  color="success"/>} label="Invited"/>
                                       <FormControlLabel value="declined" control={<Radio  color="success"/>} label="Declined"/>
                                   </RadioGroup>
                               </FormControl>

                               <FormControl>
                                   <FormLabel required='true' className='label'>Role</FormLabel>
                                   <Select style={{paddingBottom:'20px',width:'220%',height:'35px'}} 
                                      id="demo-simple-select"
                                      name='Role'
                                      value={values.role}
                                      required
                                      onChange={handleChange}>
                                      <MenuItem value="Admin">Admin</MenuItem>
                                      <MenuItem value="Collaborator">Collaborator</MenuItem>
                                      <MenuItem value="User">User</MenuItem>
                                    </Select>
                               </FormControl>

                              
                                <div>
                                <FormLabel className='label' style={{paddingTop:'20px'}}>Joined Date</FormLabel>
                                   <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                       <KeyboardDatePicker style={{paddingBottom:'15px',paddingTop:'15px'}} 
                                           format='MMM/dd/yyyy'
                                           name='addedDate'
                                           value={values.addedDate}
                                           onChange={(date)=>{handleChange(convertdate('addedDate',date))}}
                                           >
                                       </KeyboardDatePicker>
                                   </MuiPickersUtilsProvider>
                                </div>
                            
                               
                            </Grid>
                           </Grid>

                           <div style={{paddingTop:'20px'}}>
                           <span style={{paddingLeft:'60%'}}>
                              <Button  variant='contained' color="success" type="submit" disabled={!enable}>Add +</Button>
                           </span>
                           <span style={{paddingLeft:'10%'}}>
                              <Button variant='contained' color='secondary'> <ArrowBackIosNewIcon fontSize="small" onClick={resetForm}/>Back</Button>
                           </span>
                           </div>

                       </form>
                   </div>


                </div>
             </div>
        </>
    )
}

export default Forms;