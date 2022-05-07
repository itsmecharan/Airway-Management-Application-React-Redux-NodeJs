import * as Constants from './ActionTypes';
const initialstate = {
    loginEmail: '',
    useLogout: false
}


const UserReducer = (state = initialstate, action: any) => {
    switch (action.type) {
        case Constants.Login:
            return {
                ...state,
                loginEmail: action.payload.email
            }
        case Constants.UserLogout:
            return { ...state, userLogout: true }
        default:
            return state;

    }
}
export default UserReducer;
