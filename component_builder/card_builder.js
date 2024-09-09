const axios = require('axios');

async function createTwilioCard() {
    const url = 'https://content.twilio.com/v1/Content';
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;

    try {
        // Make the POST request using axios
        const response = await axios.post(url, {
            friendly_name: "badi_social_media_card_09.09.2024",
            language: "tr",
            types: {
                "twilio/card": {
                    title: "Sosyal Medya Hesaplarımızdan da Takipte Kalın! 🆕",
                    subtitle: "",
                    actions: [
                        {
                            url: "https://www.instagram.com/bilkentbadi",
                            title: "Instagram",
                            type: "URL"
                        },
                        {
                            url: "https://chat.whatsapp.com/EFsFXZJcDng4awx2A9hUlQ",
                            title: "WhatsApp",
                            type: "URL"
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

        return response.data;
    } catch (error) {
        console.error('Error creating content template:', error.response ? error.response.data : error.message);
    }
}

module.exports = createTwilioCard;
