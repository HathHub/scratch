/* eslint-disable no-unused-vars */
module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['ping1', 'ping2'],
	guildOnly: true,
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};