import React from 'react';
import Header from '../../components/Header';

import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Edit } from '@mui/icons-material';

import { Button, Grid, FormControl } from '@material-ui/core';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import swal from 'sweetalert';

const EditNotification = () => {
  const { idRequest } = useParams();
  const history = useNavigate();

  const initialValues = {
    category: '',
    problem: '',
    severity_level: '',
    site_name: '',
    date: new Date(),
    status: '',
    userId: '',
    last_updated: new Date(),
    idRequest: idRequest,
  };
  const [data, setData] = useState(initialValues);

  // const [sent, setSent] = useState(false);
  // const [text, setText] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/notification/view/${idRequest}`)
      .then((response) => {
        setData({ ...response.data[0] });
      });
  }, [idRequest]);

  //Edit Request
  const EditRequest = async () => {
    await axios
      .put('http://localhost:3001/notification/edit', data)
      .then(() => {
        swal({
          text: 'Notification updated successfully',
          icon: 'success',
          timer: 6000,
          buttons: false,
        });
      });
    history(-1);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // const handleSend = async (e) => {
  //   setSent(true);
  //   try {
  //     await axios.post('http://localhost:3001/send_mail', {
  //       text: text,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const validate = (data) => {
    const errors = {};

    if (!data.status) {
      errors.status = 'Status is required!';
    }

    return errors;
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
                        </p>
                        <FormControl>
                          <RadioGroup
                            //checked={selected}
                            value={data.severity_level}
                            style={{ paddingBottom: '20px' }}
                            name="severity_level"
                            required
                            row
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              style={{ paddingRight: '25px' }}
                              value="minor"
                              control={<Radio color="success" />}
                              label="Minor"
                            />
                            <FormControlLabel
                              style={{ paddingRight: '25px' }}
                              value="major"
                              control={<Radio color="success" />}
                              label="Major"
                            />
                            <FormControlLabel
                              value="critical"
                              control={<Radio color="success" />}
                              label="Critical"
                            />
                          </RadioGroup>
                        </FormControl>
                        <p style={{ fontSize: '18px' }}>
                          <span style={{ color: 'black' }}>
                            <b>Status : </b>
                          </span>
                          <RadioGroup
                            value={data.status}
                            style={{ paddingBottom: '20px' }}
                            name="status"
                            required
                            row
                            onChange={handleChange}
                            error={validate.status}
                            helperText={validate.status}
                          >
                            <FormControlLabel
                              style={{ paddingRight: '25px' }}
                              value="Not yet Started"
                              control={<Radio color="success" />}
                              label="Not Yet Started"
                            />
                            <FormControlLabel
                              style={{ paddingRight: '25px' }}
                              value="progress"
                              control={<Radio color="success" />}
                              label="Progress"
                            />
                            <FormControlLabel
                              value="completed"
                              control={<Radio color="success" />}
                              label="Completed"
                            />
                          </RadioGroup>
                        </p>
                      </div>
                    </div>
                  </Box>
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
        {/* {!sent ? (
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
        )} */}
      </div>
    </>
  );
};

export default EditNotification;
