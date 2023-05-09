import { useEffect, useState } from "react";
import { Box, FormControl, IconButton, Typography } from "@mui/material";
import { dateRangeCalculator } from "./utils/dateRangeCalculator";
import { useStyles } from "./components/style";
import PopperCustom from "./components/popperCustom";
import { dateRangeOptions } from "./constants";
import { ReactComponent as DropDownIcon } from "./images/dropdown-icon.svg";

function App() {
  const classes = useStyles();
  const [dateRangeFrom, setDateRangeFrom] = useState<string>("");
  const [dateRangeTo, setDateRangeTo] = useState<string>("");

  // start popper
  const [rowEl, setRowEl] = useState<null | HTMLElement>(null);

  const rowSelectMenuOpen = Boolean(rowEl);
  const [totalTranslationTimeSelected, setTotalTranslationTimeSelected] =
    useState<string>("Previous Month");

  const handleRowMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setRowEl(event.currentTarget);
  };

  const handleRowMenuClose = () => {
    setRowEl(null);
  };

  const rowSelectId = rowSelectMenuOpen ? "simple-popper" : undefined;
  const popperOnclickHandler = (val: string) => {
    const dateRange = dateRangeCalculator(val);
    setDateRangeFrom(dateRange.firstDay);
    setDateRangeTo(dateRange.lastDay);
    setTotalTranslationTimeSelected(val);
    setRowEl(null);
  };

  // end popper

  useEffect(() => {
    const dateRange = dateRangeCalculator("Previous Month");
    setDateRangeFrom(dateRange.firstDay);
    setDateRangeTo(dateRange.lastDay);
  }, []);

  return (
    <Box
      sx={{ margin: "auto", marginTop: "50px", width: "70%", color: "#313133" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          margin: "auto",
        }}
      >
        <Typography
          className={classes.cardTitleDashboard}
          sx={{ margin: "auto", fontWeight: "700" }}
        >
          Select Date Range
        </Typography>
        <FormControl
          sx={{
            marginLeft: "-6px",
            width: "156px",
            margin: "auto",
            marginTop: "10px",
          }}
        >
          {/* custom select start */}
          <IconButton
            size="large"
            aria-label="3"
            aria-controls={rowSelectId}
            aria-describedby={rowSelectId}
            color="inherit"
            aria-haspopup="true"
            onClick={handleRowMenuOpen}
            className={classes.timePeriodRowBtn}
          >
            <Typography className={classes.cardSelectBoxPlaceholderDashboard}>
              {totalTranslationTimeSelected}
            </Typography>
            <DropDownIcon />
          </IconButton>
          <PopperCustom
            rowSelectId={rowSelectId}
            rowSelectMenuOpen={rowSelectMenuOpen}
            rowEl={rowEl}
            handleRowMenuClose={handleRowMenuClose}
            translationsOptions={dateRangeOptions}
            isSelected={totalTranslationTimeSelected}
            popperOnclickHandler={(val) => popperOnclickHandler(val)}
          />
          {/* custom select end */}
        </FormControl>
      </Box>
      <Typography
        sx={{ fontStyle: "italic", marginTop: "10px", textAlign: "center" }}
      >
        [This utility function gives a date range for selected time range. For
        week days, week starts from Monday and ends on Sunday.]
      </Typography>
      <Box
        sx={{
          margin: "40px auto",
          width: "256px",
          marginTop: "20px",
        }}
      >
        <Typography>Date from(YYYY-MM-DD):</Typography>
        <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
          {dateRangeFrom}
        </Typography>
        <Typography>Date to(YYYY-MM-DD):</Typography>
        <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
          {dateRangeTo}
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
