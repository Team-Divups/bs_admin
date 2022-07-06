import React from 'react';
import Header from '../../components/Header';

import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Edit } from '@mui/icons-material';

import { Button, Grid, FormControl } from '@material-ui/core';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
//import { Select, MenuItem } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
//import Radio from '@mui/material/Radio';
//import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import swal from 'sweetalert';

const EditNotification = () => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState();

  const [sent, setSent] = useState(false);
  const [text, setText] = useState('');

  const { idRequest } = useParams();
  const history = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/notification/view/${idRequest}`)
      .then((response) => {
        setData({ ...response.data[0] });
      });
  }, [idRequest]);

  //Edit Request
  const EditRequest = async (idRequest) => {
    await axios
      .put('http://localhost:3001/notification/edit', {
        status: status,
        idRequest: idRequest,
      })
      .then(() => {
        swal({
          text: 'Notification updated successfully',
          icon: 'success',
          timer: 6000,
          buttons: false,
        });
      });
  };

  const handleSend = async (e) => {
    setSent(true);
    try {
      await axios.post('http://localhost:3001/send_mail', {
        text: text,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Edit Notification" />

        <form
          onSubmit={() => {
            EditRequest(idRequest);
          }}
        >
          <Card>
            <CardContent>
              <Grid container spacing={2} columnSpacing={5}>
                <Grid item xs={10}>
                  <Box className="content">
                    <Typography fontFamily="Asap">
                      <b style={{ paddingRight: '220px' }}>
                        Notification Information
                      </b>
                      <Link to={`/notifications/edit/${data.idRequest}`}>
                        <Edit sx={{ fontSize: 25 }} />
                      </Link>
                    </Typography>

                    <Divider
                      orientation="horizontal"
                      style={{ paddingTop: '15px', width: '75%' }}
                    />

                    <div className="infodesc">
                      <div style={{ fontSize: '13px', lineHeight: '2.4' }}>
                        <p style={{ fontSize: '18px' }}>
                          <span style={{ fontSize: '18px', color: 'black' }}>
                            <b>Problem Category : </b>{' '}
                          </span>
                          {data.category}
                        </p>
                        <p style={{ fontSize: '18px' }}>
                          <span style={{ color: 'black' }}>
                            <b>Site Name : </b>{' '}
                          </span>
                          {data.site_name}
                        </p>
                        <p style={{ fontSize: '18px' }}>
                          <span style={{ color: 'black' }}>
                            <b>Problem : </b>{' '}
                          </span>
                          {data.problem}
                        </p>
                        <p style={{ fontSize: '18px' }}>
                          <span style={{ color: 'black' }}>
                            <b>Severity_Level : </b>{' '}
                          </span>
                          {data.severity_level}
                        </p>
                        <p style={{ fontSize: '18px' }}>
                          <span style={{ color: 'black' }}>
                            <b>Status : </b>{' '}
                          </span>
                          {/* <FormControl>
                            <Select
                              style={{
                                paddingBottom: '20px',
                                width: '220%',
                                height: '35px',
                              }}
                              MenuProps={{
                                anchorOrigin: {
                                  vertical: 'bottom',
                                  horizontal: 'left',
                                },
                                transformOrigin: {
                                  vertical: 'top',
                                  horizontal: 'left',
                                },
                                getContentAnchorEl: null,
                              }}
                              labelId="demo-simple-select-label"
                              name="status"
                              value={data.status}
                              required
                              onChange={(e) => {
                                setStatus(e.target.value);
                              }}
                            >
                              <MenuItem value="progress">Progress</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                          </FormControl> */}

                          <FormControl required component="fieldset">
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={(e) => {
                                      setStatus(e.target.value);
                                    }}
                                    value="progress"
                                  />
                                }
                                label="Progress"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={(e) => {
                                      setStatus(e.target.value);
                                    }}
                                    value="completed"
                                  />
                                }
                                label="Completed"
                              />
                            </FormGroup>
                            <FormHelperText>Select one</FormHelperText>
                          </FormControl>
                        </p>
                      </div>
                    </div>
                  </Box>

                  {/* <FormControl>
                    <FormLabel required="true" className="label">
                      Status
                    </FormLabel>
                    <Select
                      style={{
                        paddingBottom: '20px',
                        width: '220%',
                        height: '35px',
                      }}
                      labelId="demo-simple-select-label"
                      name="status"
                      value={data.status}
                      required
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <MenuItem value="minor">Minor</MenuItem>
                      <MenuItem value="major">Major</MenuItem>
                      <MenuItem value="critical">Critical</MenuItem>
                    </Select>
                  </FormControl> */}
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <div style={{ paddingTop: '50px' }}>
            <span style={{ paddingLeft: '60%' }}>
              <Button
                variant="contained"
                color="info"
                type="submit"
                onSubmit={() => {
                  EditRequest(idRequest);
                }}
              >
                Save
              </Button>
            </span>

            <span
              style={{ paddingLeft: '10%' }}
              onClick={() => history('/notifications')}
            >
              <Button variant="contained" color="secondary">
                <ArrowBackIosNewIcon fontSize="small" />
                Back
              </Button>
            </span>
          </div>
        </form>
        {!sent ? (
          <form onSubmit={handleSend}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">Send Email</button>
          </form>
        ) : (
          <h1>Email Sent</h1>
        )}
      </div>
    </>
  );
};

export default EditNotification;
