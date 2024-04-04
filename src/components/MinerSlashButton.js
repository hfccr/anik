import { getSlasher } from "@/util/operatorTypes";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Typography,
} from "@mui/material";
import { useState, forwardRef } from "react";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";
import { minerSlasher } from "@/util/minerSlasher";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MinerSlashButton = ({ deal, operatorDetails }) => {
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
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="slash-miner"
      >
        <DialogTitle>Slash Miner t0{minerId.toString()}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Miners behaving incorrectly will be slashed.
          </DialogContentText>
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
