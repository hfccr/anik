import {
  Alert,
  AlertTitle,
  Container,
  Button,
  Dialog,
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
import { useChainId, useWriteContract } from "wagmi";
import Image from "next/image";
import { filAddressEthAddress } from "@/util/ipcConstants";
import { ipcSlasherController } from "@/util/ipcSlasherController";
import { ipcSlasherReplica } from "@/util/ipcSlasherReplica";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Will include proof of fault by operator/validator in the future
const proof = 12345;

export const IpcSlashButton = ({ operatorDetails }) => {
  const theme = useTheme();
  const imageSrc =
    theme.palette.mode === "dark"
      ? "/ipc-slasher-flow.svg"
      : "/ipc-slasher-flow-light.svg";
  const { operatorAddress } = operatorDetails;
  const { writeContract } = useWriteContract();
  const { subnetAddress } = operatorDetails;
  const [open, setOpen] = useState(false);
  const subnetFilAddress = filAddressEthAddress(subnetAddress);
  const subnetNestedAddr = `/r314159/${subnetFilAddress}`;
  const handleClose = () => {
    setOpen(false);
  };
  const onButtonClick = () => {
    setOpen((setOpen) => !setOpen);
  };
  const slashOperator = () => {
    // slash from calibration
    writeContract({
      abi: ipcSlasherController.abi,
      address: ipcSlasherController.address,
      functionName: "slash",
      args: [operatorAddress, proof],
    });
    toast((t) => <Typography>Slashing IPC Operator</Typography>);
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
          <Typography variant="h3">Slash Subnet Validator/Operator</Typography>
        </Stack>
        <Divider />
        <DialogContent sx={{ paddingLeft: 6, paddingRight: 6 }}>
          <Container maxWidth="lg">
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{ padding: 2 }}
            >
              Slashing operator {operatorAddress} on subnet {subnetNestedAddr}.
            </DialogContentText>
            <Stack
              direction="row-reverse"
              spacing={6}
              justifyContent="space-between"
            >
              <Stack spacing={2} sx={{ paddingTop: 4 }}>
                <DialogContentText id="alert-dialog-slide-description">
                  * IPC Validators who do not follow consensus rules will be
                  slashed by creating a slash request on the IPC subnet.
                </DialogContentText>
                <DialogContentText id="alert-dialog-slide-description">
                  * IPC Slasher Replica contract will check the validity of the
                  slash request on the subnet and forward it to IPC Slasher
                  Controller via GMP.
                </DialogContentText>
                <DialogContentText id="alert-dialog-slide-description">
                  * IPC Slasher Controller will forward the slash request for
                  the Operator to the Delegate Manager which handles shashing.
                </DialogContentText>
                <Alert severity="info">
                  <AlertTitle>Slashing In Demo Mode</AlertTitle>
                  Note that the deployed demo version of the App will directly
                  slash on L1 IPC Slasher Controller since the subnet is only
                  available locally. The demo video will contain a locally run
                  subnet and demonstrate IPC GMP Slashing from Subnet.
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
