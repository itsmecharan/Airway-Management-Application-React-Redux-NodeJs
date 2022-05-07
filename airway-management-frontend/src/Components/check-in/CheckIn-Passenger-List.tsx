import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as CheckInActions from '../../Redux/Actions/CheckInActions';
import * as Constants from '../Labels';
import { PrimaryButton } from '@fluentui/react';
import Button from 'react-bootstrap/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function CheckInPassengersList() {
  const state = useSelector((state: any) => state.checkin);
  const [open, setOpen] = useState(false);
  const [fid, setFid] = useState(String);
  const [seatnum, setSeatnum] = useState(Number);
  const [newSeatNum, setNewSeatNum] = useState(Number);
  const [selectedFilter, setSelectedFilter] = useState(state.filterPassengersBy);

  const handleClickOpen = async (flightid: any, seatno: any) => {
    setFid(flightid);
    setSeatnum(seatno);
    setOpen(true);
  };

  const handleClose = async (currentseatnum: number, newseatnum: number, flightid: string) => {
    if (newseatnum !== 0) {
      await CheckInActions.ChangePassengerSeatNumber(currentseatnum, newseatnum, flightid);
      setOpen(false);

    }
    else {
      alert('Please Select New Seat Number !');
    }


  };

  useEffect(() => {
    CheckInActions.FilterPassengers(state.filterPassengersBy, state.passengerList);
    CheckInActions.updatedPassengerDetails(state.checkInPassengerId)
  }, [state.passengerList, state.filterPassengersBy, state.checkInPassengerId])


  return (
    <div>
      {state.showPassengerData ?
        <div>
          <hr />
          <PrimaryButton onClick={() => { CheckInActions.showPassengerList() }} style={{ background: "#66b2b2", color: "black" }} className="passengerlist-back-btn" >Go to Passenger List</PrimaryButton>
          <div className="div-passengerdetail" >
            <h4 className="passengerdetail-heading">Passenger Details</h4>
            <b>{Constants.passengerNameLabel} : </b> {state.passengerData.PassengerName} <br />
            <b>{Constants.emailLabel} : </b> {state.passengerData.PassengerEmailId} <br />
            <b>{Constants.phoneNumberLabel} : </b>{state.passengerData.PassengerPhoneNumber} <br />
            <b>{Constants.seatNumberLabel} : </b>{state.passengerData.SeatNumber} <br />
            <b>{Constants.flightIdLabel} : </b> {state.passengerData.FlightId} <br />
            <b>{Constants.neededWheelChairLabel} : </b> {state.passengerData.NeededWheelChair ? "Yes" : "No"} <br />
            <b>{Constants.passengerWithChildrenLabel} : </b>{state.passengerData.PassengerWithInfant ? "Yes" : "No"} <br />
            <b>{Constants.checkedInLabel} : </b>{state.passengerData.CheckedIn ? "Yes" : "No"} <br />
            <b>{Constants.passengerIdLabel} : </b> {state.passengerData.PassengerId} <br />
          </div>
          <div className="div-passengerancillary" >
            <h4 className="passengerdetail-heading">Ancillary Services</h4>
            <b>{Constants.extraBaggageLabel} : </b> {state.passengerData.ExtraBaggage ? "Yes" : "No"} <br />
            <b>{Constants.mealsLabel} : </b>{state.passengerData.SpecialMeals ? Constants.specialLabel : Constants.ordinaryLabel} <br />
            <b>{Constants.legRoomLabel} : </b>{state.passengerData.LegRoom ? "Yes" : "No"} <br />
            <b>{Constants.inFlightShopRequestLabel} : </b> {state.passengerData.InFlightShopRequest ? "Yes" : "No"} <br />
          </div>
          <br />
          <br />
        </div>

        :
        <div>
          <h2>Passenger List :</h2> <br />
          <div style={{ marginLeft: "50px" }}>
            <h5 style={{ display: "inline-table", marginRight: "15px" }}>Filter Passengers</h5>
            <select aria-label="Default select example"
              onChange={(e: any) => { CheckInActions.FilterPassengers(e.target.value, state.passengerList); setSelectedFilter(e.target.value) }}
              className="custom-select"
              value={selectedFilter}
              style={{ width: "300px", height: "40px", display: "inline-table", color: 'blue' }}
            >
              <option value={Constants.allPassengersLabel}>{Constants.allPassengersLabel}</option>
              <option value={Constants.checkedInLabel}>{Constants.checkedInLabel}</option>
              <option value={Constants.nonCheckedInLabel}>{Constants.nonCheckedInLabel}</option>
              <option value={Constants.wheelChairedLabel}>{Constants.wheelChairedLabel}</option>
              <option value={Constants.passengersWithInfantLabel}>{Constants.passengersWithInfantLabel}</option>
            </select>
          </div>
          <br />
          <MDBTable striped >

            <MDBTableHead style={{ background: "#66b2b2" }} >
              <tr>
                <th>#</th>
                <th>{Constants.passengerNameLabel}</th>
                <th>{Constants.seatNumberLabel}</th>
                <th>{Constants.extraBaggageLabel}</th>
                <th>{Constants.legRoomLabel}</th>
                <th>See More Details</th>
                <th>Change Seat</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>

              {state.filteredPassengers.map((passenger: any, idx: any) => {
                return (
                  <tr key={idx + 1}>
                    <td>{idx + 1}</td>
                    <td>{passenger.PassengerName}</td>
                    <td>{passenger.SeatNumber}</td>
                    <td>
                      {passenger.AncillaryServices.ExtraBaggage ?
                        <MDBIcon far icon="check-circle" />
                        :
                        <MDBIcon icon="minus-circle" />
                      }
                    </td>
                    <td>
                      {passenger.AncillaryServices.LegRoom ?
                        <MDBIcon far icon="check-circle" />
                        :
                        <MDBIcon icon="minus-circle" />
                      }
                    </td>
                    <td><PrimaryButton style={{ background: "#66b2b2", color: "black" }} onClick={() => { CheckInActions.getPassengerDetails(passenger._id) }}>click here</PrimaryButton></td>
                    <td><PrimaryButton style={{ background: "#66b2b2", color: "black" }}
                      onClick={() => {
                        handleClickOpen(passenger.FlightId, passenger.SeatNumber);
                        CheckInActions.GetCheckInFlightDetailsById(passenger.FlightId)
                      }}>Change Seat</PrimaryButton></td>
                  </tr>
                )

              })
              }


            </MDBTableBody>
          </MDBTable>
        </div>
      }
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Passenger Seat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b style={{ color: "#66b2b2" }}>Current Seat Number :  {seatnum} </b><br />
            <b style={{ color: "#66b2b2" }}>Select the Seat Number to Change </b>
          </DialogContentText>
          <select aria-label="Default select example"
            onChange={(e: any) => { setNewSeatNum(e.target.value) }}
            className="custom-select"
            style={{ width: "200px", height: "40px" }}
          >
            <option >Available Seats</option>
            {
              state.unBookedSeatNumbers.map((val: any) => {
                return (
                  <option value={val}>
                    {val}
                  </option>
                )
              })
            }
          </select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }} style={{ background: "#66b2b2", color: "black" }}>
            Cancel
          </Button>
          <Button
            style={{ background: "#66b2b2", color: "black" }}
            onClick={() => { handleClose(seatnum, newSeatNum, fid) }} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}


