import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from "mdbreact";
import { PrimaryButton } from "@fluentui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as DashboardActions from "../../Redux/Actions/DashboardActions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import * as Constants from "../Labels";

//Set the styles
const useStyles = makeStyles(() => ({
  paper: { minWidth: "500px" },
}));

export default function DashboardPassengerList() {
  const state = useSelector((state: any) => state.dashboard);

  const [passengerUpdateModalOpen, setPassengerUpdateModalOpen] =
    useState(false);
  const classes = useStyles();
  const [passengerName, setPassengerName] = useState(String);
  const [passportNumber, setPassportNumber] = useState(String);
  const [dob, setDob] = useState(String);
  const [validFrom, setValidFrom] = useState(String);
  const [validTo, setValidTo] = useState(String);
  const [address, setAddress] = useState(String);
  const [pid, setPid] = useState(String);
  const [selectedFilter, setSelectedFilter] = useState(
    state.dashboardFilterName
  );

  useEffect(() => {
    DashboardActions.DashboardFilteredPassengers(
      state.dashboardFilterName,
      state.dashboardPassengerList
    );
  }, [
    state.dashboardFlightSchedule,
    state.dashboardFilterName,
    state.dashboardPassengerList,
  ]);

  const HandlePassengerUpdateModal = (passenger: any) => {
    setPassengerUpdateModalOpen(true);
    setPassengerName(passenger.PassengerName ? passenger.PassengerName : null);
    setPassportNumber(
      passenger.PassportDetails.PassportNumber
        ? passenger.PassportDetails.PassportNumber
        : null
    );
    setDob(
      passenger.PassportDetails.DateOfBirth
        ? passenger.PassportDetails.DateOfBirth
        : null
    );
    setValidFrom(
      passenger.PassportDetails.ValidFrom
        ? passenger.PassportDetails.ValidFrom
        : null
    );
    setValidTo(
      passenger.PassportDetails.ValidTo
        ? passenger.PassportDetails.ValidTo
        : null
    );
    setAddress(passenger.Address ? passenger.Address : null);
    setPid(passenger._id);
  };

  return (
    <div>
      <h2 style={{ margin: "10px" }}>Passenger List :</h2> <br />
      <div style={{ marginLeft: "50px" }}>
        <h5 style={{ display: "inline-table", marginRight: "15px" }}>
          Filter Passengers
        </h5>
        <select
          aria-label="Default select example"
          onChange={(e: any) => {
            DashboardActions.DashboardFilteredPassengers(
              e.target.value,
              state.dashboardPassengerList
            );
            setSelectedFilter(e.target.value);
          }}
          className="custom-select"
          value={selectedFilter}
          style={{
            width: "300px",
            height: "40px",
            display: "inline-table",
            color: "blue",
          }}
        >
          <option value={Constants.allPassengersLabel}>{Constants.allPassengersLabel}</option>
          <option value={Constants.passportLabel}>{Constants.passportLabel}</option>
          <option value={Constants.addressLabel}>{Constants.addressLabel}</option>
          <option value={Constants.dateOfBirthLabel}>{Constants.dateOfBirthLabel}</option>
        </select>
      </div>
      <MDBTable striped style={{ margin: "10px" }} className="dashboard-table">
        <MDBTableHead style={{ background: "#66b2b2" }}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Seat No.</th>
            <th>{Constants.extraBaggageLabel}</th>
            <th>{Constants.legRoomLabel}</th>
            <th>{Constants.mealPrefereneceLabel}</th>
            <th>Shop Request</th>
            <th>{Constants.updateLabel} Details</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {state.dashboardFilteredPassengers.map((passenger: any, idx: any) => {
            return (
              <tr key={idx + 1}>
                <td>{idx + 1}</td>
                <td>{passenger.PassengerName}</td>
                <td>{passenger.SeatNumber}</td>
                <td>
                  {passenger.AncillaryServices.ExtraBaggage ? (
                    <MDBIcon far icon="check-circle" />
                  ) : (
                    <MDBIcon icon="minus-circle" />
                  )}
                </td>
                <td>
                  {passenger.AncillaryServices.LegRoom ? (
                    <MDBIcon far icon="check-circle" />
                  ) : (
                    <MDBIcon icon="minus-circle" />
                  )}
                </td>
                <td>
                  {passenger.AncillaryServices.SpecialMeals
                    ? Constants.specialLabel
                    : Constants.ordinaryLabel}
                </td>
                <td>
                  {passenger.AncillaryServices.InFlightShopRequest ? (
                    <MDBIcon far icon="check-circle" />
                  ) : (
                    <MDBIcon icon="minus-circle" />
                  )}
                </td>

                <td>
                  <PrimaryButton
                    style={{ background: "#66b2b2", color: "black" }}
                    onClick={() => {
                      HandlePassengerUpdateModal(passenger);
                    }}
                  >
                    {Constants.updateLabel}
                  </PrimaryButton>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
      <Dialog
        open={passengerUpdateModalOpen}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="form-dialog-title">
          {Constants.updateLabel} Passenger Details
        </DialogTitle>
        <DialogContent>
          <Form onSubmit={() => { }}>
            <DialogContentText>Update {Constants.passengerNameLabel} :</DialogContentText>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={passengerName}
                onChange={(e: any) => {
                  setPassengerName(e.target.value);
                }}
              />
            </Form.Group>
            <DialogContentText>
              {Constants.updateLabel} {Constants.passportNumberLabel} :
            </DialogContentText>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Enter Passport Number"
                value={passportNumber}
                onChange={(e: any) => {
                  setPassportNumber(e.target.value);
                }}
              />
            </Form.Group>
            <DialogContentText>
              {Constants.updateLabel} {Constants.dateOfBirthLabel} :
            </DialogContentText>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Date Of Birth (DD-MM-YYYY)"
                value={dob}
                onChange={(e: any) => {
                  setDob(e.target.value);
                }}
              />
            </Form.Group>
            <DialogContentText>
              {Constants.updateLabel} {Constants.passportLabel} From Date :
            </DialogContentText>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="From Date (DD-MM-YYYY)"
                value={validFrom}
                onChange={(e: any) => {
                  setValidFrom(e.target.value);
                }}
              />
            </Form.Group>
            <DialogContentText>
              {Constants.updateLabel} {Constants.passportLabel} To Date :
            </DialogContentText>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="To Date (DD-MM-YYYY)"
                value={validTo}
                onChange={(e: any) => {
                  setValidTo(e.target.value);
                }}
              />
            </Form.Group>
            <DialogContentText>
              {Constants.updateLabel} {Constants.passportLabel} {Constants.addressLabel} :
            </DialogContentText>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e: any) => {
                  setAddress(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPassengerUpdateModalOpen(false);
            }}
            style={{ background: "#66b2b2", color: "black" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              DashboardActions.UpdatePassengerDetails(
                passengerName,
                passportNumber,
                dob,
                validFrom,
                validTo,
                address,
                pid,
                state.dashboardSelectedFlightId
              );
              setPassengerUpdateModalOpen(false);
            }}
            style={{ background: "#66b2b2", color: "black" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
