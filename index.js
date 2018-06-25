// ToDo: Update config file

'use strict';

const AWS = require('aws-sdk');
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
const config = require('./config.json');

const PHONE_NUMBER_TO_SEND = config.phoneNumberToSend;
const IOT_BTN_NUMBER = config.iotBtnNumber;
const SINGLE_CLICK_MESSAGE = config.singleClickMessage;
const DOUBLE_CLICK_MESSAGE = config.doubleClickMessage;
const LONG_CLICK_MESSAGE = config.longClickMessage;

exports.handler = (event, context, callback) => {

    console.log('Received event:', event);

    const clickType = JSON.stringify(event.clickType);
    const serialN = event.serialNumber;
    const params = {
        PhoneNumber: PHONE_NUMBER_TO_SEND,
        Message: "",
    };

    console.log("clickType is : " + clickType);

    var currentTime = new Date();
    var currentHour = currentTime.getHours();
    var currentMin =  currentTime.getMinutes();
    var currentSec =  currentTime.getSeconds();

    var localHour;
    var absLocalTimeZone;
    var localTimeZone = -4;

    // UTC to local timezone conversion
    if (localTimeZone < 0){
        absLocalTimeZone = localTimeZone * (-1);
        if(currentHour >= 0 && currentHour < absLocalTimeZone){
            localHour = currentHour + localTimeZone +24;
        }
        if(currentHour >= absLocalTimeZone && currentHour < 24){
            localHour = currentHour + localTimeZone;
        }
    }

    else if (localTimeZone > 0){
        if(currentHour >= 0 && currentHour < (24 - localTimeZone)){
            localHour = currentHour + localTimeZone;
        }
        if(currentHour >= (24 - localTimeZone) && currentHour < 24){
            localHour = currentHour + localTimeZone - 24;
        }
    }

    else{
        localHour = currentHour;
    }

    // Convert minutes to 2 digits
    if (currentMin.toString().length == 1) {
        currentMin = "0" + currentMin;
    }

    // Convert seconds to 2 digits
    if (currentSec.toString().length == 1) {
        currentSec = "0" + currentSec;
    }

    // Construct time in proper format
    var currentLocalTime = localHour + ':' + currentMin + ':' + currentSec;

    if(event.clickType == "SINGLE"){
        console.log("Inside single click");
        params.Message = SINGLE_CLICK_MESSAGE + " was at " + currentLocalTime;
    }
    else if(event.clickType == "DOUBLE"){
        console.log("inside double click");
        params.Message = DOUBLE_CLICK_MESSAGE + " was at " + currentLocalTime;
    }
    else if(event.clickType == "LONG"){
        console.log("Inside long click");
        params.Message = LONG_CLICK_MESSAGE + " was at " + currentLocalTime;
    }

    console.log("time is " + currentLocalTime);
    console.log("Message is: " + JSON.stringify(params.message));
    console.log("Sending your SMS to " + PHONE_NUMBER_TO_SEND + " from: " + serialN);

    SNS.publish(params, callback);
};
