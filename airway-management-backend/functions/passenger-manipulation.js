const express = require('express');
const PassengerData = require('../models/Passenger');
const AncillaryData = require('../models/AncillaryServices.js');
const Passenger = require('../models/Passenger');



//Add Passenger
exports.AddPassenger = async(req,res) =>{
    let passenger = new PassengerData({
        PassengerName : req.body.name,
        PassengerEmailId : req.body.email,
        PassengerPhoneNumber : req.body.phonenumber,
        SeatNumber : req.body.seatno,
        FlightId : req.body.flightid,
        NeededWheelChair : req.body.neededwheelchair,
        PassengerWithInfant : req.body.passengerwithinfant,
        AncillaryServices : req.body.ancillaryservices,
        CheckedIn : req.body.checkedin,
        PassportDetails:req.body.passportdetails,
        Address:req.body.address

    })

    let data = await PassengerData.findOne({$or: [{PassengerEmailId:req.body.email}]})
    if(data){
        return res
            .status(400)
            .json({
                message : "User with this email already booked ticket !"});
    }
    else{
        try{
            let user = await passenger.save()
            return res
                .status(201)
                .json({
                    message:`Ticket Booked Successfully!`,
                    emailid:user.PassengerEmailId
                })
        }
        catch{
            return res
                .status(400)
                .json({"message":error});
        }
    }
}

//Get Passenger Details By Id
exports.GetPassengerDetailsById = async (id) =>{
    let result = await PassengerData.findOne({$or: [{PassengerId:id}]})
    try{
        return result;
    }
    catch(err){
        return err;
    }
}


// Manage Leg Room 
exports.ManagePassengerLegRoom = async(req,res) =>{
        let pid = req.params.id;
        let result = await PassengerData.findById(pid)
        
        try{
            if(result.AncillaryServices.LegRoom){
                await PassengerData.updateOne({'_id':pid},
                {$set:{"AncillaryServices":{...result.AncillaryServices,"LegRoom":false}}})
                await AncillaryData.updateOne({'_id':'6123dca1bee3b340d0bff0a5'},
                {$pull:{"LegRoom":{$in:[result.PassengerId]}}})
                return res
                .status(200)
                .json({message:"data updated"})
            }
            else{
                await PassengerData.updateOne({'_id':pid},
                {$set:{"AncillaryServices":{...result.AncillaryServices,"LegRoom":true}}})
                await AncillaryData.updateOne({'_id':'6123dca1bee3b340d0bff0a5'},
                {$push:{"LegRoom":{$each:[result.PassengerId]}}})
                return res
                .status(200)
                .json({message:"data updated"})
            }
        }
        catch(err){
            return res
            .status(404)
            .json({message:"something went wrong",err})
        }

}

// Manage Passenger In Flight Shop Request

exports.ManagePassengerInFlightShopRequest = async(req,res) =>{
    let pid = req.params.id;
    let result = await PassengerData.findById(pid)
    
    try{
        if(result.AncillaryServices.InFlightShopRequest){
            await PassengerData.updateOne({'_id':pid},
            {$set:{"AncillaryServices":{...result.AncillaryServices,"InFlightShopRequest":false}}})
            await AncillaryData.updateOne({'_id':'6123dca1bee3b340d0bff0a5'},
            {$pull:{"InFlightShopRequest":{$in:[result.PassengerId]}}})
            return res
            .status(200)
            .json({message:"data updated"})
        }
        else{
            await PassengerData.updateOne({'_id':pid},
            {$set:{"AncillaryServices":{...result.AncillaryServices,"InFlightShopRequest":true}}})
            await AncillaryData.updateOne({'_id':'6123dca1bee3b340d0bff0a5'},
            {$push:{"InFlightShopRequest":{$each:[result.PassengerId]}}})
            return res
            .status(200)
            .json({message:"data updated"})
        }
    }
    catch(err){
        return res
        .status(404)
        .json({message:"something went wrong",err})
    }

}


//Update Passenger Details Successfully

exports.UpdatePassengerDetails = async (req,res) =>{
    const pid = req.params.id;
    
    let response = await PassengerData.findById(pid)
    try{
        const passengerName = req.body.passengerName ? req.body.passengerName : response.PassengerName;
        const passportNumber= req.body.passportNumber ? req.body.passportNumber : response.PassportDetails.PassportNumber;
        const dob = req.body.dob ? req.body.dob : response.PassportDetails.DateOfBirth ;
        const validFrom = req.body.validFrom ? req.body.validFrom : response.PassportDetails.ValidFrom;
        const validTo = req.body.validTo ? req.body.validTo : response.PassportDetails.ValidTo;
        const address = req.body.address ? req.body.address : response.Address
        const passport ={
            "PassportNumber" : passportNumber,
            "DateOfBirth" : dob,
            "ValidFrom" :  validFrom,
            "ValidTo" : validTo
        }
        await PassengerData.updateOne({"_id":pid},{$set:{"PassengerName":passengerName,
        "PassportDetails":passport,"Address":address}})
        return res.status(200).json({message:"updated"});
    }
    catch(err){
        return res.status(404).json({message:error});
    }
    
   
}