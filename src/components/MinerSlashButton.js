import { getSlasher } from "@/util/operatorTypes";
import {
  Alert,
  AlertTitle,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Typography,
  IconButton,
  Stack,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState, forwardRef } from "react";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";
import { minerSlasher } from "@/util/minerSlasher";
import Image from "next/image";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MinerSlashButton = ({ deal, operatorDetails }) => {
  const theme = useTheme();
  const imageSrc =
    theme.palette.mode === "dark"
      ? "/miner-slasher-flow.svg"
      : "/miner-slasher-flow-light.svg";
  const { operatorAddress, operatorType } = operatorDetails;
  const { writeContract } = useWriteContract();
  const { minerId } = operatorDetails;
  const [open, setOpen] = useState(false);
  const { id: dealId } = deal;
  const handleClose = () => {
    setOpen(false);
  };
  const onButtonClick = () => {
    setOpen((setOpen) => !setOpen);
  };
  const slashOperator = () => {
    writeContract({
      abi: minerSlasher.abi,
      address: minerSlasher.address,
      functionName: "slash",
      args: [operatorAddress, dealId],
    });
    toast((t) => <Typography>Slashing Miner</Typography>);
    handleClose();
  };
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        onClick={onButtonClick}
      >
        Slash
      </Button>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="slash-miner"
      >
        <Stack direction="row" sx={{ padding: 2 }} spacing={2}>
          <IconButton size="large" onClick={handleClose}>
            <Close size="large" />
          </IconButton>
          <Typography variant="h3">
            Slash Miner t0{minerId.toString()}
          </Typography>
        </Stack>
        <Divider />
        <DialogContent sx={{ paddingLeft: 6, paddingRight: 6 }}>
          <Container maxWidth="lg">
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{ padding: 2 }}
            >
              Slashing Storage Provider t0{minerId.toString()} For Deal{" "}
              {deal.id}.
            </DialogContentText>
            <Stack
              direction="row-reverse"
              spacing={6}
              justifyContent="space-between"
            >
              <Stack spacing={2} sx={{ paddingTop: 4 }}>
                <DialogContentText id="alert-dialog-slide-description">
                  * Storage Provider with terminated deals will be slashed by
                  creating a slash request on Storage Provider Slasher Contract.
                </DialogContentText>
                <DialogContentText id="alert-dialog-slide-description">
                  * Storage Provider Slasher contract will check the validity of
                  the slash request by using the Market API to check if the deal
                  is terminated and match the deal storage provider with the
                  operator.
                </DialogContentText>
                <DialogContentText id="alert-dialog-slide-description">
                  * Storage Provider Slasher will forward the slash request for
                  the Operator to the Delegate Manager which handles shashing.
                </DialogContentText>
                <Alert severity="info">
                  <AlertTitle>Slashing In Demo Mode</AlertTitle>
                  Note that check for terminated deal by using Market API has
                  been commented as of now to demonstrate Storage Provider
                  slashing on Calibration
                </Alert>
              </Stack>
              <Paper
                variant="outlined"
                sx={{
                  padding: 4,
                  flexGrow: 1,
                }}
              >
                <Stack direction="column" spacing={2} justifyContent="center">
                  <Image
                    src={imageSrc}
                    height={700}
                    width={500}
                    alt="ipc slasher flow"
                  />
                </Stack>
              </Paper>
            </Stack>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={slashOperator} variant="outlined" color="secondary">
            Slash
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
