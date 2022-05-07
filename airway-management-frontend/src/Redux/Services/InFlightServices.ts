import axios from 'axios';

export const GetFlightScheduleApi = async () => {

    let response = await axios.get('/getallflights')
    try {
        return response;
    }
    catch (err) {
        return err;
    }
}

export const GetPassengerListApi = async (id: any) => {
    let response = await axios.get(`/passengerlist/${id}`)
    try {
        return response.data;
    }
    catch (err) {
        return err;
    }
}

export const ChangeMealPreferenceApi = async (seatno: any, flightid: any) => {
    let response = await axios.post('/changemealpreference', {
        seatnum: seatno,
        flightid: flightid
    })
    try {
        return response.data;
    }
    catch (err) {
        return err;
    }
}

export const ManageLegRoomApi = async (pid: any) => {
    let response = await axios.post('/managelegroom/' + pid)
    try {
        return response.data;
    }
    catch (err) {
        return err;
    }
}

export const ManageInFlightShopRequestApi = async (pid: any) => {
    let response = await axios.post('/manageinflightshoprequest/' + pid)
    try {
        return response.data;
    }
    catch (err) {
        return err;
    }

}