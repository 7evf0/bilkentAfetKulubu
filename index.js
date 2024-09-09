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
dcClient.login(process.env.TOKEN).then(() => {
    console.log("Discord Logged In");
});

// MONGODB REQUIREMENTS
const mongoDB = require("mongoose");

// WHATSAPP API REQUIREMENTS
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// OTHER REQUIREMENTS
const prompt = require('prompt-sync')();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const fs = require("fs");
const readline = require("readline");

// LOCAL REQUIREMENTS
const generalInfo = require("./main_features/general_info.js")
const displayActivities = require("./main_features/current_activities.js")
const addApplication = require("./main_features/addApplication.js");
const {displayTrivia, revealAnswer} = require("./main_features/trivia.js")

const createListPicker = require("./component_builder/list_builder.js");

// MAIN FUNCTION

async function main(){

    try {
        await mongoDB.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@bak.3nqk8ik.mongodb.net/`);
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

App.listen(3001, () => {
    console.log("Heyyy, it is listened");
});

//  MAIN RESPOND PROGRAM

async function respond(req){

    // DEFAULT VARIABLES
    const msg = req.Body;
    const username = req.ProfileName;
    const userPhone = req.From;
    const mediaType = req.MediaContentType0;
    const id = req.ButtonPayload;

    // LIST VARIABLES
    const listID = req.ListId;

    // CONTACT US VARIABLES
    const repliedMsgSID = req.OriginalRepliedMessageSid;
    const messageSID = req.MessageSid;

    if(msg === "Send"){
        const numberList = ["whatsapp:+905385470234", "whatsapp:+905538050602", "whatsapp:+905335643559"];

        numberList.forEach(async number => {
            client.messages.create({
                contentSid: "HXb1e9386342a6aaf3e780b463a41a8136",
                contentVariables: JSON.stringify({
                    1: "Elif, Habibe ya da Eren",
                    2: "Şimdi sizden isteğim: Eğer bu mesajı aldıysanız bana (Tevfik'e) geri dönün hani mesaj geldi diye belirtmek için ok? Thx ;)"
                }),
                from: process.env.SERVICE_SID,
                to: number
            }).then(() => {
                console.log("Message succesfully sent to " + number);
            });
        });
    }

    // initial greeting
    if(msg === "Hey" || msg === "hey"){
        await sendMainMultipleChoice(userPhone, username);
    }

    //  LIST CHOICES

    // current activities

    if(listID === "general_info"){
        generalInfo(client, dcClient, userPhone);
    }

    if(listID === "trivia"){
        displayTrivia(client, userPhone);
    }

    if(listID === "current_activities"){
        displayActivities(client, dcClient, userPhone);
    }

    // contact us
    if(listID === "contact_us"){
        sendContactMsg(userPhone);
    }

    // trivia options
    if(listID && listID.startsWith('option_')){
        const message = await client.messages(repliedMsgSID).fetch();
        const questionContext = message.body;

        revealAnswer(client, userPhone, questionContext, listID);
    }

    // ilk yardım başvuru
    if(id && id.startsWith("bak_apply_")){
        addApplication(client, dcClient, id, userPhone, username);
    }
};

// SUBPROGRAMS

/* async function addApplication(to, username){
    try {
        const appliedUser = await User.find({phone_number: to});

        if(!appliedUser.length){
            await User.updateOne({phone_number: to}, {phone_number: to, name: username}, {upsert: true});
            await client.messages.create({
                body: "Başvurunuz başarıyla tamamlandı. En yakın vakitte size detaylarla dönüş sağlayacağız. İyi günler dileriz :)",
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
    
}; */

/* async function generalInfo(to){
    try {
        await client.messages.create({
            body: "6 Şubat'ta meydana gelen ve kırk binden fazla vatandaşımızın ölmesine sebep olan depremler sırasında bireysel olarak, sonrasındaysa grup olarak bu süreçte yaşanan ve pek çoğu insanımızın hayatını, yakınlarını, yaşadığı evleri ve şehirleri kaybettiği bu süreci hafifletebilmek adına gerekirse sadece bir taşı bile beraber kaldırabilmiş olmak için Bilkent Afet Kulübü'nü kurmuş bulunuyoruz. Yapmayı hedeflediğimiz birçok şey var. Bunlardan bazıları ilk yardım eğitimleri ve arama kurtarma ekibi kurabilmek için sağlanması gereken çeşitli eğitimleri kapsıyor. Afet alanında farkındalığı arttırmak adına afet ile ilgili makaleler, haberler, röportajlar, söyleşiler vb. birçok anlatıyı postlarımızla ve ilerleyen süreçlerde farklı platformlarda paylaşmayı planlıyoruz.",
            from: process.env.SERVICE_SID,
            to: to
        });
        await client.messages.create({
            body: "İçerisinde Başkent, Boğaziçi, Ufuk gibi üniversitelerin olduğu bir afet ağı kurarak zorlu durumlarda daha koordine bir şekilde ilerlemeyi umuyoruz. Aynı şekilde, yaşanan afetlerdeki sorunlarla başa çıkabilmek adına teknolojik çözümler geliştirmek ve bunun için Hackathon ve zirve gibi etkinlikler düzenlemeyi de istiyoruz. Bütün bunlar ve daha sayamadıklarımız, esasında yaşadığımız ağır süreci bir nebze de olsa hafifletebilmek içindir. Çok zorlu ve hepimizi sarsan süreçlerden geçtik, bu süreçlerin tekrarlanmamasını temenni ediyor; doğrudan veya dolaylı bu süreçte etkilenen herkesin acısını paylaşıyoruz. Eğer ki siz de yapmayı planladığımız bu projelerde bizimle beraber olmak istiyorsanız, 9 Ağustos'ta hepinizi standımıza bekliyor olacağız. Daha güzel günlerde görüşmek üzere. Takipte kalın :)",
            from: process.env.SERVICE_SID,
            to: to
        });
        await sendSocialMedia(to);
    } catch (error) {
        console.log("Error occured in contact us stage: " + error);
    }
} */

async function sendContactMsg(to){

    /* try {
        const msg = await client.messages.create({
            body: "You have chosen to contact with us :) When you want to write, make sure that your writing is in one message and you have to reply that message to THIS message, so we can know this writing is for you contacting to us! We would like to hear from you and respond you back as soon as possible.",
            from: process.env.SERVICE_SID,
            to: to
        });

        await User.updateOne({phone_number: to}, {phone_number: to, last_contact_msg_sid: msg.sid}, {upsert: true});
    } catch (error) {
        console.log("Error occured in contact us stage: " + error);
    } */

    try {
        await client.messages.create({
            body: "Chatbotumuzun bu kısmı an itibariyle yapım aşamasındadır. Mesajlarınızı bize iletebilmeniz için en yakın vakitte bu kısmı tamamlamak için çalışıyoruz :)",
            from: process.env.SERVICE_SID,
            to: to
        });
        await sendSocialMedia(to);
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

/* async function displayActivities(to){

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
} */

async function sendMainMultipleChoice(to, profileName){

    /* TESTING NEW LIST
    const response = await createListPicker(); 
    const sid = response.sid;

    console.log(sid);*/


    const sid = process.env.MAIN_MULTIPLE_CHOICE;

    await client.messages.create({
                from: process.env.SERVICE_SID,
                to: to,
                contentSid: sid,
                contentVariables: JSON.stringify({
                    1: profileName
                })
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
