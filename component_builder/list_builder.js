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
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;

    try {
        // Make the POST request
        const response = await axios.post(url, {
            friendly_name: "badi_main_list_09.09.2024",
            language: "tr",
            variables: {
                "1": "isim"
            },
            types: {
                "twilio/list-picker": {
                    body: "Merhaba {{1}}!\n\n Bilkent Acil Durum ve İlk Yardım'a, yani kısaca BADİ'ye hoşgeldin!!\n\n Sana nasıl yardımcı olabilirim?",
                    button: "Seçenekler",
                    items: [
                        {
                            item: "Genel Bilgi🌞",
                            id: "general_info",
                            description: "Bizim kim olduğumuzu ve bu süreçte neler amaçladığımızı öğren."
                        },
                        {
                            item: "Aktif Etkinlikler✨",
                            description: "Devam eden etkinlikleri göreceksin, bunlardan bazılarına başvurabilirsin",
                            id: "current_activities"
                        }
                    ]
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