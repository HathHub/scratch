module.exports = {
	name: 'autoplay',
	description: 'Activa la función autoplay para las canciones.',
	guildOnly: true,
	cooldown: 5,
	voiceOnly: true,
	async execute(message) {
		const mode = message.client.distube.toggleAutoplay(message);
		message.channel.send('Autoplay puesto en modo:`' + (mode ? 'On' : 'Off') + '`');
	},
};
