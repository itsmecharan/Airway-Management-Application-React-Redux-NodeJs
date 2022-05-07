import store from '../store';
import {
    GetFlightScheduleApi,
    GetPassengerListApi,
    ChangeMealPreferenceApi,
    ManageLegRoomApi,
    ManageInFlightShopRequestApi
} from '../Services/InFlightServices';

const dispatch = store.dispatch;
export const GetInFlightFlightSchedule = async () => {
    let response: any = await GetFlightScheduleApi()
    try {
        let res = response.data.flightData;
        dispatch({ type: 'GETINFLIGHTFLIGHTSCHEDULE', payload: { inflightflightschedule: res } });
        return;
    }
    catch (err) {
        console.log(err);
        return;
    }

}

//GetInFlightFlightId

export const GetInFlightFlightId = async (id: any) => {
    await dispatch({ type: 'GETINFLIGHTSELECTEDFLIGHTID', payload: { inflightselectedflightid: id } });
}


//Get In Flight Passenger List
export const getInFlightPassengerList = async (id: any) => {
    let result = await GetPassengerListApi(id)
    try {
        await dispatch({ type: 'GETINFLIGHTPASSENGERLIST', payload: { passengerlist: result.passengerArray } })
    }
    catch (err) {
        console.log(err)
    }
}

//Change Passenger Meal Preference

export const ChangeMealPreference = async (seatno: any, flightid: any) => {
    try {
        await ChangeMealPreferenceApi(seatno, flightid);
        await GetInFlightFlightSchedule();

    }
    catch (err) {
        console.log(err);
    }
}

//Manage Passenger Leg Room
export const ManageLegRoom = async (pid: any) => {
    try {
        await ManageLegRoomApi(pid)
        await GetInFlightFlightSchedule();
    }
    catch (err) {
        console.log(err)
    }
}

//Manage In Flight Shop Request
export const ManageInFlightShopRequest = async (pid: any) => {
    try {
        await ManageInFlightShopRequestApi(pid)
        await GetInFlightFlightSchedule();
    }
    catch (err) {
        console.log(err)
    }
}