import { Button } from '@mui/material';
//import user from '../../Assets/user.png';

export const userColumns = [
    { field: 'companyID', headerName: 'UserId', width: 150 },

    {
      field: 'user',
      headerName: 'User',
      width: 300,
      renderCell: (params) => {
        return (
          <div>
              <b>{params.row.firstName} {params.row.lastName}</b><br/>
              <span color='grey'>{params.row.email}</span>
          </div>
        )
      }
    },

    {
      field: 'position',
      headerName: 'Designation',
      width: 220,
    },
   
    {
        field: 'role',
        headerName: 'Role',
        width: 200,
        renderCell: (params) => {
          return (
              <div>
                  {params.row.role === 1 ? (
                     <Button variant="contained" style={{backgroundColor:"#355C7D"}} size="small">Admin</Button>
                  ) : params.row.role === 2 ? (
                     <Button variant="contained" style={{backgroundColor:"#6C5B7B"}} size="small">Moderator</Button>
                  ) :(
                     <Button variant="contained" style={{backgroundColor:"#F8B195"}} size="small">User</Button>
                  )}
              </div>
          )
        }
    },


    {
        field: 'status',
        headerName: 'status',
        width: 150,
        renderCell: (params) => {
          return (
              <div>
                  {params.row.status === 0 ? (
                     <Button variant="contained" style={{backgroundColor:'gold'}} size="small">Invited</Button>
                  ) : (
                     <Button variant="contained" style={{backgroundColor:'silver'}} size="small">Active</Button>
                  )}
              </div>
          )
        }
    },

   
]