module.exports = {
	name: 'repeat',
	description: 'Repetir una canción / queue',
	aliases: ['loop'],
	guildOnly: true,
	cooldown: 5,
	voiceOnly: true,
	async execute(message, args) {

		const queue = message.client.distube.getQueue(message);
		if (!queue) return message.channel.send(`${message.client.emotes.error} | No hay ninguna canción!`);
		let mode = null;
		switch (args[0]) {
		case 'off':
			mode = 0;
			break;
		case 'song':
			mode = 1;
			break;
		case 'queue':
			mode = 2;
			break;
		}
		mode = message.client.distube.setRepeatMode(message, mode);
		mode = mode ? mode === 2 ? 'Repetir queue' : 'Repetir canción' : 'Off';
		message.channel.send(`${message.client.emotes.repeat} | Puesto el modo de repetición a: \`${mode}\``);
	},
};
