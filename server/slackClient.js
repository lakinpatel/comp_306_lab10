'use strict'

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require("@slack/client").CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;

function handleOnAuthenticated(rtmStartData){
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to channel`);
}

function handleOnMessage(message){
    console.log(message);

    rtm.sendMessage('this is a test message', message.channel, function messageSent(){
        // optional callback function that executes when message has been sent
    });
}

function addAuthenticatedHandler(rtm, handler){
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module .exports.init = function slackClient(token, loglevel){
    const rtm = new RtmClient(token , loglevel);
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;