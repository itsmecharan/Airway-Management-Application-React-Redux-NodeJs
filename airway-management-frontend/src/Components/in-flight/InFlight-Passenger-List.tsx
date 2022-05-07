import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getInFlightPassengerList, ManageLegRoom, ManageInFlightShopRequest } from '../../Redux/Actions/InFlightActions';
import * as Constants from '../Labels';



export default function InFlightPassengersList() {
  const state = useSelector((state: any) => state.inflight);
  useEffect(() => {
    getInFlightPassengerList(state.inFlightSelectedFlightId);
  }, [state.inFlightSelectedFlightId, state.inFlightFlightSchedule])
  return (
    <div>
      <h2 style={{ marginLeft: "10px" }}>Ancillary Services</h2>
      <MDBTable striped>
        <MDBTableHead style={{ background: "#66b2b2" }} >
          <tr>
            <th>#</th>
            <th>{Constants.passengerNameLabel}</th>
            <th>{Constants.seatNumberLabel}</th>
            <th>{Constants.extraBaggageLabel}</th>
            <th>{Constants.mealPrefereneceLabel}</th>
            <th>{Constants.legRoomLabel}</th>
            <th>{Constants.inFlightShopRequestLabel}</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {
            state.inFlightPassengerList.map((item: any, idx: any) => {
              return (
                <tr key={idx + 1}>
                  <td>{idx + 1}</td>
                  <td>{item.PassengerName}</td>
                  <td>{item.SeatNumber}</td>
                  <td>

                    {item.AncillaryServices.ExtraBaggage ?
                      <MDBIcon far icon="check-circle" />
                      :
                      <MDBIcon icon="minus-circle" />
                    }


                  </td>
                  <td> {item.AncillaryServices.OrdinaryMeals ? Constants.ordinaryLabel : Constants.specialLabel}</td>
                  <td>

                    <label className="container">
                      <input type="checkbox"
                        key="inp=legroom"
                        checked={item.AncillaryServices.LegRoom}
                        onChange={() => { ManageLegRoom(item._id) }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td>
                    <label className="container">
                      <input type="checkbox"
                        key="inp-shopreq"
                        checked={item.AncillaryServices.InFlightShopRequest}
                        onChange={() => { ManageInFlightShopRequest(item._id) }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                </tr>
              )
            })
          }
        </MDBTableBody>
      </MDBTable>

    </div>
  )
}
