import { Button } from '@mui/material';
//import user from '../../Assets/user.png';
import Moment from 'react-moment';

export const userColumns = [
  { field: 'idRequest', headerName: 'Notification ID', width: 100 },
  //{ field: 'site_name', headerName: 'Site Name', width: 100 },

  {
    field: 'category',
    headerName: 'Category',
    width: 200,
  },

  {
    field: 'problem',
    headerName: 'Problem',
    width: 300,
  },

  {
    field: 'severity_level',
    headerName: 'Severity Level',
    width: 180,
    renderCell: (params) => {
      return (
        <div>
          {params.row.severity_level === 'minor' ? (
            <Button
              variant="contained"
              style={{ backgroundColor: '#355C7D' }}
              size="small"
            >
              Minor
            </Button>
          ) : params.row.severity_level === 'major' ? (
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
        </div>
      );
    },
  },
  {
    field: 'date',
    headerName: 'Created Date',
    width: 180,
    renderCell: (params) => {
      return (
        <div>
          <p>
            <Moment format="YYYY/MM/DD" style={{ color: 'gray' }}>
              {params.row.date}
            </Moment>
          </p>
        </div>
      );
    },
  },
];
