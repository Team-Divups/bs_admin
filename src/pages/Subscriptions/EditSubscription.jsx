import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import axios from "axios";

import { Header } from "../../components";
import "../styles.css";

import { MenuItem, Select, Divider } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";

import swal from "sweetalert";

const EditSubscription = () => {
  const history = useNavigate();
  const { subid } = useParams();

  const initialValues = {
    name: "",
    category: "",
    type: "",
    owner: "",
    location: "",
    appLogo: "",
    description: "",
    email: "",
    contactNo: "",
    WebsiteURL: "",
    LinkedIn: "",
    facebook: "",
    Instagram: "",
    id: subid,
  };

  const [values, setValues] = useState(initialValues);
  const [FormErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [subdata, setSubData] = useState([]);


  //to get data when the application loads
  useEffect(() => {
    axios.get("http://localhost:3001/subscription").then((response) => {
      setSubData(response.data);
    });
  }, []);

  //Subscription info
  useEffect(() => {
    axios
      .get(`http://localhost:3001/subscription/${subid}`)
      .then((response) => {
        setValues({ ...response.data[0] });
      });
  }, [subid]);

  //updating values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //handle image
  const handleImage = (e) => {
    setValues({...values,appLogo:e.target.files[0]});
  }


  //validation
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Name is required!";
    } else if (values.name.length < 4) {
      errors.name = "Name must be more than 4 characters";
    } else if (values.name.length > 20) {
      errors.name = "Name cannot exceed more than 30 characters";
    }

    for (let i = 0; i <subdata.length; i++) {
      if (subdata[i].name === values.name) {
        errors.name='This Subscription name already exists';
      }
    }

    if (!values.type) {
      errors.type = "Subscribtion payment plan is required!";
    }

    if (!values.owner) {
      errors.owner = "Contact person for a subscription is required";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    return errors;
  };

  //submititng form
  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(values));
    setIsSubmit(true);
  };

  //Changing upon errors
  useEffect(() => {
    if (Object.keys(FormErrors).length === 0 && isSubmit) {
      console.log("button works");
      EditSub();
    }
  }, [FormErrors]);

  //Add subscription
  const EditSub = async () => {
    await axios
      .put("http://localhost:3001/subscription/edit", values, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then(() => {
        console.log("success");
        swal({
          text: "Subscription updated successfully",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
        history(-1);
      });
  };

  //disabling button
  const enable = values.name && values.type && values.owner && values.email;

  //disabling options
  const optionEnable = values.type === "Platinum";
  const optionEnable2 = values.type === "Platinum" || values.type === "Gold";

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Edit Subscription" />

        <div className="bottom">
          <div className="left">
            <img
              src={
                values.appLogo
                  ? `http://localhost:3001/${values.appLogo}`
                  : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
              }
              alt="profile"
              className="userImg"
            />
          </div>

          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formTitle">Basic Details</div>
              <Grid container>
                <Grid item xs={6}>
                  <FormLabel required="true" className="label">
                    Name
                  </FormLabel>
                  <TextField
                    style={{ paddingBottom: "30px" }}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={FormErrors.name}
                    helperText={FormErrors.name}
                  />

                  <FormLabel required="true" className="label">
                    Subscription Payment
                  </FormLabel>
                  <RadioGroup
                    style={{ paddingBottom: "15px" }}
                    name="type"
                    value={values.type}
                    required
                    onChange={handleChange}
                    error={FormErrors.type}
                    helperText={FormErrors.type}
                  >
                    <FormControlLabel
                      value="Platinum"
                      control={<Radio color="success" />}
                      label="Platinum ($100)"
                    />

                    <FormControlLabel
                      value="Gold"
                      control={<Radio color="success" />}
                      label="Gold ($75)"
                      disabled={optionEnable}
                    />

                    <FormControlLabel
                      value="Silver"
                      control={<Radio color="success" />}
                      label="Silver ($50)"
                      disabled={optionEnable2}
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={6}>
                  <FormControl style={{ paddingBottom: "15px" }}>
                    <FormLabel
                      className="label"
                      style={{ paddingBottom: "15px" }}
                    >
                      Subscription Category
                    </FormLabel>
                    <Select
                      style={{ height: "35px", textAlign: "center" }}
                      id="demo-simple-select-autowidth"
                      name="category"
                      autoWidth
                      value={values.category}
                      onChange={handleChange}
                    >
                      <MenuItem value="Restuarant">Restuarant</MenuItem>
                      <MenuItem value="Hotel">Hotel</MenuItem>
                      <MenuItem value="Resort">Resort</MenuItem>
                      <MenuItem value="Villa">Villa</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <FormLabel className="label">Location</FormLabel>
                  <TextField
                    style={{ paddingBottom: "30px" }}
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                  />

                  <div>
                    <FormLabel className="label">
                      Subscription Logo : <DriveFolderUploadIcon />
                    </FormLabel>

                    <input
                      style={{ paddingTop: "15px", paddingBottom: "15px" }}
                      type="file"
                      name="appLogo"
                      onChange={handleImage}
                    />
                  </div>
                </Grid>
              </Grid>

              {/* description section*/}
              <br />
              <Divider orientation="horizontal" style={{ width: "75%" }} />
              <br />

              <div className="formTitle">Description</div>

              <FormLabel className="label">
                Short Description about the subscription
              </FormLabel>
              <TextField
                style={{ paddingBottom: "30px", paddingTop: "20px" }}
                variant="outlined"
                fullWidth
                multiline
                name="description"
                value={values.description}
                onChange={handleChange}
              />

              <Grid container spacing={2}>
                {/* Contact section */}

                <Grid item xs={6}>
                  <br />
                  <Divider
                    orientation="horizontal"
                    style={{ width: "75%", paddingTop: "10px" }}
                  />
                  <br />

                  <div className="formTitle">Contact Details</div>

                  <FormLabel required="true" className="label">
                    Contact Person
                  </FormLabel>
                  <TextField
                    style={{ paddingBottom: "30px" }}
                    name="owner"
                    value={values.owner}
                    onChange={handleChange}
                    error={FormErrors.owner}
                    helperText={FormErrors.owner}
                  />

                  <FormLabel required="true" className="label">
                    Contact Email
                  </FormLabel>
                  <TextField
                    style={{ paddingBottom: "30px" }}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={FormErrors.email}
                    helperText={FormErrors.email}
                  />

                  <FormLabel className="label">Contact Number</FormLabel>
                  <TextField
                    style={{ paddingBottom: "30px" }}
                    name="contactNo"
                    value={values.contactNo}
                    onChange={handleChange}
                    error={FormErrors.contactNo}
                    helperText={FormErrors.contactNo}
                  />
                </Grid>

                {/* Social Media section */}
                <Grid item xs={6}>
                  <br />
                  <Divider
                    orientation="horizontal"
                    style={{ width: "75%", paddingTop: "10px" }}
                  />
                  <br />

                  <div className="formTitle">Social Media</div>

                  <FormLabel className="label">Website</FormLabel>
                  <TextField
                    style={{ paddingBottom: "30px" }}
                    name="WebsiteURL"
                    value={values.WebsiteURL}
                    onChange={handleChange}
                    error={FormErrors.WebsiteURL}
                    helperText={FormErrors.WebsiteURL}
                  />

                  <FormLabel className="label">LinkedIn</FormLabel>
                  <TextField
                    style={{ paddingBottom: "30px" }}
                    name="LinkedIn"
                    value={values.LinkedIn}
                    onChange={handleChange}
                    error={FormErrors.LinkedIn}
                    helperText={FormErrors.LinkedIn}
                  />

                  <FormLabel className="label">FaceBook</FormLabel>
                  <TextField
                    style={{ paddingBottom: "30px" }}
                    name="facebook"
                    value={values.facebook}
                    onChange={handleChange}
                    error={FormErrors.facebook}
                    helperText={FormErrors.facebook}
                  />

                  <FormLabel className="label">Instagram</FormLabel>
                  <TextField
                    style={{ paddingBottom: "30px" }}
                    name="Instagram"
                    value={values.Instagram}
                    onChange={handleChange}
                    error={FormErrors.Instagram}
                    helperText={FormErrors.Instagram}
                  />
                </Grid>
              </Grid>

              {/*buttons*/}
              <div style={{ paddingTop: "50px" }}>
                <span style={{ paddingLeft: "60%" }}>
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
                  style={{ paddingLeft: "10%" }}
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

export default EditSubscription;
