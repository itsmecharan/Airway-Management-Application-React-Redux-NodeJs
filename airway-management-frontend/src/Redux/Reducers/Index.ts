import { combineReducers } from 'redux';
import UserReducer from './User-Reducer';
import CheckInReducer from './CheckIn-Reducer';
import InFlightReducer from './InFlight-Reducer';
import DashboardReducer from './Dashboard-Reducer';


const rootReducer = combineReducers({
    user: UserReducer,
    checkin: CheckInReducer,
    inflight: InFlightReducer,
    dashboard: DashboardReducer
})
export default rootReducer;