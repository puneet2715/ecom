import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, FormGroup, InputLabel, TextField } from '@mui/material';
import axios from 'axios';

interface ButtonInputProps {
  str: string;
  fields: string[];
}

export default function EnhancedButton({ str, fields }: ButtonInputProps) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    name: '',
    contactNumber: '',
    location: '',
    address: '',
    gender: '',
    image: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    await axios.post('/api/seller', { data: input });
    setOpen(false);
  };

  return (
    <>
      <Button
        //   component="label"
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Add {str}
        {/* <input accept="image/*" type="file" hidden /> */}
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add {str} </DialogTitle>
        <DialogContent>
          <FormGroup>
            {fields.map((field) => (
              <FormControl key={field}>
                {/* <InputLabel>{field}</InputLabel> */}
                <TextField
                  value={input.name}
                  variant="standard"
                  label={field}
                  // placeholder={field}
                  onChange={(e) =>
                    setInput((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  id="my-{field}"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
            ))}
          </FormGroup>
          {/* <Button
            variant="contained"
            color="primary"
            aria-label="upload csv"
            component="label"
            startIcon={<UploadIcon />}
          >
            <input hidden accept=".csv" type="file" />
            Submit
          </Button> */}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Submit
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
