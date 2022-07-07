import React, { useEffect, useState } from "react";

import Header from "../../components/Header";
import "../styles.css";
import "../viewpage.css";
import sitesm from "../../Assets/site.png";
import { paymentsubColumns } from "./DataSource";

import { useParams} from "react-router-dom";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button, Card, CardContent, CardActionArea } from "@mui/material";

import {
  AcUnit,
  DeleteOutlineSharp,
} from "@mui/icons-material";

import swal from "sweetalert";
import Moment from "react-moment";

const PaymentSubscription = () => {
  const { subid } = useParams();

  const [paymentData, setPaymentData] = useState([]);
  const [billingData, setBillingData] = useState([]);
  const [subData, setSubData] = useState([]);

  //payment info
  useEffect(() => {
    axios.get(`http://localhost:3001/payment/${subid}`).then((response) => {
      setPaymentData(response.data);
      console.log(response.data);
    });

    axios.get(`http://localhost:3001/billing/${subid}`).then((response) => {
      setBillingData(response.data);
    });

    axios
      .get(`http://localhost:3001/subscription/${subid}`)
      .then((response) => {
        setSubData({ ...response.data[0] });
        console.log(subData.created_at);
      });
  }, [subid]);

  //freeze one subscription
  const FreezeSub = (id) => {
    swal({
      text: "Are you sure you want to freeze?",
      buttons: true,
      dangerMode: true,
    }).then((willfreeze) => {
      if (willfreeze) {
        axios
          .put(`http://localhost:3001/subscription/freezeid`, {
            visibility: 0,
            status: "Freeze",
            id: id,
          })
          .then((response) => {
            swal({
              title: "Done !",
              text: "Subscription is Freezed",
              icon: "success",
              timer: 2000,
              button: false,
            });
          });
      } else {
        swal({
          text: "Subscription is not freezed !",
          timer: 2000,
          icon: "info",
          buttons: false,
        });
      }
    });
  };

  // Delete one subscription
  const Delete = (id) => {
    swal({
      text: "Are you sure you want to delete?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`http://localhost:3001/subscription/deleteid`, {
            visibility: 0,
            status: "Inactive",
            id: id,
          })
          .then((response) => {
            swal({
              title: "Done !",
              text: "Subscription is deleted",
              icon: "success",
              timer: 2000,
              button: false,
            });
          });
      } else {
        swal({
          text: "Subscription details are restored !",
          timer: 2000,
          icon: "info",
          buttons: false,
        });
      }
    });
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Pages" title="Subscriptions" />
        <span className="dataTableTitle">Payment History</span>

        {billingData.map((val) => {
          return (
            <>
              <Grid container spacing={2}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  <Card>
                    <CardContent>
                      <img
                        src={
                          subData.appLogo
                            ? `http://localhost:3001/${subData.appLogo}`
                            : sitesm
                        }
                        alt="profile"
                        className="paymentimg"
                      />
                      <div
                        className="infodesc"
                        style={{ lineHeight: "2.4", marginLeft: "24%" }}
                      >
                        <p>
                          <span style={{ color: "black" }}>
                            <b>Subscription Name : </b>{" "}
                          </span>
                          {subData.name}
                        </p>

                        <p>
                          <span style={{ color: "black" }}>
                            <b>Subscription Payment Package : </b>{" "}
                          </span>
                          {subData.type}
                        </p>
                        <p>
                          <span style={{ color: "black" }}>
                            <b>Subscription activated on : </b>{" "}
                          </span>
                          <Moment format="YYYY/MM/DD">
                            {subData.created_at}
                          </Moment>
                        </p>

                        <p>
                          <span style={{ color: "black" }}>
                            <b>Next Billing due date : </b>{" "}
                          </span>
                          <Moment format="YYYY/MM/DD">{val.bill_date}</Moment>
                        </p>
                      </div>
                    </CardContent>
                    <CardActionArea
                      sx={{ marginBottom: "20px", marginTop: "-15px" }}
                    >
                      <div style={{ marginBottom: "20px" }}>
                        {val.delay === 0 ? (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "#6C5B7B" }}
                            fullWidth
                          >
                            Payment Due Date Passed
                          </Button>
                        ) : val.delay === -10 ? (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "#C06C84" }}
                            fullWidth
                          >
                            Send Reminders
                          </Button>
                        ) : val.delay > 0 ? (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "#C06C84" }}
                            fullWidth
                          >
                            Freeze State
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "#F8B195" }}
                            fullWidth
                          >
                            Payments Upto Date
                          </Button>
                        )}
                      </div>
                      {/* <span
                        style={{ paddingLeft: "150px", paddingRight: "25px" }}
                      >
                        <Button variant="contained" color="secondary">
                          Send Notifications
                        </Button>
                      </span> */}
                      <span style={{ paddingLeft: "55%", paddingRight: "25px" }}>
                        <Button
                          disabled={!(val.delay > 0 && val.sub_delay>=10)}
                          variant="contained"
                          color="info"
                          endIcon={<AcUnit/>}
                          onClick={() => FreezeSub(subData.id)}
                        >
                          Freeze
                        </Button>
                      </span>

                      <span>
                        <Button
                          variant="contained"
                          color="warning"
                          endIcon={<DeleteOutlineSharp/>}
                          onClick={() => Delete(subData.id)}
                        >
                          Delete
                        </Button>
                      </span>
                      
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
            </>
          );
        })}

        <DataGrid
          columns={paymentsubColumns}
          rows={paymentData}
          pageSize={8}
          rowsPerPageOptions={[5]}
          style={{ marginTop: "60px", fontFamily: "Asap" }}
          autoHeight
        />
      </div>
    </>
  );
};

export default PaymentSubscription;
