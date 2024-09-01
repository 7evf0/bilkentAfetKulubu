const { Twilio } = require("twilio");

// MONGODB REQUIREMENTS
const mongoDB = require("mongoose");
const User = require("../userSchema.js");
const {sendSocialMedia} = require("../other_methods");
const { Client, Colors, EmbedBuilder } = require("discord.js");

/**
 * 
 * @param {Twilio} client 
 * @param {String} id
 * @param {String} to 
 * @param {String} username 
 */
async function addApplication(client, dcClient, id, to, username){
    try {

        // etkinlik adı
        const eventName = id.split('_')[2];

        // başvuran kullanıcı bilgileri
        const appliedUser = await User.find({phone_number: to, event_name: eventName});

        if(!appliedUser.length){
            await User.updateOne({phone_number: to, event_name: eventName}, {phone_number: to, name: username, event_name: eventName}, {upsert: true});

            await updateApplicationsOnDiscord(dcClient, eventName, username, to);

            await client.messages.create({
                body: "*" + eventName + "* etkinliğine başvurunuz başarıyla tamamlandı. En yakın vakitte size detaylarla dönüş sağlayacağız. İyi günler dileriz :)",
                from: process.env.SERVICE_SID,
                to: to
            });
        }
        else{
            await client.messages.create({
                body: "Bu etkinliğe başvurmuş gözükmektesiniz. İlginiz için tekrardan teşekkürler :)",
                from: process.env.SERVICE_SID,
                to: to
            });
        }
        await sendSocialMedia(client, to);
    } catch (error) {
        console.log("Error occured in contact us stage: " + error);
    }
    
};

/**
 * 
 * @param {Client} dcClient 
 */
async function updateApplicationsOnDiscord(dcClient, eventName, username, to){
    const appliedUsers = await User.find({event_name: eventName});
    var totalList = "";

    appliedUsers.forEach(user => {
        totalList += user.name + " - " + user.phone_number + "\n";
    });

    // if embed message is valid
    dcClient.channels.fetch(process.env.APPLICATIONS_CHANNEL_ID).then((channel) => {
        channel.messages.fetch().then(async messages => {
            var isValid = false;

            messages.forEach(msg => {

                const currEmbed = msg.embeds[0];
                const currEventName = currEmbed.title;
                if(currEventName == eventName){
                    const updatedEmbed = new EmbedBuilder()
                        .setAuthor({name: "Bilkent Afet Kulübü", iconURL:"https://media.licdn.com/dms/image/D4D03AQH3RGBG4r1gQA/profile-displayphoto-shrink_800_800/0/1692713353317?e=2147483647&v=beta&t=e3jvsy-vfPDHz52zoY2AKw-ZRbBAJh5eV2MWEfYrZlk"})
                        .setTitle(eventName)
                        .setColor(Colors.Red)
                        .addFields({
                            name: "Başvuranlar",
                            value: totalList
                        })
                        .setTimestamp();
                    msg.edit({embeds: [updatedEmbed]});
                    isValid = true;
                }
            });

            if(!isValid){

                const embed = new EmbedBuilder()
                    .setAuthor({name: "Bilkent Afet Kulübü", iconURL:"https://media.licdn.com/dms/image/D4D03AQH3RGBG4r1gQA/profile-displayphoto-shrink_800_800/0/1692713353317?e=2147483647&v=beta&t=e3jvsy-vfPDHz52zoY2AKw-ZRbBAJh5eV2MWEfYrZlk"})
                    .setTitle(eventName)
                    .setColor(Colors.Red)
                    .addFields({
                        name: "Başvuranlar",
                        value: totalList
                    })
                    .setTimestamp(); 

                await channel.send({embeds: [embed]});
            }
        })
    });
};

module.exports = addApplication;