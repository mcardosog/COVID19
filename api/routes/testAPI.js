var express = require("express");
var router = express.Router();


const dialogflow = require('dialogflow');

const uuid = require('uuid');

async function getIntent(transcript) {
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: process.cwd() + "/keys/covid19-fffupn-3eaabab88a23.json",   // el location de tu json file
    });
    const projectId = "covid19-fffupn";   // el nombre de tu proyecto
    const sessionId = uuid.v4();  //esto te da un random session id number
    const languageCode = "en";
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: transcript,
                languageCode: 'en',
            },
        },
    };
    console.log(request);
    const responses = await sessionClient.detectIntent(request);
    return responses;
}

router.get("/:transcript", function(req, res, next) {
    getIntent(req.params.transcript).then((responseIntent) =>{
        if(responseIntent != null && responseIntent.length > 0) {
            const queryResults = responseIntent[0].queryResult.fulfillmentMessages;
            var response = '';
            for(var i=0; i < queryResults.length; i++) {
                response = response+' '+queryResults[i].text.text[0];
            }
            res.send(response);
        }
        else {
            res.send("Unable to connect with the server. Please check the app settings");
        }
    });
});

module.exports = router;