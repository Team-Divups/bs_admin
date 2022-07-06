import React from 'react';
import Header from '../../components/Header';
import Editor from '../Editor';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import swal from 'sweetalert';

const initialValues = {
  roleName: '',
  description: '',
  created_at: new Date(),
};

const AddRole = () => {
  const [values, setValues] = useState(initialValues);
  const [file, setFile] = useState(null);
  const [FormErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const history = useNavigate();

  //validation
  const validate = (values) => {
    const errors = {};

    if (!values.roleName) {
      errors.category = 'Role Name is required!';
    }

    if (!values.description) {
      errors.problem = 'Description is required!';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(values));
    setIsSubmit(true);
  };

  //Changing upon errors
  useEffect(() => {
    if (Object.keys(FormErrors).length === 0 && isSubmit) {
      AddRol();
    }
  }, [FormErrors]);

  //updating values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const convertdate = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  //Add user
  const AddRol = async () => {
    try {
      await axios.post('http://localhost:3001/role/new', values).then(() => {
        console.log('success');

        swal({
          text: 'Role added successfully',
          icon: 'success',
          timer: 2000,
          buttons: false,
        });
      });
    } catch (err) {
      console.log(err);
      swal({
        text: 'Role is already exists',
        icon: 'success',
        timer: 2000,
        buttons: 'Abort',
      });
    }
    setValues(initialValues);
  };

  //disabling button
  const enable = values.roleName && values.description && values.created_at;

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Add New Role" />

        <div className="bottom">
          {/* left side with image*/}
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
              }
              alt="profile"
              className="userImg"
            />
          </div>

          <div className="right">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} columnSpacing={5}>
                <Grid item xs={6}>
                  <FormLabel color="success" required="true" className="label">
                    Role Name
                  </FormLabel>
                  <TextField
                    style={{ paddingBottom: '30px' }}
                    name="roleName"
                    value={values.roleName}
                    onChange={handleChange}
                    error={FormErrors.roleName}
                    helperText={FormErrors.roleName}
                  />

                  <FormLabel required="true" className="label">
                    Role description and previleges
                  </FormLabel>
                  <TextField
                    style={{ paddingBottom: '30px' }}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    error={FormErrors.description}
                    helperText={FormErrors.description}
                  />

                  <div>
                    <FormLabel className="label" style={{ paddingTop: '20px' }}>
                      Role created Date
                    </FormLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        style={{ paddingBottom: '15px', paddingTop: '15px' }}
                        format="MMM/dd/yyyy"
                        name="addedDate"
                        value={values.date}
                        onChange={(date) => {
                          handleChange(convertdate('date', date));
                        }}
                      ></KeyboardDatePicker>
                    </MuiPickersUtilsProvider>
                  </div>
                </Grid>
              </Grid>

              <div style={{ paddingTop: '50px' }}>
                <span style={{ paddingLeft: '60%' }}>
                  <Button
                    variant="contained"
                    color="info"
                    type="submit"
                    disabled={!enable}
                  >
                    Save
                  </Button>
                </span>

                <span
                  style={{ paddingLeft: '10%' }}
                  onClick={() => history(-1)}
                >
                  <Button variant="contained" color="secondary">
                    <ArrowBackIosNewIcon fontSize="small" />
                    Back
                  </Button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRole;
