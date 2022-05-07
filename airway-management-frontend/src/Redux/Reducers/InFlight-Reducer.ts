import * as Constants from './ActionTypes';
const initialstate = {
    inFlightFlightSchedule: [],
    inFlightSelectedFlightId: '',
    inFlightPassengerList: []
}
const InFlightReducer = (state = initialstate, action: any) => {
    switch (action.type) {
        case Constants.GetInFlightFlightSchedule:
            return {
                ...state, inFlightFlightSchedule: [...action.payload.inflightflightschedule]
            }
        case Constants.GetInFlightSelectedFlightId:
            return {
                ...state, inFlightSelectedFlightId: action.payload.inflightselectedflightid
            }
        case Constants.GetInFlightPassengerList:
            return {
                ...state, inFlightPassengerList: action.payload.passengerlist
            }
        default:
            return state;

    }
}
export default InFlightReducer;