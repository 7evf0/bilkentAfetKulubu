const { Twilio } = require("twilio");
require("dotenv").config();

const {sendSocialMedia} = require("../other_methods");
const { Client } = require("discord.js");

/**
 * @param {String} to
 * @param {Twilio} client
 * @param {Client} dcClient
 */
async function generalInfo(client, dcClient, to){

    const channel = await dcClient.channels.fetch(process.env.GENERAL_INFO_CHANNEL_ID);
    const mainMessageID = await channel.lastMessageId;
    const mainMessage = await channel.messages.fetch(mainMessageID);
    const mainMessageContent = mainMessage.content;

    try {
        await client.messages.create({
            body: mainMessageContent,
            from: process.env.SERVICE_SID,
            to: to
        });
       /*  await client.messages.create({
            body: "İçerisinde Başkent, Boğaziçi, Ufuk gibi üniversitelerin olduğu bir afet ağı kurarak zorlu durumlarda daha koordine bir şekilde ilerlemeyi umuyoruz. Aynı şekilde, yaşanan afetlerdeki sorunlarla başa çıkabilmek adına teknolojik çözümler geliştirmek ve bunun için Hackathon ve zirve gibi etkinlikler düzenlemeyi de istiyoruz. Bütün bunlar ve daha sayamadıklarımız, esasında yaşadığımız ağır süreci bir nebze de olsa hafifletebilmek içindir. Çok zorlu ve hepimizi sarsan süreçlerden geçtik, bu süreçlerin tekrarlanmamasını temenni ediyor; doğrudan veya dolaylı bu süreçte etkilenen herkesin acısını paylaşıyoruz. Eğer ki siz de yapmayı planladığımız bu projelerde bizimle beraber olmak istiyorsanız, 9 Ağustos'ta hepinizi standımıza bekliyor olacağız. Daha güzel günlerde görüşmek üzere. Takipte kalın :)",
            from: process.env.SERVICE_SID,
            to: to
        }); */
        await sendSocialMedia(client, to);
    } catch (error) {
        console.log("Error occured in contact us stage: " + error);
    }

}

module.exports = generalInfo