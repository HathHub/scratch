/* eslint-disable no-unused-vars */
module.exports = {
	name: 'play',
	description: 'Pone una canción.',
	aliases: ['p'],
	guildOnly: true,
	cooldown: 5,
	args: true,
	usage: '<canción> / <url>',
	voiceOnly: true,
	async execute(message, args) {
		message.client.distube.play(message, args.join(' '));

	},
};
