const { Twilio } = require("twilio");

// MONGODB REQUIREMENTS
const mongoDB = require("mongoose");
const User = require("./userSchema.js");
const {sendSocialMedia} = require("./other_methods");

/**
 * 
 * @param {Twilio} client 
 * @param {String} id
 * @param {String} to 
 * @param {String} username 
 */
async function addApplication(client, id, to, username){
    try {

        // etkinlik adı
        const eventName = id.split('_')[2];

        // başvuran kullanıcı bilgileri
        const appliedUser = await User.find({phone_number: to, event_name: eventName});

        if(!appliedUser.length){
            await User.updateOne({phone_number: to, event_name: eventName}, {phone_number: to, name: username, event_name: eventName}, {upsert: true});
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
        await sendSocialMedia(to);
    } catch (error) {
        console.log("Error occured in contact us stage: " + error);
    }
    
};

module.exports = addApplication;