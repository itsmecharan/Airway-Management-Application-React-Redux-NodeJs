import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetInFlightFlightSchedule, GetInFlightFlightId } from '../../Redux/Actions/InFlightActions';
import InFlightSeatMap from './In-Flight-SeatMap';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { selectScheduledFlightsLabel } from '../Labels'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    marginLeft: "350px",
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
      marginLeft: "50px",
      minWidth: 200
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: "350px",
      minWidth: 200
    }
  }
}))

export default function InFlight() {
  const state = useSelector((state: any) => state.inflight);
  const [date] = useState(Date);
  const [value, setValue] = useState(state.inFlightSelectedFlightId);
  const classes = useStyles();
  useEffect(() => {
    GetInFlightFlightSchedule();

  }, [])
  return (
    <div>
      <div className="div-main-heading">In Flight</div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink style={{ color: "black" }}>{selectScheduledFlightsLabel}</InputLabel>
        <Select
          labelId='select-demo'
          id="florida-select"
          displayEmpty
          value={value}
          onChange={(e: any) => { GetInFlightFlightId(e.target.value); setValue(e.target.value) }}
        >
          <MenuItem value="">Select</MenuItem>
          {
            state.inFlightFlightSchedule.map((obj: any) => {
              return (
                <MenuItem value={obj._id}>
                  {obj.FlightName} ------ Timing : {obj.FlightTiming} -- Date : {date.substring(0, 16)}
                </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>

      <br />

      <div className="div-content">
        {
          state.inFlightSelectedFlightId !== '' ?
            <InFlightSeatMap />
            :
            null
        }
      </div>
    </div>
  )
}
