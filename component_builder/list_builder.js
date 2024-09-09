const { Twilio } = require('twilio');

// MONGODB REQUIREMENTS
const mongoDB = require("mongoose");
const Component = require("../mongo_schemas/componentSchema.js");
const {sendSocialMedia} = require("../other_methods");
const { Client, Colors, EmbedBuilder } = require("discord.js");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

/**
 * @param {Twilio} client
 * 
 */
async function createTwilioListPicker(client) {
    try {
        // Define the list picker items
        const options = [
            {
                id: 'general_info',
                item: 'Genel Bilgi🌞',
                description: 'Bizim kim olduğumuzu ve bu süreçte neler amaçladığımızı öğren.'
            },
            {
                id: 'current_activities',
                item: 'Aktif Etkinlikler✨',
                description: 'Devam eden etkinlikleri göreceksin, bunlardan bazılarına başvurabilirsin'
            }
        ];
    

        // Define the list picker body
        const listPickerBody = "Owl Air Flash Sale! Hurry! Sale ends on {{1}}!";

        // Construct the content request object
        const contentCreateRequest = {
            friendlyName: "owl_sale_list",
            language: "en",
            variables: { "1": "end_date" },
            types: {
                twilio_list_picker: {
                    body: listPickerBody,
                    items: options
                }
            }
        };

        // Use the Twilio Content API to create the content template
        const contentTemplate = await twilioClient.content.v1.create(contentCreateRequest);
        console.log(`Created Twilio Content Template SID: ${contentTemplate.sid}`);
    } catch (error) {
        console.error("Error creating content template:", error);
    }
}

// Export the function for use in other parts of your application
module.exports = createTwilioListPicker;