const express = require('express');
const FlightData = require('../models/Flight');
const passenger=require('./passenger-manipulation');
const PassengerData = require('../models/Passenger');
const AncillaryData = require('../models/AncillaryServices');
const Flight = require('../models/Flight');

//Add Flight
exports.AddFlight = async(req,res) =>{
    let flight = new FlightData({
        FlightName : req.body.name,
        SeatNumbers : req.body.seatnumbers,
        TotalPassengers : req.body.totalpassengers,
        FlightId : req.body.flightid,
        FlightTiming : req.body.timing,
        WheelChairedPassengers : req.body.wheelchairedpassengers,
        PassengersWithInfant : req.body.passengerswithinfant,
        PassengersOptedSpecialMeals : req.body.passengersoptedspecialmeals,
        CheckedIn : req.body.checkedin,
        From : req.body.From,
        To : req.body.to,
        FlightAncillaryServices:req.body.flightancillaryservices,
        ShoppingItems:req.body.shoppingitems

    })

    let data = await FlightData.findOne({$or: [{FlightId:req.body.flightid}]})
    if(data){
        return res
            .status(400)
            .json({
                message : "Flight with this id is exists in database"});
    }
    else{
        try{
            await flight.save()
            return res
                .status(201)
                .json({
                    message:`Flight added into database successfully`,
                })
        }
        catch{
            return res
                .status(400)
                .json({"message":error});
        }
    }
}

//Get Flight Details By ID
exports.GetFlightById = async(req,res) =>{
    let flightData = await Flight.findOne({$or: [{FlightId:req.params.id}]})
    try{
        return res
        .status(200)
        .json({flightData})
    }
    catch(err){
        return res
        .status(404)
        .json({err})
    }

}

//Get All Flights

exports.GetAllFlights = async (req,res) =>{
    let Data = await FlightData.find()
    try{
    return res
    .status(200)
    .json({flightData : Data})
    }
    catch(err){
        return res
        .status(404)
        .json({message:"No Data Found!!"})
    }
}

//Update Flight Details
exports.UpdateFlightDetails = async(req,res) =>{
    let seatnum = req.body.seatnum;
    let flightid = req.body.flightid;
    let response = await FlightData.findById(flightid);
    try{
        if(response.CheckedInPassengers[seatnum]){
            let passengerid = response.CheckedInPassengers[seatnum];
            if(response.WheelChairedPassengers[seatnum]){
               
                let checkedin = "CheckedInPassengers."+seatnum;
                let wheelchaired = "WheelChairedPassengers."+seatnum;
                let _checkedinset = {};
                let _wheelchairedset = {};
                _checkedinset[checkedin] = response.CheckedInPassengers[seatnum];
                _wheelchairedset[wheelchaired] = response.WheelChairedPassengers[seatnum];
                let obj = {..._checkedinset,..._wheelchairedset};
                
                    try{
                        await FlightData.updateOne(
                            {'_id':flightid},
                            { $unset: obj}
                            )
                        await PassengerData.findOneAndUpdate({PassengerId:passengerid},{$set : {CheckedIn : false}})
                        return res
                        .status(200)
                        .json({message:'Data Updated'});
                    }
                    catch(err){
                        
                        return res
                        .status(404)
                        .json({message:'something went wrong'});
                    }
            }
            else if(response.PassengersWithInfant[seatnum]){
               
                let checkedin = "CheckedInPassengers."+seatnum;
                let withinfant = "PassengersWithInfant."+seatnum;
                let _checkedinset = {};
                let _withinfantset = {};
                _checkedinset[checkedin] = response.CheckedInPassengers[seatnum];
                _withinfantset[withinfant] = response.PassengersWithInfant[seatnum];
                let obj = {..._checkedinset,..._withinfantset};
                
                
                    try{
                        await FlightData.updateOne(
                            {'_id':flightid},
                            { $unset: obj}
                            )
                        await PassengerData.findOneAndUpdate({PassengerId:passengerid},{$set : {CheckedIn : false}})
                        return res
                        .status(200)
                        .json({message:'Data Updated'});
                    }
                    catch(err){
                        
                        return res
                        .status(404)
                        .json({message:'something went wrong',err});
                    }

            }
            else{
                
                await PassengerData.updateOne({'PassengerId':passengerid},{$set :{'CheckedIn':false}})
                let checkedin = "CheckedInPassengers."+seatnum;
                let _checkedinset = {};
                _checkedinset[checkedin] = response.CheckedInPassengers[seatnum];
                await FlightData.updateOne({'_id':flightid},{$unset : _checkedinset });
                return res
                .status(200)
                .json({message:'Data Updated'});
            }
        }
        else if(!response.CheckedInPassengers[seatnum] && response.TotalPassengers[seatnum]){
            let passengerid = response.TotalPassengers[seatnum];
            let result = await PassengerData.findOne({$or: [{PassengerId:passengerid}]})
            try{
            if(result.NeededWheelChair){
                await PassengerData.updateOne({'PassengerId':passengerid},{$set :{'CheckedIn':true}})
                let checkedin = "CheckedInPassengers."+seatnum;
                let wheelchaired = "WheelChairedPassengers."+seatnum;
                let _checkedinset = {};
                let _wheelchairedset = {};
                _checkedinset[checkedin] = response.TotalPassengers[seatnum];
                _wheelchairedset[wheelchaired] = response.TotalPassengers[seatnum];
                let obj = {..._checkedinset,..._wheelchairedset};
                await FlightData.updateOne({'_id':flightid},{$set : obj});
                return res
                .status(200)
                .json({message:'Data Updated'});
            }
            else if(result.PassengerWithInfant){
                await PassengerData.updateOne({'PassengerId':passengerid},{$set :{'CheckedIn':true}})
                let checkedin = "CheckedInPassengers."+seatnum;
                let withinfant = "PassengersWithInfant."+seatnum;
                let _checkedinset = {};
                let _withinfantset = {};
                _checkedinset[checkedin] = response.TotalPassengers[seatnum];
                _withinfantset[withinfant] = response.TotalPassengers[seatnum];
                let obj = {..._checkedinset,..._withinfantset};
                await FlightData.updateOne({'_id':flightid},{$set : obj});
                return res
                .status(200)
                .json({message:'Data Updated'});
                
            }
            else {
                await PassengerData.updateOne({'PassengerId':passengerid},{$set :{'CheckedIn':true}})
                let checkedin = "CheckedInPassengers."+seatnum;
                let _checkedinset = {};
                _checkedinset[checkedin] = response.TotalPassengers[seatnum];
                await FlightData.updateOne({'_id':flightid},{$set : _checkedinset });
                return res
                .status(200)
                .json({message:'Data Updated'});
            }
            }
            catch(err){
                return res
                        .status(404)
                        .json({message:'something went wrong',err});
            }
        }
        else{
            if(!response.TotalPassengers[seatnum]){
                return res
                .status(204)
                .json({message:'No Passenger in this Seat'})
            }
        }
    }
    catch(err){
        return res
        .status(404)
        .json({message:err})
    }
}
 //Get Passengers List By Flight Id
