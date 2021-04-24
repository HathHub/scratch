module.exports = {
	name: 'shuffle',
	description: 'Resume una canción pausada.',
	aliases: ['mezclar'],
	guildOnly: true,
	cooldown: 5,
	voiceOnly: true,
	async execute(message) {

		message.client.distube.shuffle(message);


	},
};
