import React from 'react';
import Header from '../../components/Header';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { Button, FormLabel, TextField } from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import swal from 'sweetalert';

const EditRoles = () => {
  const { idrole } = useParams();
  const history = useNavigate();

  const initialValues = {
    roleName: '',
    description: '',
    created_at: new Date(),
    idrole: idrole,
  };

  const [roleData, setRoleData] = useState(initialValues);

  // const [RoleName, setRoleName] = useState();
  // const [Description, setDescription] = useState();

  //role info
  useEffect(() => {
    axios.get(`http://localhost:3001/role/view/${idrole}`).then((response) => {
      setRoleData({ ...response.data[0] });
    });
  }, [idrole]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRoleData({
      ...roleData,
      [name]: value,
    });
  };

  const EditRole = async (idrole) => {
    await axios.put('http://localhost:3001/role/edit', roleData).then(() => {
      swal({
        text: 'Role updated successfully',
        icon: 'success',
        timer: 6000,
        buttons: false,
      });
    });
    history(-1);
  };

  // const enable = RoleName && Description;

  return (
    <>
      <div className="formPage">
        <Header title="Edit Role" />
        <div className="FormContainer">
          <form
            onSubmit={() => {
              EditRole(idrole);
            }}
          >
            <FormLabel color="success" required="true" className="label">
              Role Name
            </FormLabel>
            <br />

            <TextField
              style={{ paddingBottom: '30px' }}
              variant="outlined"
              fullWidth
              name="roleName"
              onChange={handleChange}
              value={roleData.roleName}
            />

            <br />
            <FormLabel required="true" className="label">
              Role description and previleges
            </FormLabel>
            <br />
            <TextField
              style={{ paddingBottom: '30px' }}
              variant="outlined"
              fullWidth
              multiline={true}
              name="description"
              defaultValue={roleData.description}
              onChange={handleChange}
            />
            <FormLabel required="true" className="label">
              Users under this Role :
            </FormLabel>
            <br />
            <TextField
              style={{ paddingBottom: '30px' }}
              variant="outlined"
              fullWidth
              multiline={true}
              name="user_name"
              defaultValue={roleData.user_name}
              disabled
            />
            <div style={{ paddingTop: '50px' }}>
              <span style={{ paddingLeft: '55%' }}>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  // disabled={!enable}
                >
                  Save
                </Button>
              </span>

              <span style={{ paddingLeft: '10%' }} onClick={() => history(-1)}>
                <Button variant="contained" color="secondary">
                  <ArrowBackIosNewIcon fontSize="small" />
                  Back
                </Button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRoles;