exports.GetPassenegerListByFlightId = async(req,res) =>{
    let data = await FlightData.findById(req.params.id)
    try{
        let passengerids = Object.values(data.TotalPassengers)
        let passengerArray = [];
        for(let i=0;i<passengerids.length;i++){
            let result = await passenger.GetPassengerDetailsById(passengerids[i]);
            try{
                passengerArray.push(result)
            }
            catch(err){
                console.log(err);
            }
        }
        return res
        .status(200)
        .json({passengerArray})
    }
    catch(err){
       
        return res
        .status(404)
        .json({err})
    }
}


//Change Passenger Meal Preference in flight

exports.ChangeMealPreference = async (req,res) =>{
    seatnum = req.body.seatnum;
    flightid = req.body.flightid;
    let response = await FlightData.findById(flightid);
    try{
    let passengerid = response.TotalPassengers[seatnum]
    if(response.PassengersOptedSpecialMeals[seatnum] && response.TotalPassengers[seatnum]){
        let specialmeal = "PassengersOptedSpecialMeals."+seatnum;
        let _specialmealset = {};
        _specialmealset[specialmeal] = passengerid;
        await FlightData.updateOne({'_id':flightid},{$unset : _specialmealset})
        let result = await PassengerData.findOne({$or: [{PassengerId:passengerid}]})
        await PassengerData.updateOne({'PassengerId':passengerid},{$set:
            {'AncillaryServices':{...result.AncillaryServices,"SpecialMeals":false,"OrdinaryMeals":true}}})
        await AncillaryData.updateOne({'_id':'6123dca1bee3b340d0bff0a5'},
        {$push:{"OrdinaryMeals":{$each:[passengerid]}},
        $pull:{"SpecialMeals":{$in:[passengerid]}}}
        )
        return res
        .status(200)
        .json({message:"data updated"})
        
    }
    else if(!response.PassengersOptedSpecialMeals[seatnum] && response.TotalPassengers[seatnum]){
        let specialmeal = "PassengersOptedSpecialMeals."+seatnum;
        let _specialmealset = {};
        _specialmealset[specialmeal] = passengerid;
        await FlightData.updateOne({'_id':flightid},{$set : _specialmealset})
        let result = await PassengerData.findOne({$or: [{PassengerId:passengerid}]})
        await PassengerData.updateOne({'PassengerId':passengerid},{$set:
            {'AncillaryServices':{...result.AncillaryServices,"SpecialMeals":true,"OrdinaryMeals":false}}})
        await AncillaryData.updateOne({'_id':'6123dca1bee3b340d0bff0a5'},
        {$pull:{"OrdinaryMeals":{$in:[passengerid]}},
        $push:{"SpecialMeals":{$each:[passengerid]}}}
        )
        return res
        .status(200)
        .json({message:"data updated"})
    }
    else{
        return res
        .status(200)
        .json({message:"The Seat is Not Booked"})
    }
    }
    catch(err){
        console.log(err);
        return res
        .status(404)
        .json({message:'something went wrong',err})
    }
}

