const mongoose = require('mongoose');

const passengerschema = new mongoose.Schema({
    PassengerEmailId : {
        type: String,
        required: true
    },
    PassengerId:{
        type:String,
        required:true
    },
    PassengerName:{
        type: String,
        required : true
    },
    PassengerPhoneNumber:{
        type: String,
        required: true
    },
    SeatNumber:{
        type:Number,
        required:true
    },
    FlightId:{
        type:String,
        required:true
    },
    NeededWheelChair:{
        type:Boolean,
        required:true
    },
    PassengerWithInfant:{
        type:Boolean,
        required:true
    },
    AncillaryServices:{
        type:Object,
        required:true
    },
    CheckedIn:{
        type:Boolean,
        required:true
    },
    PassportDetails:{
        type:Object,
        required:true
    },
    Address:{
        type:String,
        required:true
    }
       
})

module.exports = mongoose.model('passengerinfo',passengerschema);