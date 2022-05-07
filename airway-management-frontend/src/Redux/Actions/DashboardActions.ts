import store from '../store';
import {
    GetFlightScheduleApi,
    GetPassengerListApi,
    //GetPassengerDetailsApi
} from '../Services/CheckInServices';
import { UpdatePassengerDetailsApi, UpdateFlightAncillaryServicesApi } from '../Services/DashboardServices';



const dispatch = store.dispatch;
export const GetDashBoardFlightSchedule = async () => {
    let response: any = await GetFlightScheduleApi()
    try {
        let res = response.data.flightData;
        console.log(res);
        dispatch({ type: 'GETDASHBOARDFLIGHTSCHEDULE', payload: { flightschedule: res } });
        return;
    }
    catch (err) {
        console.log("error is here", err);
        return;
    }
}

export const GetDashBoardFlightId = async (id: any) => {

    await dispatch({ type: 'GETDASHBOARDSELECTEDFLIGHTID', payload: { flightid: id } });
}


export const ShowManagePassengers = async () => {

    await dispatch({ type: 'SHOWMANAGEPASSENGERS' })
}

export const ShowAncillaryServices = async () => {
    await dispatch({ type: "SHOWANCILLARYSERVICES" })
}

export const getPassengerList = async (id: any) => {
    let result = await GetPassengerListApi(id)
    try {
        await dispatch({ type: 'GETDASHBOARDPASSENGERLIST', payload: { passengerlist: result.passengerArray } })
    }
    catch (err) {
        console.log(err)
    }
}

export const UpdatePassengerDetails = async (passengerName: string, passportNumber: string,
    dob: string, validFrom: string, validTo: string, address: string, pid: string, fid: string) => {
    let result = await UpdatePassengerDetailsApi(passengerName, passportNumber, dob, validFrom, validTo, address, pid);
    try {
        console.log(result);
        await getPassengerList(fid);
        alert('Passenger Details Updated Successfully!!');
    }
    catch (err) {
        console.log(err);
        return;
    }
}

export const DashboardFilteredPassengers = async (val: string, dashboardPassengerList: any) => {
    if (val === 'All Passengers') {
        await dispatch({
            type: "GETDASHBOARDFILTEREDPASSENGERS", payload: {
                passengerlist: dashboardPassengerList
                , filtername: val
            }
        })
        return;
    }
    else if (val === 'Passport') {
        let filteredlist = dashboardPassengerList.filter((item: any) => {
            return !item.PassportDetails.PassportNumber || !item.PassportDetails.ValidFrom || !item.PassportDetails.ValidTo;
        })
        console.log(filteredlist)
        await dispatch({ type: "GETDASHBOARDFILTEREDPASSENGERS", payload: { passengerlist: filteredlist, filtername: val } })
        return;
    }
    else if (val === 'Address') {
        let filteredlist = dashboardPassengerList.filter((item: any) => {
            return !item.Address;
        })
        await dispatch({ type: "GETDASHBOARDFILTEREDPASSENGERS", payload: { passengerlist: filteredlist, filtername: val } })
        return;
    }
    else if (val === 'Date Of Birth') {
        let filteredlist = dashboardPassengerList.filter((item: any) => {
            return !item.PassportDetails.DateOfBirth;
        })
        await dispatch({ type: "GETDASHBOARDFILTEREDPASSENGERS", payload: { passengerlist: filteredlist, filtername: val } })
        return;
    }

    return;
}

export const UpdateFlightAncillaryServices = async (fid: any, extraBaggage: boolean, ordinaryMeals: boolean,
    specialMeals: boolean, legRoom: boolean, inFlightShopRequests: boolean, shoppingItems: string) => {
    let result = await UpdateFlightAncillaryServicesApi(fid, extraBaggage, ordinaryMeals,
        specialMeals, legRoom, inFlightShopRequests, shoppingItems)
    try {
        console.log(result);
        await GetDashBoardFlightSchedule();
        alert("Ancillary Services Updated Successfully!!")

    }
    catch (err) {
        console.log(err)
        alert("Something went Wrong!")
    }
}