//Get In Flight Passenger Details By ID
exports.GetPassengerDetailsById = async (req,res) =>{
    let id = req.params.id;
    let response = await PassengerData.findById(id)
    try{
        return res
        .status(200)
        .json({passengerdetails:response});
    }
    catch(err){
        return res
        .status(404)
        .json({err});
    }
}


//Change Passenger Seat Number
exports.ChangePassengerSeatNumber = async(req,res) =>{
    let currentSeatNum = req.body.currentseatnum;
    let newSeatNum = req.body.newseatnum;
    let flightid = req.body.fid;

    let response = await FlightData.findOne({$or: [{FlightId:req.body.fid}]})
    try{
        let pid = response.TotalPassengers[currentSeatNum];
        let removeTp = "TotalPassengers."+currentSeatNum;
        let _removeTpSet = {};
        _removeTpSet[removeTp] = pid;
        let updateTp = "TotalPassengers."+newSeatNum;
        let _updateTpSet = {};
        _updateTpSet[updateTp] = pid;
        await FlightData.updateOne({FlightId:flightid},{$unset : _removeTpSet,$set : _updateTpSet})
        if(response.PassengersWithInfant[currentSeatNum]){
            let removePi = "PassengersWithInfant."+currentSeatNum;
            let _removePiSet = {};
            _removePiSet[removePi] = pid;
            let updatePi = "PassengersWithInfant."+newSeatNum;
            let _updatePiSet = {};
            _updatePiSet[updatePi] = pid;
            let removeCi = "CheckedInPassengers."+currentSeatNum;
            let _removeCiSet = {};
            _removeCiSet[removeCi] = pid;
            let updateCi = "CheckedInPassengers."+newSeatNum;
            let _updateCiSet = {};
            _updateCiSet[updateCi] = pid;
            let obj1 = {..._removePiSet,..._removeCiSet};
            let obj2 = {..._updatePiSet,..._updateCiSet};
            await FlightData.updateOne({FlightId:flightid},{$unset : obj1,$set :obj2})
        }
        if(response.WheelChairedPassengers[currentSeatNum]){

            let removeWc = "WheelChairedPassengers."+currentSeatNum;
            let _removeWcSet = {};
            _removeWcSet[removeWc] = pid;
            let updateWc = "WheelChairedPassengers."+newSeatNum;
            let _updateWcSet = {};
            _updateWcSet[updateWc] = pid;
            let removeCi = "CheckedInPassengers."+currentSeatNum;
            let _removeCiSet = {};
            _removeCiSet[removeCi] = pid;
            let updateCi = "CheckedInPassengers."+newSeatNum;
            let _updateCiSet = {};
            _updateCiSet[updateCi] = pid;
            let obj1 = {..._removeWcSet,..._removeCiSet};
            let obj2 = {..._updateWcSet,..._updateCiSet};
            await FlightData.updateOne({FlightId:flightid},{$unset : obj1,$set :obj2})

        }
        if(response.CheckedInPassengers[currentSeatNum]){
            let removeCi = "CheckedInPassengers."+currentSeatNum;
            let _removeCiSet = {};
            _removeCiSet[removeCi] = pid;
            let updateCi = "CheckedInPassengers."+newSeatNum;
            let _updateCiSet = {};
            _updateCiSet[updateCi] = pid;
            await FlightData.updateOne({FlightId:flightid},{$unset : _removeCiSet,$set : _updateCiSet})
        }
        if(response.PassengersOptedSpecialMeals[currentSeatNum]){
            let removePs = "PassengersOptedSpecialMeals."+currentSeatNum;
            let _removePsSet = {};
            _removePsSet[removePs] = pid;
            let updatePs = "PassengersOptedSpecialMeals."+newSeatNum;
            let _updatePsSet = {};
            _updatePsSet[updatePs] = pid;
            await FlightData.updateOne({FlightId:flightid},{$unset : _removePsSet,$set : _updatePsSet})
        }
        await PassengerData.updateOne({PassengerId:pid},{$set:{"SeatNumber":newSeatNum}})

        return res
        .status(200)
        .json({message:"data updated"})

    }
    catch(err){
        return res
        .status(404)
        .json({err})
    }
}

//Update Flight ancillary Services

exports.UpdateFlightAncillaryServices = async (req,res) =>{
    let fid = req.params.id;
    
    try{
        await FlightData.updateOne({"_id":fid},{$set:{
            "FlightAncillaryServices":{
                "ExtraBaggage":req.body.extraBaggage,
                "OrdinaryMeals":req.body.ordinaryMeals,
                "SpecialMeals" : req.body.specialMeals,
                "LegRoom" : req.body.legRoom,
                "InFlightShopRequests":req.body.inFlightShopRequests
            }}})
    await FlightData.updateOne({"_id":fid},{$set:{"ShoppingItems":req.body.shoppingItems}})
        return res.status(200).json({message:"Data Updated"});
    }
    catch(err){
       
        return res.status(404).json({err});
    }
}