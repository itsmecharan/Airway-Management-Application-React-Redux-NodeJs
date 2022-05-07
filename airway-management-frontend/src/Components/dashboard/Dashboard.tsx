import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import FlightAncillaryServices from './FlightAncillaryServices';
import '../../Styles/Dashboard-Styles.scss';
import { selectScheduledFlightsLabel } from '../Labels';


import {
    GetDashBoardFlightSchedule,
    GetDashBoardFlightId,
    ShowManagePassengers,
    ShowAncillaryServices,
    getPassengerList
} from '../../Redux/Actions/DashboardActions';
import { useSelector } from 'react-redux';
import DashboardPassengerList from './Dashboard-Passenger-List';


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
export default function Dashboard() {
    const state = useSelector((state: any) => state.dashboard);
    const [value, setValue] = useState(state.dashboardSelectedFlightId);
    const classes = useStyles();
    const date = Date();
    useEffect(() => {
        GetDashBoardFlightSchedule();
        getPassengerList(state.dashboardSelectedFlightId)
    }, [state.dashboardSelectedFlightId])
    return (
        <div>
            <h3 className="div-main-heading">Admin</h3>
            <FormControl className={classes.formControl}>
                <InputLabel style={{ color: "black" }} shrink>{selectScheduledFlightsLabel}</InputLabel>
                <Select
                    labelId='select-demo'
                    id="florida-select"
                    displayEmpty
                    value={value}
                    onChange={(e: any) => { GetDashBoardFlightId(e.target.value); setValue(e.target.value) }}
                >
                    <MenuItem value="">Select</MenuItem>
                    {
                        state.dashboardFlightSchedule.map((obj: any) => {
                            return (
                                <MenuItem value={obj._id}>
                                    {obj.FlightName} ------ Timing : {obj.FlightTiming} -- Date : {date.substring(0, 16)}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            <hr />
            {state.dashboardSelectedFlightId !== '' ?
                <div>
                    <div className="dashboard-toggle-btns"  >
                        <button type="button" style={{ marginRight: "10px", background: "#66b2b2", color: "black" }}
                            className="btn btn-primary"
                            onClick={(state: any) => {
                                if (state.dashboardSelectedFlightId !== '') {
                                    ShowManagePassengers()
                                }
                                else {
                                    alert('select scheduled flight')
                                }
                            }}
                        >
                            Manage Passengers</button>
                        <button type="button" style={{ background: "#66b2b2", color: "black" }}
                            className="btn btn-primary"
                            onClick={(state: any) => {
                                if (state.dashboardSelectedFlightId !== '') {
                                    ShowAncillaryServices()
                                }
                                else {
                                    alert('select scheduled flight')
                                }
                            }}

                        >Manage Ancillary Services</button>
                    </div>
                    {state.showManagePassengers ?
                        <div>
                            <DashboardPassengerList />
                        </div>
                        :
                        null

                    }
                    {state.showAncillaryServices ?
                        <div>
                            <br />
                            <FlightAncillaryServices />
                        </div>
                        :
                        null
                    }


                </div>
                :
                null
            }






        </div>
    )
}
