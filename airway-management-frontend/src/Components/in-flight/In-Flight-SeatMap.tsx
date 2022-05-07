import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InFlightPassengersList from './InFlight-Passenger-List';
import { ChangeMealPreference } from '../../Redux/Actions/InFlightActions';
import * as Constants from '../Labels';



export default function InFlightSeatMap() {
    const state = useSelector((state: any) => state.inflight);
    const [numbers, setNumbers] = useState(Array);
    const [specialmeals, setSpecialmeals] = useState(Object);
    const [flightdetails, setFlightdetails] = useState(Array);
    const [totalPassengers, setTotalPassengers] = useState(Object);
    const [flightName, setFlightName] = useState(String);

    useEffect(() => {
        for (let i = 0; i < state.inFlightFlightSchedule.length; i++) {
            if (state.inFlightFlightSchedule[i]._id === state.inFlightSelectedFlightId) {
                setNumbers(state.inFlightFlightSchedule[i].SeatNumbers);
                setFlightdetails([state.inFlightFlightSchedule[i]]);
                setTotalPassengers(state.inFlightFlightSchedule[i].TotalPassengers);
                setSpecialmeals(state.inFlightFlightSchedule[i].PassengersOptedSpecialMeals);
                setFlightName(state.inFlightFlightSchedule[i].FlightName);
            }
        }
    }, [state.inFlightSelectedFlightId, state.inFlightFlightSchedule])

    const DisplayPassengersInSeatMap = (val: any) => {
        if (specialmeals) {
            if (totalPassengers[val] && specialmeals[val]) {
                return '#5BB7C5'
            }
            else if (totalPassengers[val] && !specialmeals[val]) {
                return 'white';
            }
            else {
                return '#686868';
            }
        }
        else {
            if (totalPassengers[val]) {
                return 'white';
            }
            else {
                return '#686868';
            }
        }

    }

    return (
        <div>
            <div className="div-heading">In-Flight Passengers</div>
            <div className="div-seatmap">
                {numbers.map((val: any) => {
                    return val % 4 !== 0 ?
                        <button className="div-seatmap-btn" style={{ backgroundColor: `${DisplayPassengersInSeatMap(val)}` }}
                            onClick={() => { ChangeMealPreference(val, state.inFlightSelectedFlightId) }}
                        >
                            {val}
                        </button>
                        :

                        <div style={{ display: "inline" }}>
                            <button className="div-seatmap-btn-dummy" disabled ></button>
                            <button className="div-seatmap-btn" style={{ backgroundColor: `${DisplayPassengersInSeatMap(val)}` }}
                                onClick={() => { ChangeMealPreference(val, state.inFlightSelectedFlightId) }}
                            >
                                {val}
                            </button>

                            <br />
                        </div>


                })}


            </div>
            <div className="div-seatmap-btn-mark-area">

                <button className="div-seatmap-btn-mark" style={{ background: "#5BB7C5" }} disabled></button> : {Constants.passengersOptedSpecialMealsLabel} <br />
                <button className="div-seatmap-btn-mark" style={{ background: "white" }} disabled></button> : {Constants.passengersOptedOrdinaryMealsLabel} <br />
                <button className="div-seatmap-btn-mark" style={{ background: "#686868" }} disabled></button> : {Constants.seatsNotBookedLabel}<br /> <br />
                <em style={{ color: "red" }}> * Change the meal preference by clicking on seats</em>

            </div>

            <div className="div-seatmap-textcontent">
                <div className="div-heading">{flightName}</div>
                {
                    flightdetails.map((item: any) => {
                        return (
                            <div>

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
                                        <td> <b className="div-seatmap-text">{Constants.passengersOptedOrdinaryMealsLabel}</b></td>
                                        <td>{item.TotalPassengers && item.PassengersOptedSpecialMeals ?
                                            Object.keys(item.TotalPassengers).length - Object.keys(item.PassengersOptedSpecialMeals).length
                                            :
                                            Object.keys(item.TotalPassengers).length}</td>
                                    </tr>
                                    <tr>
                                        <td><b className="div-seatmap-text">{Constants.passengersOptedSpecialMealsLabel}</b></td>
                                        <td>{item.PassengersOptedSpecialMeals ? Object.keys(item.PassengersOptedSpecialMeals).length : 0}</td>
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
            <br />
            <br />
            <div>
                <InFlightPassengersList />
            </div>

        </div>
    )
}
