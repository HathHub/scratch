/* eslint-disable no-unused-vars */
module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['ping1', 'ping2'],
	guildOnly: true,
	cooldown: 5,
	multiLanguage: true,
	execute(message, args, language) {
		message.channel.send(language.commands.ping.yes);
	},
};
