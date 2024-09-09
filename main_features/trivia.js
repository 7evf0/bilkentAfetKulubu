const { Twilio } = require("twilio");
require("dotenv").config();

const {firstAidScenarioOptions, firstAidScenarioTitles, firstAidScenarios} = require("../trivia/constants.js");

/**
 * @param {Twilio} client 
 * @param {String} to 
 */
async function displayTrivia(client, to){

    const questionCount = firstAidScenarioOptions.length;
    const questionNumber = Math.floor(Math.random() * questionCount);

    const questionOptions = firstAidScenarioOptions[questionNumber];

    const msg = `Senaryo ${questionNumber + 1} ❓\n\n${firstAidScenarioTitles[questionNumber]}\n\n${firstAidScenarios[questionNumber]}\n\nSoru numarasını stanttakilerle paylaşırsan onlar yardımcı olurlar ⛑️`;
    const options = `Bu senaryoda ne yapmak daha doğru??\n\n${questionOptions[0]}\n${questionOptions[1]}\n${questionOptions[2]}\n${questionOptions[3]}\n`;

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

module.exports = displayTrivia;