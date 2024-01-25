const { Twilio } = require("twilio");
require("dotenv").config();

const {sendSocialMedia} = require("./other_methods");
const { Client } = require("discord.js");

/**
 * @param {Twilio} client 
 * @param {Client} dcClient 
 * @param {String} to 
 */
async function displayActivities(client, dcClient, to){

    var imageLink = "";
    var msgContent = "";

    var eventsList = [];

    const channel = await dcClient.channels.fetch(process.env.CURRENT_ACTIVITIES_CHANNEL_ID);
    await channel.messages.fetch().then(async messages => {
        messages.forEach(msg => {
            msgContent = msg.content;
            imageLink = msg.attachments.first() ? msg.attachments.first().attachment : "None";

            eventsList.push({msgContent: msgContent, imageLink: imageLink});
        });

        if(eventsList.length <= 0){
            await client.messages.create({
                body: "Maalesef şu anda devam eden bir etkinlik yok :( Yakında yeni ve benzersiz etkinliklerle karşınıza çıkacağız.",
                from: process.env.SERVICE_SID,
                to: to
            })
        }
        else{
            eventsList.forEach(async event => {

                if(event.msgContent.includes("WhatsApp Chatbot üzerinden başvuru alınır.")){
                    const title = event.msgContent.substring(0,event.msgContent.indexOf("\n"));

                    if(event.imageLink == "None"){
                        await client.messages.create({
                            contentSid: process.env.CURRENT_ACTIVITIES_APPLY_TEMPLATE_SID,
                            contentVariables: JSON.stringify({
                                1: event.msgContent,
                                2: title
                            }),
                            from: process.env.SERVICE_SID,
                            to: to
                        });
                    }
                    else{
                        await client.messages.create({
                            contentSid: process.env.CURRENT_ACTIVITIES_APPLY_TEMPLATE_SID,
                            contentVariables: JSON.stringify({
                                1: event.msgContent,
                                2: title
                            }),
                            mediaUrl: event.imageLink,
                            from: process.env.SERVICE_SID,
                            to: to
                        });
                    }
                }
                else{
                    if(event.imageLink == "None"){
                        await client.messages.create({
                            body: event.msgContent,
                            from: process.env.SERVICE_SID,
                            to: to
                        });
                    }
                    else{
                        await client.messages.create({
                            body: event.msgContent,
                            mediaUrl: event.imageLink,
                            from: process.env.SERVICE_SID,
                            to: to
                        });
                    }
                }
            });
        }
    });

}

module.exports = displayActivities;