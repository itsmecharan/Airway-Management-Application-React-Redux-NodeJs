const express = require('express');
const router = express.Router();
const passenger=require('../functions/passenger-manipulation');
const flight=require('../functions/flight-manipulation');
const ancillary=require('../functions/ancillary-manipulation');


//Passenger Routes
router.post('/passenger',passenger.AddPassenger);
router.post('/managelegroom/:id',passenger.ManagePassengerLegRoom);
router.post('/manageinflightshoprequest/:id',passenger.ManagePassengerInFlightShopRequest);
router.post('/updatepassengerdetails/:id',passenger.UpdatePassengerDetails);



//Flight Routes
router.post('/addflight',flight.AddFlight);
router.get('/getallflights',flight.GetAllFlights);
router.patch('/updateflightdetails',flight.UpdateFlightDetails);
router.get('/passengerlist/:id',flight.GetPassenegerListByFlightId);
router.post('/changemealpreference',flight.ChangeMealPreference);
router.get('/getpassengerdetails/:id',flight.GetPassengerDetailsById);
router.get('/getflightbyid/:id',flight.GetFlightById);
router.post('/changeseatnumber',flight.ChangePassengerSeatNumber);
router.post('/updateflightancillaryservices/:id',flight.UpdateFlightAncillaryServices);

//Ancillary Services
router.get('/ancillaryservices',ancillary.AncillaryServices);


module.exports = router;