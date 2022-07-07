import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  Divider,
  Rating,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import site from "../../Assets/site.jpg";
import sitesm from "../../Assets/site.png";
import user from "../../Assets/user.png";
import "../viewpage.css";

import {
  Edit,
  Facebook,
  Instagram,
  Language,
  LinkedIn,
} from "@mui/icons-material";
import { GridListTile, GridList } from "@material-ui/core";

import swal from "sweetalert";

const ViewSubscription = () => {
  const { subid } = useParams();

  const [subData, setSubData] = useState([]);
  const [subUser, setSubUser] = useState([]);
  const [siteData, setSiteData] = useState([]);
  //const [rate, setRate] = useState(0);

  //subscription info
  useEffect(() => {
    axios
      .get(`http://localhost:3001/subscription/${subid}`)
      .then((response) => {
        setSubData({ ...response.data[0] });
      });
  }, [subid]);

  //subscription users list
  useEffect(() => {
    axios
      .get(`http://localhost:3001/subscription/susers/${subid}`)
      .then((response) => {
        setSubUser(response.data);
      });
  }, [subid]);

  //subscription sites list
  useEffect(() => {
    axios
      .get(`http://localhost:3001/subscription/subsites/${subid}`)
      .then((response) => {
        setSiteData(response.data);
      });
  }, [subid]);

  /*subscription rating
  useEffect(() => {
    axios
      .get(`http://localhost:3001/subscription/ratings/${subid}`)
      .then((response) => {
        setRate({...response.data[0]});
        console.log(rate);
        console.log(rate.rate);
      });
  }, []);*/

  // Delete one subscription
  const DeleteSite = (id) => {
    swal({
      text: "Are you sure you want to delete?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`http://localhost:3001/subscription/deletesite`, {
            visibility: 0,
            siteid: id,
          })
          .then((response) => {
            swal({
              title: "Done !",
              text: "Site is deleted",
              icon: "success",
              timer: 2000,
              button: false,
            });
            setSiteData(
              siteData.filter((val) => {
                return val.siteid !== id;
              })
            );
          });
      } else {
        swal({
          text: "Site details are restored !",
          timer: 2000,
          buttons: false,
        });
      }
    });
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Subscription Overview" />

        <Card>
          <CardMedia
            component="img"
            className="cardHeaderImage"
            image={site}
            alt="site"
          />
        </Card>

        <Card>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={1}>
                <img
                  src={
                    subData.appLogo
                      ? `http://localhost:3001/${subData.appLogo}`
                      : sitesm
                  }
                  alt="profile"
                  className="profileimg"
                />
              </Grid>

              <Grid item xs={2}>
                <Box height="100%" mt={0.5} lineHeight={1}>
                  <Typography variant="h5" fontFamily="Mulish">
                    <b>{subData.name}</b>
                  </Typography>
                  <Typography className="category">
                    {subData.category}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={7}>
                <Rating value={3.5} readOnly size="large" precision={0.5} />
              </Grid>

              <Grid item xs={2}>
                {subData.type === "Gold" ? (
                  <div className="modebtn">Gold</div>
                ) : subData.type === "Platinum" ? (
                  <div
                    className="modebtn"
                    style={{ backgroundColor: "#E5E4E2" }}
                  >
                    Platinum
                  </div>
                ) : (
                  <div
                    className="modebtn"
                    style={{ backgroundColor: "silver" }}
                  >
                    Silver
                  </div>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} columnSpacing={10}>
              <Grid item xs={7}>
                <Box className="content">
                  <Typography fontFamily="Asap">
                    <b style={{ paddingRight: "45%" }}>
                      Subscription Information
                    </b>
                    <Link to={`/subscriptions/edit/${subData.id}`}>
                      <Edit sx={{ fontSize: 15 }} />
                    </Link>
                  </Typography>

                  <Divider
                    orientation="horizontal"
                    style={{ paddingTop: "15px", width: "75%" }}
                  />

                  <div className="infodesc">
                    <p
                      style={{
                        paddingBottom: "25px",
                        paddingTop: "15px",
                      }}
                    >
                      {subData.description}
                    </p>

                    <div style={{ fontSize: "13px", lineHeight: "2.4" }}>
                      <p>
                        <span style={{ color: "black" }}>
                          <b>Contact person : </b>{" "}
                        </span>
                        {subData.owner}
                      </p>
                      <p>
                        <span style={{ color: "black" }}>
                          <b>Mobile : </b>{" "}
                        </span>
                        {subData.contactNo}
                      </p>
                      <p>
                        <span style={{ color: "black" }}>
                          <b>Email : </b>{" "}
                        </span>
                        {subData.email}
                      </p>
                      <p>
                        <span style={{ color: "black" }}>
                          <b>Location : </b>{" "}
                        </span>
                        {subData.location}
                      </p>
                      <p style={{ color: "black" }}>
                        <b>Social : </b>
                      </p>

                      <a
                        style={{ paddingRight: "10px" }}
                        href={subData.facebook}
                        target="_blank"
                      >
                        {" "}
                        <Facebook sx={{ fontSize: 20 }} />
                      </a>
                      <a
                        style={{ paddingRight: "10px" }}
                        href={subData.LinkedIn}
                        target="_blank"
                      >
                        <LinkedIn sx={{ fontSize: 20 }} />
                      </a>
                      <a
                        style={{ paddingRight: "10px" }}
                        href={subData.Instagram}
                        target="_blank"
                      >
                        <Instagram sx={{ fontSize: 20 }} />
                      </a>
                      <a
                        style={{ paddingRight: "10px" }}
                        href={subData.WebsiteURL}
                        target="_blank"
                      >
                        <Language sx={{ fontSize: 20 }} />
                      </a>
                    </div>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={5}>
                <Box className="content">
                  <Typography fontFamily="Asap">
                    <b>Users</b>
                  </Typography>
                  <Divider
                    orientation="horizontal"
                    style={{ paddingTop: "15px", width: "75%" }}
                  />
                  <br />

                  {subUser.map((tdata, index) => {
                    return (
                      <>
                        <Grid
                          container
                          spacing={3}
                          style={{ paddingTop: "10px" }}
                        >
                          <Grid item xs={2}>
                            <img src={user} alt="userimg" className="userimg" />
                          </Grid>

                          <Grid item xs={5}>
                            <span className="userinfo">
                              <b>
                                {tdata.firstname} {tdata.lastName}
                              </b>{" "}
                              <br />
                              <p style={{ color: "grey" }}>{tdata.email}</p>
                            </span>
                          </Grid>

                          <Grid item xs={5}>
                            <div className="userinfo">{tdata.position}</div>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>

            <Box style={{ paddingLeft: "10px" }}>
              <Typography fontFamily="Asap">
                <b>Sites</b>
              </Typography>

              <GridList cols={4}>
                {siteData.map((sdata, index) => {
                  return (
                    <>
                      <GridListTile>
                        <Card
                          sx={{
                            maxWidth: 360,
                            paddingTop: 5,
                            paddingRight: 9,
                          }}
                        >
                          <CardMedia
                            component="img"
                            className="siteimg"
                            image={site}
                            alt="site"
                          />

                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid item xs={10}>
                                <Typography fontFamily="Mulish">
                                  <b>{sdata.sitename}</b>
                                </Typography>
                              </Grid>

                              <Grid item xs={2}>
                                <DeleteIcon
                                  sx={{ fontSize: 15 }}
                                  onClick={() => DeleteSite(sdata.siteid)}
                                />
                              </Grid>
                            </Grid>

                            <div className="siteinfo">
                              {sdata.sitedescription}
                            </div>
                            <a href={sdata.webURL} target="_blank">
                              <Button
                                variant="outlined"
                                style={{ fontFamily: "Asap" }}
                              >
                                View WebSite
                              </Button>
                            </a>
                          </CardContent>
                        </Card>
                      </GridListTile>
                    </>
                  );
                })}
              </GridList>
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ViewSubscription;
