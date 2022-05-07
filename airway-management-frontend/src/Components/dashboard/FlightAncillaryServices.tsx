import React from 'react';
import { useSelector } from 'react-redux';
import { MDBTable, MDBTableBody } from 'mdbreact';
import { PrimaryButton } from '@fluentui/react';
import { useState, useEffect } from 'react';
import { UpdateFlightAncillaryServices } from '../../Redux/Actions/DashboardActions';
import * as Constants from '../Labels';



export default function FlightAncillaryServices() {
    const state = useSelector((state: any) => state.dashboard);
    const [extraBaggage, setExtraBaggage] = useState(Boolean);
    const [ordinaryMeals, setOrdinaryMeals] = useState(Boolean);
    const [specialMeals, setSpecialMeals] = useState(Boolean);
    const [legRoom, setLegRoom] = useState(Boolean);
    const [inFlightShopRequests, setInFlightShopRequests] = useState(Boolean);
    const [shoppingItems, setShoppingItems] = useState(String);
    useEffect(() => {
        for (let i = 0; i < state.dashboardFlightSchedule.length; i++) {
            if (state.dashboardFlightSchedule[i]._id === state.dashboardSelectedFlightId) {
                setExtraBaggage(state.dashboardFlightSchedule[i].FlightAncillaryServices.ExtraBaggage);
                setOrdinaryMeals(state.dashboardFlightSchedule[i].FlightAncillaryServices.OrdinaryMeals);
                setSpecialMeals(state.dashboardFlightSchedule[i].FlightAncillaryServices.SpecialMeals);
                setLegRoom(state.dashboardFlightSchedule[i].FlightAncillaryServices.LegRoom);
                setInFlightShopRequests(state.dashboardFlightSchedule[i].FlightAncillaryServices.InFlightShopRequests);
                setShoppingItems(state.dashboardFlightSchedule[i].ShoppingItems);
            }
        }
    }, [state.dashboardFlightSchedule, state.dashboardSelectedFlightId])

    const HandleAncillaryServices = (service: string) => {
        if (service === "ExtraBaggage") {
            setExtraBaggage(extraBaggage ? false : true);
        }
        if (service === "OrdinaryMeals") {
            setOrdinaryMeals(ordinaryMeals ? false : true);
        }
        if (service === "SpecialMeals") {
            setSpecialMeals(specialMeals ? false : true);
        }
        if (service === "LegRoom") {
            setLegRoom(legRoom ? false : true);
        }
        if (service === "InFlightShopRequests") {
            setInFlightShopRequests(inFlightShopRequests ? false : true);
        }
    }




    return (
        <div>
            <div>
                <h4 className="dashboard-ancillary-heading">{Constants.updateLabel} Ancillary Services</h4>
                <MDBTable striped className="dashboard-ancillary">

                    <MDBTableBody>
                        <tr>
                            <td >{Constants.updateLabel} {Constants.extraBaggageLabel}</td>
                            <td >
                                <label className="container" >
                                    <input type="checkbox"
                                        key="inp-shopreq"
                                        placeholder="Extra Baggage"
                                        checked={extraBaggage}
                                        onChange={() => { HandleAncillaryServices("ExtraBaggage") }}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </td>
                        </tr>
                        <tr >
                            <td >{Constants.updateLabel} {Constants.ordinaryLabel} {Constants.mealsLabel}</td>
                            <td >
                                <label className="container">

                                    <input type="checkbox"
                                        key="inp-shopreq"
                                        checked={ordinaryMeals}
                                        onChange={() => { HandleAncillaryServices("OrdinaryMeals") }}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td >{Constants.updateLabel} {Constants.specialLabel} {Constants.mealsLabel}</td>
                            <td >
                                <label className="container">

                                    <input type="checkbox"
                                        key="inp-shopreq"
                                        checked={specialMeals}
                                        onChange={() => { HandleAncillaryServices("SpecialMeals") }}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </td>

                        </tr>
                        <tr >
                            <td >{Constants.updateLabel} {Constants.legRoomLabel}</td>
                            <td >
                                <label className="container">

                                    <input type="checkbox"
                                        key="inp-shopreq"
                                        checked={legRoom}
                                        onChange={() => { HandleAncillaryServices("LegRoom") }}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </td>
                        </tr>
                        <tr >
                            <td >{Constants.updateLabel} {Constants.inFlightShopRequestLabel}s</td>
                            <td >
                                <label className="container">

                                    <input type="checkbox"
                                        key="inp-shopreq"
                                        checked={inFlightShopRequests}
                                        onChange={() => { HandleAncillaryServices("InFlightShopRequests") }}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>{Constants.updateLabel} Shopping Items</td>
                            <td>
                                <textarea
                                    style={{ width: "300px" }}
                                    value={shoppingItems}
                                    onChange={(e: any) => {
                                        setShoppingItems(e.target.value)
                                    }}
                                    placeholder="enter shop items"
                                />
                            </td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
                <PrimaryButton
                    className="save-ancillary-btn"
                    onClick={async () => {
                        await UpdateFlightAncillaryServices(state.dashboardSelectedFlightId, extraBaggage, ordinaryMeals,
                            specialMeals, legRoom, inFlightShopRequests, shoppingItems);
                    }}
                >
                    Save Ancillary Services
                </PrimaryButton>

            </div>
        </div>

    )
}
