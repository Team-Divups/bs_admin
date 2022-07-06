import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  CardActions,
  Button,
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

import Header from '../../components/Header';

import Moment from 'react-moment';

//import '../viewpage.css';
import '../styles.css';
import { Edit } from '@mui/icons-material';

const ViewNotification = () => {
  const { idRequest } = useParams();

  const [Data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [btnshow, setBtnShow] = useState(true);

  //Request info
  useEffect(() => {
    axios
      .get(`http://localhost:3001/notification/view/${idRequest}`)
      .then((response) => {
        setData({ ...response.data[0] });
      });
  }, [idRequest]);

  const hideButton = () => {
    setBtnShow(false);
  };

  const showButton = () => {
    setBtnShow(true);
  };
  const showContent = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Notification Overview" />

        <Card>
          <CardContent>
            <Grid container spacing={2} columnSpacing={8}>
              <Grid item xs={10}>
                <Box className="content">
                  <Typography
                    fontFamily="Asap"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    <b style={{ paddingRight: '220px' }}>
                      Notification Information
                    </b>
                    <Link to={`/notifications/edit/${Data.idRequest}`}>
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
                        <span style={{ color: 'black' }}>
                          <b>Problem : </b>{' '}
                        </span>
                        {Data.problem}
                      </p>
                      <p style={{ fontSize: '18px' }}>
                        <span style={{ fontSize: '18px', color: 'black' }}>
                          <b>Problem Category : </b>{' '}
                        </span>
                        {Data.category}
                      </p>
                      <p style={{ fontSize: '18px' }}>
                        <span style={{ color: 'black' }}>
                          <b>Site Name : </b>{' '}
                        </span>
                        {Data.site_name}
                      </p>

                      <p style={{ fontSize: '18px' }}>
                        <span style={{ color: 'black' }}>
                          <b>Severity_Level : </b>{' '}
                        </span>
                        {Data.severity_level === 'minor' ? (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: '#355C7D' }}
                            size="small"
                          >
                            Minor
                          </Button>
                        ) : Data.severity_level === 'major' ? (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: '#6C5B7B' }}
                            size="small"
                          >
                            Major
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: '#F8B195' }}
                            size="small"
                          >
                            Critical
                          </Button>
                        )}
                      </p>
                      <p style={{ fontSize: '18px' }}>
                        <span style={{ color: 'black' }}>
                          <b>Status : </b>{' '}
                        </span>
                        {Data.status === 'completed' ? (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: '#355C7D' }}
                            size="small"
                          >
                            Completed
                          </Button>
                        ) : Data.status === 'progress' ? (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: '#6C5B7B' }}
                            size="small"
                          >
                            Progress
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: '#F8B195' }}
                            size="small"
                          >
                            Not Yet Started
                          </Button>
                        )}
                      </p>
                    </div>
                  </div>
                </Box>
              </Grid>
            </Grid>
            <CardActions style={{ float: 'right', padding: '25px' }}>
              {btnshow && (
                <Button
                  onClick={() => {
                    showContent();
                    hideButton();
                  }}
                >
                  Read More
                </Button>
              )}
            </CardActions>
            {show && (
              <Box>
                <Grid container>
                  <Grid item xs={6}>
                    <ApartmentOutlinedIcon
                      style={{
                        color: 'black',

                        width: '100',
                        height: '100',
                      }}
                    />
                    <Typography fontFamily="Asap">
                      <b style={{ paddingRight: '220px' }}>Site Information</b>
                    </Typography>

                    <span className="userinfo">
                      <b>{Data.site_category}</b> <br />
                      <p style={{ color: 'grey' }}>{Data.name}</p>
                      <p style={{ color: 'grey' }}>{Data.description}</p>
                      <p style={{ color: 'grey' }}>Owned by:{Data.owned_by}</p>
                    </span>
                  </Grid>

                  <br />

                  <br />
                  <Grid item xs={6} style={{ paddingLeft: '100px' }}>
                    <AccountCircleOutlinedIcon
                      style={{
                        color: 'black',

                        width: '100',
                        height: '100',
                      }}
                    />
                    <Typography fontFamily="Asap">
                      <b style={{ paddingRight: '220px' }}>User Information</b>
                    </Typography>

                    <span className="userinfo">
                      <b>{Data.user_name}</b> <br />
                      <p style={{ color: 'grey' }}>{Data.email}</p>
                      <p style={{ color: 'grey' }}>{Data.company_name}</p>
                    </span>
                    <p>
                      <span style={{ color: 'grey' }}>
                        <b>Created Date : </b>{' '}
                      </span>
                      <Moment format="YYYY/MM/DD" style={{ color: 'gray' }}>
                        {Data.date}
                      </Moment>
                    </p>
                    <p>
                      <span style={{ color: 'grey' }}>
                        <b>Last Updated Date : </b>{' '}
                      </span>
                      <Moment format="YYYY/MM/DD" style={{ color: 'gray' }}>
                        {Data.last_updated}
                      </Moment>
                    </p>
                  </Grid>
                </Grid>
                <CardActions style={{ float: 'right', padding: '25px' }}>
                  <Button
                    onClick={() => {
                      showContent();
                      showButton();
                    }}
                  >
                    Show Less
                  </Button>
                </CardActions>
              </Box>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ViewNotification;
