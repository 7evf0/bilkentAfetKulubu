require("dotenv").config();

// DISCORDJS REQUIREMENTS

const discord = require("discord.js");
const {Client, IntentsBitField ,EmbedBuilder} = discord;
const dcClient = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.MessageContent
    ]
});
dcClient.login(process.env.TOKEN);

// WHATSAPP API REQUIREMENTS
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// MONGODB REQUIREMENTS
const mongoDB = require("mongoose");
const User = require("./userSchema.js");

// OTHER REQUIREMENTS
const prompt = require('prompt-sync')();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const fs = require("fs");
const readline = require("readline");

//const returnMail = require("./emailTemplate.js");
//const returnAcceptHTML = require("./acceptHTML.js");

// MAIN FUNCTION

async function main(){

    try {
        await mongoDB.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@bakdatabase.md3x43z.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log("Could not connect to MongoDB: " + error);
    }

};

/**
 * @param {MongoClient} client 
 */
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);

//  REST API
const App = express();

App.use(cors({
    origin: process.env.CURRENT_HOST
}));

App.get("/", (req, res) => {
    console.log("You have entered");
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

App.post("/whatsapp", urlencodedParser , async (req, res) => {
    await respond(req.body);
});

/* App.get("/accept", urlencodedParser, async (req, res) => {
    console.log("It is accepted!");
    await sendMessage("Your schedule is confirmed, and you are officially entered the program! Congratulations!", req.query.phone);
    res.send("It is accepted!");
});

App.get("/reject", urlencodedParser, async (req, res) => {
    console.log("It is rejected!");
    await sendMessage("Your schedule is denied, you should send another image to enter the program.", req.query.phone);
    res.send("It is rejected!");
}) */

App.listen(3000, () => {
    console.log("Heyyy, it is listened");
});

//  MAIN RESPOND PROGRAM

async function respond(req){

    // DEFAULT VARIABLES
    const msg = req.Body;
    const username = req.ProfileName;
    const userPhone = req.From;
    const mediaType = req.MediaContentType0;

    // LIST VARIABLES
    const listID = req.ListId;
    console.log(req);

    // CONTACT US VARIABLES
    const repliedMsgSID = req.OriginalRepliedMessageSid;
    const messageSID = req.MessageSid;

    // initial greeting
    if(msg === "Hey" || msg === "hey"){
        await sendMainMultipleChoice(userPhone, username);
    }

    //  LIST CHOICES

    // current activities
    if(listID === "current_activities"){
        displayActivities(userPhone);
    }

    // contact us
    if(listID === "contact_us"){
        sendContactMsg(userPhone);
    }

    // contact us reply
    if(repliedMsgSID){
        completedContactMsg(userPhone, repliedMsgSID, msg);
    }
};

// SUBPROGRAMS

async function sendContactMsg(to){

    try {
        const msg = await client.messages.create({
            body: "You have chosen to contact with us :) When you want to write, make sure that your writing is in one message and you have to reply that message to THIS message, so we can know this writing is for you contacting to us! We would like to hear from you and respond you back as soon as possible.",
            from: process.env.SERVICE_SID,
            to: to
        });

        await User.updateOne({phone_number: to}, {phone_number: to, last_contact_msg_sid: msg.sid}, {upsert: true});
    } catch (error) {
        console.log("Error occured in contact us stage: " + error);
    }
    
}

async function completedContactMsg(to, repliedMsgSID, msg){
    try {
        const verified = await User.findOne({last_contact_msg_sid: repliedMsgSID, phone_number: to});
        if(verified){
            console.log(msg);

            const date = verified.last_msg_send;
            if(date && (Date.now() - date) / 1000 < 300){
                await client.messages.create({
                    body: "Maalesef mesajınız bile iletilemedi. Bizlere bir daha yazabilmeniz için bir önceki mesajınız ile bu mesajınız arasında 5 dakika olması gerekiyor. Birazdan tekrar deneyebilirsiniz :)",
                    from: process.env.SERVICE_SID,
                    to: to
                });
            }
            else{
                await client.messages.create({
                    body: "Mesajınız için çok teşekkürler. Size en yakın zamanda bu numaradan dönüş sağlayacağız. İyi günler dileriz :)",
                    from: process.env.SERVICE_SID,
                    to: to
                });

                await User.updateOne({phone_number: to}, {last_msg_send: Date.now()});
            }
            
        }
    } catch (error) {
        console.log("Error occured in contact us stage: " + error);
    }
};  

async function displayActivities(to){

    var isAny = false;

    const fileStream = fs.createReadStream("currentActivities.txt");
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    rl.on("line", async (sid) => {
        console.log("Entered");
        isAny = true;
        await client.messages
            .create({
                contentSid: sid,
                from: process.env.SERVICE_SID,
                to: to
            });
    });

    rl.on("close", async () => {
        if(!isAny){
            await client.messages.create({
                body: "Unfortunately there is no ongoing activity for now :( We will be coming with new and unique activities shortly.",
                from: process.env.SERVICE_SID,
                to: to
            })
        }
    });
}

async function sendMainMultipleChoice(to, profileName){
    await client.messages
            .create({
                contentSid: "HX0755339f90923c5ff085c83addb0dd36",
                from: process.env.SERVICE_SID,
                contentVariables: JSON.stringify({
                    1: profileName
                }),
                to: to,
            });
}

async function sendDiscord(username, text=username, image=null){

    const channel = dcClient.channels.cache.get(process.env.CHANNEL_ID);
    const embed = new EmbedBuilder()
        .setTitle(`Schedule of ${username}`)
        .setAuthor({name: username})
        .setDescription(text)
        .setImage(image);

    await channel.send({
        embeds: [embed]
    });
};

async function sendEmail(username, text=username, image=null, userPhone){
    var socket = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    var email = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `${username} : AUTHENTICATION MAIL ON SCHEDULE CONFIGURATION`,
        html: returnMail(text, image, process.env.CURRENT_HOST, userPhone)
    };

    socket.sendMail(email, (err, info) => {
        if(!err){
            console.log("Email sent succesfully!");
        }
        else{
            console.error(err);
        }
    });
};
