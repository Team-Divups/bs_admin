import { Button } from "@mui/material";
import Moment from "react-moment";
//import sitesm from "../../Assets/site.png";

import "../viewpage.css";

//subscription table
export const subColumns = [
  // { field: 'subId', headerName: 'SubId', width: 130 },

  {
    field: "subscription",
    headerName: "Subscription",
    width: 270,
    renderCell: (params) => {
      return (
        <div>
          <b>{params.row.name}</b>
          <br />
          <p style={{ lineHeight: "2" }}>
            Joined on :
            <Moment format="YYYY/MM/DD" style={{ color: "gray" }}>
              {params.row.created_at}
            </Moment>
          </p>
        </div>
      );
    },
  },

  {
    field: "category",
    headerName: "Category",
    width: 220,
    renderCell: (params) => {
      return (
        <div>
          {params.row.category === "Hotel" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#355C7D" }}
              size="small"
            >
              Hotel
            </Button>
          ) : params.row.category === "Restuarant" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#6C5B7B" }}
              size="small"
            >
              Restuarant
            </Button>
          ) : params.row.category === "Resort" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#C06C84" }}
              size="small"
            >
              Resort
            </Button>
          ) : params.row.category === "Villa" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#F67280" }}
              size="small"
            >
              Villa
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: "#F8B195" }}
              size="small"
            >
              Other
            </Button>
          )}
        </div>
      );
    },
  },

  {
    field: "type",
    headerName: "Type",
    width: 170,
    renderCell: (params) => {
      return (
        <div>
          {params.row.type === "Gold" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "gold" }}
              size="small"
            >
              Gold
            </Button>
          ) : params.row.type === "Platinum" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#E5E4E2" }}
              size="small"
            >
              Platinum
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: "silver" }}
              size="small"
            >
              Silver
            </Button>
          )}
        </div>
      );
    },
  },

  {
    field: "owner",
    headerName: "Conatct Person",
    width: 250,
    renderCell: (params) => {
      return (
        <div>
          <b style={{ lineHeight: "2.6" }}>{params.row.owner}</b>
          <p style={{ color: "gray" }}>{params.row.email}</p>
        </div>
      );
    },
  },

  {
    field: "location",
    headerName: "Location",
    width: 170,
  },
];

//deleted subscription table
export const deletedsubColumns = [
  // { field: 'subId', headerName: 'SubId', width: 130 },

  {
    field: "subscription",
    headerName: "Subscription",
    width: 300,
    renderCell: (params) => {
      return (
        <div>
          <b style={{ lineHeight: "1.8" }}>{params.row.name}</b>
          <p style={{ color: "gray" }}>{params.row.category}</p>
        </div>
      );
    },
  },

  {
    field: "subscription_duration",
    headerName: "Duration Details",
    width: 270,
    renderCell: (params) => {
      return (
        <div>
          <p style={{ lineHeight: "2.4" }}>
            <b>Created on :</b>
            <Moment format="YYYY/MM/DD" style={{ color: "gray" }}>
              {params.row.created_at}
            </Moment>
          </p>
          <p>
            <b>Removed on :</b>
            <Moment format="YYYY/MM/DD" style={{ color: "gray" }}>
              {params.row.deleted_at}
            </Moment>
          </p>
        </div>
      );
    },
  },

  {
    field: "contact",
    headerName: "Contact Details",
    width: 260,
    renderCell: (params) => {
      return (
        <div>
          <p style={{ lineHeight: "1.8" }}>
            <b>{params.row.owner}</b>
          </p>
          <p
            style={{ color: "grey", fontStyle: "italic", fontFamily: "Mulish" }}
          >
            {params.row.email}
          </p>
        </div>
      );
    },
  },

  {
    field: "type",
    headerName: "Type",
    width: 160,
    renderCell: (params) => {
      return (
        <div>
          {params.row.type === "Gold" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "gold" }}
              size="small"
            >
              Gold
            </Button>
          ) : params.row.type === "Platinum" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#E5E4E2" }}
              size="small"
            >
              Platinum
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: "silver" }}
              size="small"
            >
              Silver
            </Button>
          )}
        </div>
      );
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.status === "Inactive" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#6C5B7B" }}
              size="small"
            >
              Inactive
            </Button>
          ) : params.row.status === "Freeze" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#C06C84" }}
              size="small"
            >
              Freezed
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: "#F8B195" }}
              size="small"
            >
              Other
            </Button>
          )}
        </div>
      );
    },
  },
];

//payment subscription
export const paymentsubColumns = [

 

  {
    field: "start_date",
    headerName: "Period started on",
    width: 300,
    renderCell: (params) => {
      return (
        <div>
          <Moment format="YYYY/MM/DD">{params.row.start_date}</Moment>
        </div>
      );
    },
  },
  
  {
    field: "end_date",
    headerName: "Period Ended on",
    width: 300,
    renderCell: (params) => {
      return (
        <div>
          <Moment format="YYYY/MM/DD">{params.row.end_date}</Moment>
        </div>
      );
    },
  },


  {
    field: "date",
    headerName: "Payment Done on",
    width: 300,
    renderCell: (params) => {
      return (
        <div>
          <Moment format="YYYY/MM/DD">{params.row.date}</Moment>
        </div>
      );
    },
  },


  {
    field: "next_bill_date",
    headerName: "Next Payment Due date",
    width: 300,
    renderCell: (params) => {
      return (
        <div>
          <Moment format="YYYY/MM/DD">{params.row.next_bill_date}</Moment>
        </div>
      );
    },
  },


];
