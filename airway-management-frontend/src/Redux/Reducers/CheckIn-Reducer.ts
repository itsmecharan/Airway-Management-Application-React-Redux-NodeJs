import * as Constants from './ActionTypes';
const initialstate = {
    checkInFlightSchedule: [],
    checkInSelectedFlightId: '',
    passengerList: [],
    passengerData: {},
    showPassengerData: false,
    filteredPassengers: [],
    unBookedSeatNumbers: [],
    filterPassengersBy: 'All Passengers',
    checkInPassengerId: ''

}


const CheckInReducer = (state = initialstate, action: any) => {
    switch (action.type) {
        case Constants.GetCheckInFlightSchedule:
            return {
                ...state, checkInFlightSchedule: [...action.payload.flightschedule]
            }
        case Constants.GetCheckInSelectedFlightId:

            return {
                ...state,
                checkInSelectedFlightId: action.payload.flightid
            }
        case Constants.GetPassengerList:
            return {
                ...state,
                passengerList: [...action.payload.passengerlist]
            }
        case Constants.GetPassengerData:
            return {
                ...state,
                passengerData: action.payload.passengerdata,
                showPassengerData: true,
                checkInPassengerId: action.payload.passengerid
            }
        case Constants.GetUpdatedPassengerData:
            return {
                ...state,
                passengerData: action.payload.passengerdata,
                checkInPassengerId: action.payload.passengerid
            }
        case Constants.ShowPassengerList:
            return {
                ...state, showPassengerData: false
            }
        case Constants.GetFilteredPassengers:
            return {
                ...state,
                filteredPassengers: [...action.payload.passengerlist],
                filterPassengersBy: action.payload.filtername
            }
        case Constants.GetUnBookedSeatNumbers:
            return {
                ...state,
                unBookedSeatNumbers: [...action.payload.SeatsArray]
            }
        default:
            return state;

    }
}
export default CheckInReducer;
