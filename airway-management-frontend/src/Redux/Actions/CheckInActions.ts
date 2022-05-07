import store from '../store';
import {
    GetFlightScheduleApi,
    UpdateFlightDetailsApi,
    GetPassengerListApi,
    GetPassengerDetailsApi,
    GetFlightDetailsByIdApi,
    ChangePassengerSeatNumberApi
} from '../Services/CheckInServices';

const dispatch = store.dispatch;

export const GetCheckInFlightSchedule = async () => {
    let response: any = await GetFlightScheduleApi()
    try {
        let res = response.data.flightData;
        console.log(res);
        dispatch({ type: 'GETCHECKINFLIGHTSCHEDULE', payload: { flightschedule: res } });
        return;
    }
    catch (err) {
        console.log("error is here", err);
        return;
    }

}

export const GetCheckInFlightId = async (id: any) => {

    await dispatch({ type: 'GETCHECKINSELECTEDFLIGHTID', payload: { flightid: id } });
}

export const managePassenger = async (seatno: any, flightid: any) => {
    try {
        await UpdateFlightDetailsApi(seatno, flightid);
        await GetCheckInFlightSchedule();
        await getPassengerList(flightid);
    }
    catch (err: any) {
        console.log(err.response.data.message)
    }
}

export const getPassengerList = async (id: any) => {
    let result = await GetPassengerListApi(id)
    try {
        await dispatch({ type: 'GETPASSENGERLIST', payload: { passengerlist: result.passengerArray } })
    }
    catch (err) {
        console.log(err)
    }
}

export const getPassengerDetails = async (id: any) => {
    let result = await GetPassengerDetailsApi(id)
    try {
        //console.log(result.passengerdetails.PassportDetails.PassportNumber);
        await dispatch({
            type: "GETPASSENGERDATA", payload: {
                passengerdata: result.passengerdetails,
                passengerid: id
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}
export const updatedPassengerDetails = async (id: any) => {
    let result = await GetPassengerDetailsApi(id)
    try {
        await dispatch({
            type: "GETUPDATEDPASSENGERDATA", payload: {
                passengerdata: result.passengerdetails,
                passengerid: id
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}

export const showPassengerList = async () => {
    await dispatch({ type: "SHOWPASSENGERLIST" })

}

export const GetCheckInFlightDetailsById = async (id: any) => {
    try {
        const result = await GetFlightDetailsByIdApi(id);
        const SeatsArray: any = [];
        for (let i = 0; i < result.flightData.SeatNumbers.length; i++) {
            if (!result.flightData.TotalPassengers[result.flightData.SeatNumbers[i]]) {
                SeatsArray.push(result.flightData.SeatNumbers[i]);
            }
        }
        await dispatch({ type: "GETUNBOOKEDSEATNUMBERS", payload: { SeatsArray } })
        return;

    }
    catch (err) {
        console.log(err);
    }

}

export const ChangePassengerSeatNumber = async (currentseatno: number, newseatno: number, fid: string) => {
    try {
        await ChangePassengerSeatNumberApi(currentseatno, newseatno, fid);
        await GetCheckInFlightSchedule();
        alert('Passenger seat Got Changed!!')
    }
    catch (err) {
        console.log(err);
        alert('something went wrong!')
    }
}

export const FilterPassengers = async (val: string, passengerList: any) => {
    if (val === 'All Passengers') {
        await dispatch({
            type: "GETFILTEREDPASSENGERS", payload: {
                passengerlist: passengerList
                , filtername: val
            }
        })
        return;
    }
    else if (val === 'Checked In') {
        let filteredlist = passengerList.filter((item: any) => {
            return item.CheckedIn;
        })
        console.log(filteredlist)
        await dispatch({ type: "GETFILTEREDPASSENGERS", payload: { passengerlist: filteredlist, filtername: val } })
        return;
    }
    else if (val === 'Non Checked In') {
        let filteredlist = passengerList.filter((item: any) => {
            return !item.CheckedIn;
        })
        await dispatch({ type: "GETFILTEREDPASSENGERS", payload: { passengerlist: filteredlist, filtername: val } })
        return;
    }
    else if (val === 'Wheel Chaired Passengers') {
        let filteredlist = passengerList.filter((item: any) => {
            return item.NeededWheelChair;
        })
        await dispatch({ type: "GETFILTEREDPASSENGERS", payload: { passengerlist: filteredlist, filtername: val } })
        return;
    }
    else if (val === 'Passengers With Children') {
        let filteredlist = passengerList.filter((item: any) => {
            return item.PassengerWithInfant
        })
        await dispatch({ type: "GETFILTEREDPASSENGERS", payload: { passengerlist: filteredlist, filtername: val } })
        return;
    }
    return;
}

