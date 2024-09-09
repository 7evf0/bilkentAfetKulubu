const { Twilio } = require("twilio");
require("dotenv").config();

const {firstAidScenarioOptions, firstAidScenarioTitles, firstAidScenarios, correctOptions} = require("../trivia/constants.js");
const {sendSocialMedia} = require("../other_methods.js")


/**
 * @param {Twilio} client 
 * @param {String} to 
 */
async function displayTrivia(client, to){

    const questionCount = firstAidScenarioOptions.length;
    const questionNumber = Math.floor(Math.random() * questionCount);

    const questionOptions = firstAidScenarioOptions[questionNumber];

    const msg = `Senaryo ${questionNumber + 1} ❓\n\n${firstAidScenarioTitles[questionNumber]}\n\n${firstAidScenarios[questionNumber]}\n\nSoru numarasını stanttakilerle paylaşırsan onlar yardımcı olurlar ⛑️`;
    const options = `Senaryo ${questionNumber + 1} - Ne yapmak daha doğru🤔\n\n${questionOptions[0]}\n\n${questionOptions[1]}\n\n${questionOptions[2]}\n\n${questionOptions[3]}\n`;

    try {
        await client.messages.create({
            body: msg,
            from: process.env.SERVICE_SID,
            to: to
        });

        await client.messages.create({
            contentSid: process.env.TRIVIA_OPTIONS,
            contentVariables: JSON.stringify({
                1: options
            }),
            from: process.env.SERVICE_SID,
            to: to
        })
    } catch (error) {
        console.log("Error occured in contact us stage: " + error);
    }

}

function extractScenarioNumber(inputString) {
    // Use a regular expression to match the number after the word "Senaryo"
    const regex = /Senaryo\s(\d+)/;
    const match = inputString.match(regex);
    
    // If there's a match, return the number (first capturing group), otherwise return null
    return match ? parseInt(match[1]) : null;
}

/**
 * @param {Twilio} client 
 * @param {String} to 
 */
async function revealAnswer(client, to, message, answer){

    const scenarioNum = extractScenarioNumber(message) - 1;
    var msgBody = "";

    // answer is correct
    if(answer === correctOptions[scenarioNum]){
        msgBody = "Doğru cevap!! 🎉 Tebrikler! 😇 Şimdi ödülün için çarkı çevirme zamanı...";
    }
    else{
        msgBody = `Maalesef yanlış cevabı işaretledin 😢 Doğru cevap ${correctOptions[scenarioNum][answer.length-1]} şıkkıydı. Bir sonraki sefere doğru yapacağından eminim 😉`;
    }

    try {
        await client.messages.create({
            body: msgBody,
            from: process.env.SERVICE_SID,
            to: to
        });
        await sendSocialMedia(client, to);
    } catch (error) {
        console.log("Error occured in trivia stage: " + error);
    }

}

module.exports = {displayTrivia, revealAnswer};