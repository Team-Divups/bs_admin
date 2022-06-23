import { Button } from '@mui/material';
//import user from '../../Assets/user.png';

export const subColumns = [
    { field: 'subId', headerName: 'SubId', width: 130 },

    {
      field: 'subscription',
      headerName: 'Subscription',
      width: 240,
      renderCell: (params) => {
        return (
          <div>
              <b>{params.row.name}</b>
          </div>
        )
      }
    },
   
    {
        field: 'category',
        headerName: 'Category',
        width: 180,
        renderCell: (params) => {
          return (
              <div>
                  {params.row.category === "Hotel" ? (
                     <Button variant="contained" style={{backgroundColor:"#355C7D"}} size="small">Hotel</Button>
                  ) : params.row.category === "Restuarant" ? (
                     <Button variant="contained" style={{backgroundColor:"#6C5B7B"}} size="small">Restuarant</Button>
                  ) :params.row.category === "Resort" ? (
                     <Button variant="contained" style={{backgroundColor:"#C06C84"}} size="small">Resort</Button>
                  ) :params.row.category === "Villa" ? (
                     <Button variant="contained" style={{backgroundColor:"#F67280"}} size="small">Villa</Button>
                  ) :(
                     <Button variant="contained" style={{backgroundColor:"#F8B195"}} size="small">Other</Button>
                  )}
              </div>
          )
        }
    },


    {
        field: 'type',
        headerName: 'Type',
        width: 160,
        renderCell: (params) => {
          return (
              <div>
                  {params.row.type === "Gold" ? (
                     <Button variant="contained" style={{backgroundColor:'gold'}} size="small">Gold</Button>
                  ) : params.row.type=== "Platinum" ? (
                     <Button variant="contained" style={{backgroundColor:'#E5E4E2'}} size="small">Platinum</Button>
                  ) : (
                     <Button variant="contained" style={{backgroundColor:'silver'}} size="small">Silver</Button>
                  )}
              </div>
          )
        }
    },


    {
        field: 'owner',
        headerName: 'Owned By',
        width: 220,
    },
   
    {
      field: 'location',
      headerName: 'Location',
      width: 170,
    },

]


