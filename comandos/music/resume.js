module.exports = {
	name: 'resume',
	description: 'Resume una canción pausada.',
	aliases: ['resumir'],
	guildOnly: true,
	cooldown: 5,
	voiceOnly: true,
	async execute(message) {

		const queue = message.client.distube.getQueue(message);
		if (!queue) return message.channel.send(`${message.client.emotes.error} | La queue esta vacia!`);
		message.client.distube.resume(message);
		message.channel.send(`${message.client.emotes.resume} | Canción resumida.`);

	},
};
