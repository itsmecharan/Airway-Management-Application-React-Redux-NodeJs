const mongoose = require('mongoose');

const flightschema = new mongoose.Schema({
       
    FlightName:{
        type: String,
        required : true
    },
    SeatNumbers:{
        type:Array,
        required:true
    },
    FlightId:{
        type:String,
        required:true
       
    },
    FlightTiming:{
        type:String,
        required:true
    },
    WheelChairedPassengers:{
        type:Object,
        required:true
    },
    PassengersWithInfant:{
        type:Object,
        required:true
    },
    CheckedInPassengers:{
        type:Object,
        required:true
    },
    PassengersOptedSpecialMeals:{
        type:Object
    },
    From:{
        type:String,
        required:true
    },
    To:{
        type:String,
        required:true
    },
    TotalPassengers:{
        type:Object,
        required:true
    },
    FlightAncillaryServices:{
        type:Object,
        required:true
    },
    ShoppingItems:{
        type:String,
        required:true
    }

       
})

module.exports = mongoose.model('flightinfo',flightschema);