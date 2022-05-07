const mongoose = require('mongoose');

const ancillaryservicesschema = new mongoose.Schema({
    ExtraBaggage:{
        type:Array,
        required:true
    },
    OrdinaryMeals:{
        type:Array,
        required:true
    },
    SpecialMeals:{
        type:Array,
        required:true
    },
    LegRoom:{
        type:Array,
        required:true
    },
    InFlightShopRequest:{
        type:Array,
        required:true
    }

})

module.exports = mongoose.model('ancillaryservicesinfo',ancillaryservicesschema);