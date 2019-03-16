let Discord = require("discord.js");
let bot = new Discord.Client();
let axios = require("axios");


const required = {
    prefix: "%",
    API: "https://yesno.wtf/api",
    embedColor: {
        yes: "#66bb6a",
        no: "#ef5350",
        maybe: "#26c6da"
    },
    answers: {
        yes: "The 8Ball feels positive about this. ✅",
        no: "The 8Ball feels negative about this. 🚫",
        maybe: "The 8Ball doesn't know how to feel about this. 🤷"
    },
    token: "NTU2NTg2NDUxODUzMjQ2NDcx.D275lg.9rwXmhHdHtJfJ6kvjA6llbDw9kA"
};

const { prefix, token, API, embedColor, answers } = required;

bot.login(token);

bot.on("ready", () => { console.log("Ready to predict your future!"); });

bot.on("message", (message) => {
    if (message.content.startsWith(`${prefix} `)) {
        const question = message.content.substr(prefix.length + 1);

        let embedError = new Discord.RichEmbed()
            .setFooter(`Sorry, ${message.author.tag}`)
            .setTimestamp()
            .setDescription("An error occurred while predicting your future!");

        axios.get(API)
            .then((r) => {
                let embedResponse = new Discord.RichEmbed()
                    .setFooter(`${question} (${message.author.tag})`)
                    .setTimestamp()
                    .setImage(r.data.image);

                switch (r.data.answer) {
                    default: 
                        message.channel.send({embed: embedError});
                        break;
                    case "yes":
                        embedResponse.setColor(embedColor.yes);
                        embedResponse.setTitle(answers.yes);
                        message.channel.send({ embed: embedResponse });
                        break;
                    case "no":
                        embedResponse.setColor(embedColor.no);
                        embedResponse.setTitle(answers.no);
                        message.channel.send({ embed: embedResponse });
                        break;
                    case "maybe":
                        embedResponse.setColor(embedColor.maybe);
                        embedResponse.setTitle(answers.maybe);
                        message.channel.send({ embed: embedResponse });
                        break;
                }
            })
            .catch((o_O) => {
                console.log(o_O);
                message.channel.send({ embed: embedError })
            });
        bot.user.setActivity('Rexor's Discord')
    }
});
