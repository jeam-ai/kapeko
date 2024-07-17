const axios = require("axios");

module.exports = {
    config: {
        name: "teach",
        version: "1.0.0",
        hasPermission: 0,
        credits: "jerome",
        description: "Teach Simsimi",
        usages: "Teach",
        commandCategory: "...",
        cooldowns: 0
    },
    onStart: async ({ api, event, args }) => {
    try {
        const text = args.join(" ");
        const text1 = text.substr(0, text.indexOf(' - '));
        const text2 = text.split(" - ").pop();

        if (!text1 || !text2) {
            return api.sendMessage(`Usage: _teach hi - hello`, event.threadID, event.messageID);
        }

        const response = await axios.get(`https://simsimi-api-pro.onrender.com/teach?ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`);

        if (response.data.respond.includes("already exists")) {
            return api.sendMessage(`Sim API has already learned this phrase.`, event.threadID, event.messageID);
        }

        api.sendMessage(`Your ask: ${text1}\nSim respond: ${text2}`, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
}
};