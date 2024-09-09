const { Twilio } = require('twilio');

// MONGODB REQUIREMENTS
const mongoDB = require("mongoose");
const Component = require("../mongo_schemas/componentSchema.js");
const {sendSocialMedia} = require("../other_methods");
const { Client, Colors, EmbedBuilder } = require("discord.js");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const axios = require('axios');

async function createTwilioListPicker() {
    const url = 'https://content.twilio.com/v1/Content';
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    try {
        // Make the POST request
        const response = await axios.post(url, {
            friendly_name: "owl_air_list",
            language: "en",
            variables: {
                "1": "end_date"
            },
            types: {
                "twilio/list-picker": {
                    body: "Owl Air Flash Sale! Hurry! Sale ends on {{1}}!",
                    button: "Select a destination",
                    items: [
                        {
                            item: "SFO to NYC for $299",
                            description: "Owl Air Flight 1337 to LGA",
                            id: "SFO1337"
                        },
                        {
                            item: "OAK to Denver for $149",
                            description: "Owl Air Flight 5280 to DEN",
                            id: "OAK5280"
                        },
                        {
                            item: "LAX to Chicago for $199",
                            description: "Owl Air Flight 96 to ORD",
                            id: "LAX96"
                        }
                    ]
                },
                "twilio/text": {
                    body: "We have flights to the following destinations: (1) SFO, (2) OAK, (3) LAX. Hurry! Sale ends on {{1}}!"
                }
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: accountSid,
                password: authToken
            }
        });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error creating content template:', error.response ? error.response.data : error.message);
    }
}

module.exports = createTwilioListPicker;