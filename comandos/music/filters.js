module.exports = {
	name: 'filters',
	description: 'Cambia el filtro de la canción.',
	aliases: ['filtros', 'filtro', 'filter'],
	guildOnly: true,
	cooldown: 5,
	args: true,
	usage: '[3d, bassboost, echo, karaoke, nightcore, vaporwave]',
	voiceOnly: true,
	async execute(message, args) {

		const queue = message.client.distube.getQueue(message);
		if (!queue) return message.channel.send(`${message.client.emotes.error} | La queue esta vacia!`);
		if (args[0] === 'off' && queue.filter) message.client.distube.setFilter(message, queue.filter);
		else if (Object.keys(message.client.distube.filters).includes(args[0])) message.client.distube.setFilter(message, args[0]);
		else if (args[0]) return message.channel.send(`${message.client.emotes.error} | No es un filtro valido`);
		message.channel.send(`Filtros de la queue: \`${queue.filter || 'Off'}\``);

	},
};
