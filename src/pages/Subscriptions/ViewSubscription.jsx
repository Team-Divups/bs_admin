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
} from "@mui/material";

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


const ViewSubscription = () => {
  const { subid } = useParams();

  const [subData, setSubData] = useState([]);
  const [subUser, setSubUser] = useState([]);
  const [siteData, setSiteData] = useState([]);

  //subscription info
  useEffect(() => {
    axios
      .get(`http://localhost:3001/subscription/${subid}`)
      .then((response) => {
        setSubData(response.data);
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

        {subData.map((val, index) => {
          return (
            <>
              <Card>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1}>
                      <img
                        src={
              "http://localhost:3000/fd0babb5-edc3-4bbe-8626-e5a2f1317fcb"
              }
                        alt="profile"
                        className="profileimg"
                      />
                    </Grid>

                    <Grid item xs={9}>
                      <Box height="100%" mt={0.5} lineHeight={1}>
                        <Typography variant="h5" fontFamily="Mulish">
                          <b>{val.name}</b>
                        </Typography>
                        <Typography className="category">
                          {val.category}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={2}>
                      {val.type === "Gold" ? (
                        <div className="modebtn">Gold</div>
                      ) : val.type === "Platinum" ? (
                        <div>
                          <span style={{ paddingRight: "10px" }}>
                            <span
                              className="modebtn"
                              style={{ backgroundColor: "#E5E4E2" }}
                            >
                              Platinum
                            </span>
                          </span>

                          <span
                            style={{ backgroundColor: "#84fae4" }}
                            className="modebtn"
                          >
                            Contract
                          </span>
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
                          <b style={{ paddingRight: "220px" }}>
                            Subscription Information
                          </b>
                          <Link to={`/subscriptions/edit/${val.id}`}>
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
                            {val.description}
                          </p>

                          <div style={{ fontSize: "13px", lineHeight: "2.4" }}>
                            <p>
                              <span style={{ color: "black" }}>
                                <b>Contact person : </b>{" "}
                              </span>
                              {val.owner}
                            </p>
                            <p>
                              <span style={{ color: "black" }}>
                                <b>Mobile : </b>{" "}
                              </span>
                              {val.contactNo}
                            </p>
                            <p>
                              <span style={{ color: "black" }}>
                                <b>Email : </b>{" "}
                              </span>
                              {val.email}
                            </p>
                            <p>
                              <span style={{ color: "black" }}>
                                <b>Location : </b>{" "}
                              </span>
                              {val.location}
                            </p>
                            <p style={{ color: "black" }}>
                              <b>Social : </b>
                            </p>

                            <a
                              style={{ paddingRight: "10px" }}
                              href={val.facebook}
                              target="_blank"
                            >
                              {" "}
                              <Facebook sx={{ fontSize: 20 }} />
                            </a>
                            <a
                              style={{ paddingRight: "10px" }}
                              href={val.LinkedIn}
                              target="_blank"
                            >
                              <LinkedIn sx={{ fontSize: 20 }} />
                            </a>
                            <a
                              style={{ paddingRight: "10px" }}
                              href={val.Instagram}
                              target="_blank"
                            >
                              <Instagram sx={{ fontSize: 20 }} />
                            </a>
                            <a
                              style={{ paddingRight: "10px" }}
                              href={val.WebsiteURL}
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
                                  <img
                                    src={user}
                                    alt="userimg"
                                    className="userimg"
                                  />
                                </Grid>

                                <Grid item xs={5}>
                                  <span className="userinfo">
                                    <b>{tdata.name}</b> <br />
                                    <p style={{ color: "grey" }}>
                                      {tdata.type}
                                    </p>
                                  </span>
                                </Grid>

                                <Grid item xs={5}>
                                  <div className="userinfo">
                                    {tdata.category}
                                  </div>
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
                                  <Typography fontFamily="Mulish">
                                    <b>{sdata.sitename}</b>
                                  </Typography>

                                  <div className="siteinfo">
                                    {sdata.sitedescription}
                                  </div>
                                  <a href={sdata.webURL} target="_blank">
                                    <Button
                                      variant="outlined"
                                      style={{ fontFamily: "Asap" }}
                                    >
                                      View Site
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
            </>
          );
        })}
      </div>
    </>
  );
};

export default ViewSubscription;
