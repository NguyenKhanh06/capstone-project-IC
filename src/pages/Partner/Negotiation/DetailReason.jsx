import React, { useState } from "react";
import PropTypes from "prop-types";

import InfoIcon from "@mui/icons-material/Info";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";



function DetailReason(props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(props.close);
  };

  console.log("reason", props.reason);
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.show}
    >
        < Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Detail Reason</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
      <DialogContent>
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#F0F0F0",
              width: "100%",
              padding: "40px 20px 20px 40px",
              borderRadius: "20px",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                borderBottom: "1px solid black",
                borderBottomWidth: "100%",
              }}
            >
              <Typography
                sx={{
                  paddingBottom: 2,
                  float: "left",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Reject reason
              </Typography>

              <Chip
                label="Reject"
                color="error"
                style={{ marginLeft: "10px" }}
                size="small"
              />
            </Box>
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
            
              <Typography
                sx={{
                  float: "left",
                  fontSize: "small",
                  marginBottom: 2,
                  color: "#8F8E8E",
                }}
              >
                Reject at:{" "}
                {moment(props?.reason?.dateCreate).format("DD/MM/YYYY")}
              </Typography>
              <Typography
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                {props?.reason?.reasonContent}
              </Typography>
            </Box>

            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: 6 }}
            >
              {/* <Button
            variant="contained"
            color="success"
            onClick={() => {
             
            }}
          >
            Approve
          </Button> */}
            </Stack>
          </Box>
        </>
      </DialogContent>
    </Dialog>
  );
}

export default DetailReason;
