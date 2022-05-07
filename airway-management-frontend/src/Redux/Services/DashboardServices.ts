import axios from 'axios';

export const UpdatePassengerDetailsApi = async (passengerName: string, passportNumber: string,
    dob: string, validFrom: string, validTo: string, address: string, pid: string) => {
    let response = await axios.post('/updatepassengerdetails/' + pid, {
        passengerName, passportNumber, dob, validFrom, validTo, address
    })
    try {
        return response.data;
    }
    catch (err) {
        return err;
    }
}

export const UpdateFlightAncillaryServicesApi = async (fid: any, extraBaggage: boolean, ordinaryMeals: boolean,
    specialMeals: boolean, legRoom: boolean, inFlightShopRequests: boolean, shoppingItems: string) => {
    let response = await axios.post('/updateflightancillaryservices/' + fid, {
        extraBaggage, ordinaryMeals, specialMeals, legRoom, inFlightShopRequests, shoppingItems
    })
    try {
        return response.data;
    }
    catch (err) {
        return err;
    }

}