const { Twilio } = require("twilio");
require("dotenv").config();


/**
 * @param {String} to 
 * @param {Twilio} client
 */
async function sendSocialMedia(client, to){
    try {
        await client.messages.create({
            body: "Instagram: https://instagram.com/bilkentafetkulubu?igshid=MzRlODBiNWFlZA==\nLinkedIn: https://www.linkedin.com/in/bilkent-afet-kul%C3%BCb%C3%BC-2a19a2289",
            from: process.env.SERVICE_SID,
            to: to
        });
    } catch (error) {
        console.log("Error occured in contact us stage: " + error);
    }
}

module.exports = {sendSocialMedia};