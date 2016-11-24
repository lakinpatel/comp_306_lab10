'use strict'

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require("@slack/client").CLIENT_EVENTS;

function handleOnAuthenticated(rtmStartData){
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to channel`);
}

function addAuthenticatedHandler(rtm, handler){
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module .exports.init = function slackClient(token, loglevel){
    const rtm = new RtmClient(token , loglevel);
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;