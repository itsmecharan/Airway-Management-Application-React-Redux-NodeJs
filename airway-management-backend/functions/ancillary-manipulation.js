const express = require('express');
const AncillaryData = require('../models/AncillaryServices.js');

//Add Ancillary Services

exports.AncillaryServices = async (req,res) =>{
    let data = new AncillaryData({
        ExtraBaggage : [],
        OrdinaryMeals:[],
        SpecialMeals:[],
        LegRoom:[],
        InFlightShopRequest:[]
    })
    
    try{
        await data.save()
        console.log('saved')
    }
    catch(err){
        console.log(err);
    }
}

