import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { managePassenger } from '../../Redux/Actions/CheckInActions';
import * as Constants from '../Labels';

export default function CheckInSeatMap() {
    const state = useSelector((state: any) => state.checkin);
    const [numbers, setNumbers] = useState(Array);
    const [flightdetails, setFlightdetails] = useState(Array);
    const [checkedInPassengers, setCheckedInPassengers] = useState(Object);
    const [wheelChairedPassengers, setWheelChairedPassengers] = useState(Object);
    const [passengersWithInfant, setPassengersWithInfant] = useState(Object);
    const [totalPassengers, setTotalPassengers] = useState(Object);
    useEffect(() => {
        for (let i = 0; i < state.checkInFlightSchedule.length; i++) {
            if (state.checkInFlightSchedule[i]._id === state.checkInSelectedFlightId) {
                setNumbers([...state.checkInFlightSchedule[i].SeatNumbers]);
                setFlightdetails([state.checkInFlightSchedule[i]]);
                setCheckedInPassengers(state.checkInFlightSchedule[i].CheckedInPassengers);
                setWheelChairedPassengers(state.checkInFlightSchedule[i].WheelChairedPassengers);
                setPassengersWithInfant(state.checkInFlightSchedule[i].PassengersWithInfant);
                setTotalPassengers(state.checkInFlightSchedule[i].TotalPassengers);
            }
        }
    }, [state.checkInSelectedFlightId, state.checkInFlightSchedule])
    const DisplayPassengersInSeatMap = (val: any) => {

        if (checkedInPassengers && wheelChairedPassengers && checkedInPassengers[val] && wheelChairedPassengers[val]) {
            return '#0080ff';
        }
        else if (passengersWithInfant && checkedInPassengers && checkedInPassengers[val] && passengersWithInfant[val]) {
            return '#f5504e';
        }
        else if (checkedInPassengers && checkedInPassengers[val]) {
            return '#43BE5F';
        }
        else if (totalPassengers && !totalPassengers[val]) {
            return '#686868';
        }
        else {
            return 'white';
        }
    }
    return (
        <div>
            <div className="div-heading">Passengers Seat Map</div>
            <div className="div-seatmap">
                {numbers.map((val: any) => {
                    return val % 4 !== 0 ?
                        <button className="div-seatmap-btn" style={{ backgroundColor: `${DisplayPassengersInSeatMap(val)}` }}
                            onClick={() => managePassenger(val, state.checkInSelectedFlightId)}
                        >
                            {val}
                        </button>
                        :

                        <div style={{ display: "inline" }}>
                            <button className="div-seatmap-btn-dummy" disabled ></button>
                            <button className="div-seatmap-btn" style={{ backgroundColor: `${DisplayPassengersInSeatMap(val)}` }}
                                onClick={() => managePassenger(val, state.checkInSelectedFlightId)}
                            >
                                {val}
                            </button>

                            <br />
                        </div>


                })}


            </div>

            <div className="div-seatmap-btn-mark-area" >

                <button className="div-seatmap-btn-mark" style={{ background: "#43BE5F" }} disabled></button> : {Constants.checkedInLabel} <br />
                <button className="div-seatmap-btn-mark" style={{ background: "white" }} disabled></button> : {Constants.nonCheckedInLabel}<br />
                <button className="div-seatmap-btn-mark" style={{ background: "#0080ff" }} disabled></button> : {Constants.wheelChairedLabel} (Checked In)<br />
                <button className="div-seatmap-btn-mark" style={{ background: "#f5504e" }} disabled></button> : {Constants.passengersWithInfantLabel} (Checked In)<br />
                <button className="div-seatmap-btn-mark" style={{ background: "#686868" }} disabled></button> : {Constants.seatsNotBookedLabel}<br />
                <br />
                <em style={{ color: "red" }}> * Click the seats to make Check In and Check out</em>

            </div>

            <div className="div-seatmap-textcontent">
                {
                    flightdetails.map((item: any) => {
                        return (
                            <div>
                                <div className="div-heading">{item.FlightName}</div>
                                <table id="passengers">
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.flightIdLabel}</b></td>
                                        <td>{item.FlightId}</td>
                                    </tr>
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.flightTimingLabel}</b></td>
                                        <td>{item.FlightTiming}</td>
                                    </tr>
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.numberOfSeatsLabel}</b></td>
                                        <td>{item.SeatNumbers.length}</td>
                                    </tr>
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.totalPassengersLabel}</b></td>
                                        <td>{item.TotalPassengers ? Object.keys(item.TotalPassengers).length : 0}</td>
                                    </tr>
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.wheelChairedLabel}</b></td>
                                        <td>{item.WheelChairedPassengers ? Object.keys(item.WheelChairedPassengers).length : 0}</td>
                                    </tr>
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.passengersWithInfantLabel}</b></td>
                                        <td>{item.PassengersWithInfant ? Object.keys(item.PassengersWithInfant).length : 0}</td>
                                    </tr>
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.checkedInLabel} Passengers </b></td>
                                        <td>{item.CheckedInPassengers ? Object.keys(item.CheckedInPassengers).length : 0}</td>
                                    </tr>
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.nonCheckedInLabel} Passengers </b></td>
                                        <td>{item.TotalPassengers && item.CheckedInPassengers ?
                                            Object.keys(item.TotalPassengers).length - Object.keys(item.CheckedInPassengers).length
                                            :
                                            Object.keys(item.TotalPassengers).length}</td>
                                    </tr>
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.sourceLabel}</b></td>
                                        <td>{item.From}</td>
                                    </tr>
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.destinationLabel}</b></td>
                                        <td>{item.To}</td>
                                    </tr>
                                </table>


                            </div>
                        )
                    })
                }


            </div>



        </div>
    )
}
