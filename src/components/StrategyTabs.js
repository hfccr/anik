import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Deposit } from "./Deposit";
import { Unstake } from "./Unstake";
import { useState } from "react";
import { Paper } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`strategy-stake-unstake-tabpanel-${index}`}
      aria-labelledby={`strategy-stake-unstake-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `strategy-stake-unstake-tab-${index}`,
    "aria-controls": `strategy-stake-unstake-tabpanel-${index}`,
  };
}

export const StrategyTabs = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Paper variant="outlined" sx={{ overflow: "hidden" }} component="div">
        <AppBar position="static" color="background">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="restaking stake unstake"
          >
            <Tab label="Deposit" {...a11yProps(0)} />
            <Tab label="Unstake" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Deposit />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Unstake />
        </TabPanel>
      </Paper>
    </Box>
  );
};
