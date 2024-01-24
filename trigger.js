// DISCORDJS REQUIREMENTS

require("dotenv").config();

const channelID = "1199343996997222420";

const discord = require("discord.js");
const {Client, IntentsBitField , EmbedBuilder, ButtonBuilder, ButtonStyle} = discord;
const dcClient = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.MessageContent
    ]
});

const embed = new EmbedBuilder()
    .setAuthor({name: "Bilkent Afet Kulübü", iconURL:"https://media.licdn.com/dms/image/D4D03AQH3RGBG4r1gQA/profile-displayphoto-shrink_800_800/0/1692713353317?e=2147483647&v=beta&t=e3jvsy-vfPDHz52zoY2AKw-ZRbBAJh5eV2MWEfYrZlk"})
    .setTitle("Genel Bilgi")
    .setColor(discord.Colors.Aqua)
    .setDescription("Bilkent Afet Kulübü genel bilgisi aşağıda yer almaktadır.")
    .addFields(
        {name: "Paragraf 1", value: "6 Şubat'ta meydana gelen ve kırk binden fazla vatandaşımızın ölmesine sebep olan depremler sırasında bireysel olarak, sonrasındaysa grup olarak bu süreçte yaşanan ve pek çoğu insanımızın hayatını, yakınlarını, yaşadığı evleri ve şehirleri kaybettiği bu süreci hafifletebilmek adına gerekirse sadece bir taşı bile beraber kaldırabilmiş olmak için Bilkent Afet Kulübü'nü kurmuş bulunuyoruz. Yapmayı hedeflediğimiz birçok şey var. Bunlardan bazıları ilk yardım eğitimleri ve arama kurtarma ekibi kurabilmek için sağlanması gereken çeşitli eğitimleri kapsıyor. Afet alanında farkındalığı arttırmak adına afet ile ilgili makaleler, haberler, röportajlar, söyleşiler vb. birçok anlatıyı postlarımızla ve ilerleyen süreçlerde farklı platformlarda paylaşmayı planlıyoruz."},
        {name: "Paragraf 2", value: "İçerisinde Başkent, Boğaziçi, Ufuk gibi üniversitelerin olduğu bir afet ağı kurarak zorlu durumlarda daha koordine bir şekilde ilerlemeyi umuyoruz. Aynı şekilde, yaşanan afetlerdeki sorunlarla başa çıkabilmek adına teknolojik çözümler geliştirmek ve bunun için Hackathon ve zirve gibi etkinlikler düzenlemeyi de istiyoruz. Bütün bunlar ve daha sayamadıklarımız, esasında yaşadığımız ağır süreci bir nebze de olsa hafifletebilmek içindir. Çok zorlu ve hepimizi sarsan süreçlerden geçtik, bu süreçlerin tekrarlanmamasını temenni ediyor; doğrudan veya dolaylı bu süreçte etkilenen herkesin acısını paylaşıyoruz. Eğer ki siz de yapmayı planladığımız bu projelerde bizimle beraber olmak istiyorsanız, 9 Ağustos'ta hepinizi standımıza bekliyor olacağız. Daha güzel günlerde görüşmek üzere. Takipte kalın :)"}
    )
    .setTimestamp();

const addButton = new ButtonBuilder()
    .setCustomId("add_paragraph")
    .setLabel("Add")
    .setStyle(ButtonStyle.Success)

dcClient.login(process.env.TOKEN).then(() => {
    dcClient.channels.fetch(channelID).then((channel) => {
        channel.send({embeds: [embed]});
    });
});
