import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GetCheckInFlightSchedule,
  getPassengerList,
  GetCheckInFlightId,
} from "../../Redux/Actions/CheckInActions";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckInSeatMap from "./CheckIn-SeatMap";
import CheckInPassengersList from "./CheckIn-Passenger-List";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import "../../Styles/CheckIn-Styles.scss";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    marginLeft: "350px",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      marginLeft: "50px",
      minWidth: 200,
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "350px",
      minWidth: 200,
    },
  },
}));

export default function CheckIn() {
  const state = useSelector((state: any) => state.checkin);
  const date = Date();
  const [value, setValue] = useState(state.checkInSelectedFlightId);
  const classes = useStyles();

  useEffect(() => {
    GetCheckInFlightSchedule();
    getPassengerList(state.checkInSelectedFlightId);
  }, [state.checkInSelectedFlightId]);

  return (
    <div>
      <div className="div-main-heading">Airport Check In</div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink style={{ color: "black" }}>
          Select Scheduled Flights
        </InputLabel>
        <Select
          labelId="select-demo"
          id="florida-select"
          displayEmpty
          value={value}
          onChange={(e: any) => {
            GetCheckInFlightId(e.target.value);
            setValue(e.target.value);
          }}
        >
          <MenuItem value="">Select</MenuItem>
          {state.checkInFlightSchedule.map((obj: any) => {
            return (
              <MenuItem value={obj._id}>
                {obj.FlightName} ------ Timing : {obj.FlightTiming} -- Date :{" "}
                {date.substring(0, 16)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <div className="div-content">
        {state.checkInSelectedFlightId !== "" ? (
          <div>
            <CheckInSeatMap />
            <CheckInPassengersList />
          </div>
        ) : null}
      </div>
    </div>
  );
}
