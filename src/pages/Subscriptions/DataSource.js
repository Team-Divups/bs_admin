import { Button } from "@mui/material";
import Moment from "react-moment";
import sitesm from "../../Assets/site.png";

import "../viewpage.css";

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
    headerName: "Owned By",
    width: 250,
  },

  {
    field: "location",
    headerName: "Location",
    width: 170,
  },
];

export const deletedsubColumns = [
  // { field: 'subId', headerName: 'SubId', width: 130 },

  {
    field: "subscription",
    headerName: "Subscription",
    width: 300,
    renderCell: (params) => {
      return (
        <div>
          <img
            src={
              params.row.appLogo
                ? `http://localhost:3001/${params.row.appLogo}`
                : sitesm
            }
            alt="profile"
            className="logoimg"
          />
          <b className="logoname">{params.row.name}</b>
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
          <p>
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
          <p>
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
