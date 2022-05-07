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

export const UpdateFlightDetailsApi = async (seatno: any, flightid: any) => {
    let response = await axios.patch('/updateflightdetails', {
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

export const GetPassengerListApi = async (id: any) => {
    let response = await axios.get(`/passengerlist/${id}`)
    try {
        return response.data;
    }
    catch (err) {
        return err;
    }
}

export const GetPassengerDetailsApi = async (id: any) => {
    let response = await axios.get(`/getpassengerdetails/${id}`)
    try {
        return response.data
    }
    catch (err) {
        return err
    }
}
export const GetFlightDetailsByIdApi = async (id: any) => {

    let response = await axios.get(`/getflightbyid/${id}`)
    try {
        return response.data;
    }
    catch (err) {
        return err;
    }
}

export const ChangePassengerSeatNumberApi = async (currentseatno: number, newseatno: number, fid: string) => {
    let response = await axios.post("/changeseatnumber", {
        currentseatnum: currentseatno,
        newseatnum: newseatno,
        fid: fid
    })
    try {
        return response.data
    }
    catch (err) {
        return err;
    }
}