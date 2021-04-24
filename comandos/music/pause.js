module.exports = {
	name: 'pause',
	description: 'Pausa la cancíon.',
	aliases: ['detener'],
	guildOnly: true,
	cooldown: 5,
	voiceOnly: true,
	async execute(message) {

		const queue = message.client.distube.getQueue(message);
		if (!queue) return message.channel.send(`${message.client.emotes.error} | La queue esta vacia!`);
		if (queue.pause) {
			message.client.distube.resume(message);
			return message.channel.send(`${message.client.emotes.resume} | Canción resumida.`);
		}
		message.client.distube.pause(message);
		message.channel.send(`${message.client.emotes.pause} | Canción pausada.`);

	},
};
