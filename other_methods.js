const { Twilio } = require("twilio");
require("dotenv").config();

const createTwilioCard = require("./component_builder/card_builder.js");

/**
 * @param {String} to 
 * @param {Twilio} client
 */
async function sendSocialMedia(client, to){

    /**
     * TESTING NEW CARDS
     * 
     * const response = await createTwilioCard();
    const sid = response.sid;

    console.log(sid);
     */

    const sid = process.env.SOCIAL_MEDIA_CONTENT;

    try {
        await client.messages.create({
            contentSid: sid,
            from: process.env.SERVICE_SID,
            to: to
        });
    } catch (error) {
        console.log("Error occured in contact us stage: " + error);
    }
}

module.exports = {sendSocialMedia};