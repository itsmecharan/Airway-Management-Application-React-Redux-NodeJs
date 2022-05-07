import * as Constants from './ActionTypes';
const initialstate = {
    dashboardFlightSchedule: [],
    dashboardSelectedFlightId: '',
    showManagePassengers: false,
    showAncillaryServices: false,
    dashboardPassengerList: [],
    dashboardFilteredPassengers: [],
    passengerData: {},
    dashboardFilterName: "All Passengers"

}


const DashboardReducer = (state = initialstate, action: any) => {
    switch (action.type) {
        case Constants.GetDashboardFlightSchedule:
            return {
                ...state, dashboardFlightSchedule: [...action.payload.flightschedule]
            }
        case Constants.GetDashboardSelectedFlightId:
            console.log(state.dashboardSelectedFlightId);
            return {
                ...state,
                dashboardSelectedFlightId: action.payload.flightid
            }
        case Constants.ShowManagePassengers:
            console.log(state.dashboardSelectedFlightId);
            return {
                ...state,
                showManagePassengers: true,
                showAncillaryServices: false
            }
        case Constants.ShowAncillaryServices:

            return {
                ...state,
                showManagePassengers: false,
                showAncillaryServices: true
            }
        case Constants.GetDashboardPassengerList:
            return {
                ...state,
                dashboardPassengerList: [...action.payload.passengerlist]
            }
        case Constants.GetDashboardPassengerDetails:
            return {
                ...state,
                passengerData: { ...action.payload.passengerdata }
            }
        case Constants.GetDashboardFilteredPassengers:
            return {
                ...state,
                dashboardFilteredPassengers: [...action.payload.passengerlist],
                dashboardFilterName: action.payload.filtername
            }
        default:
            return state;

    }
}
export default DashboardReducer;
