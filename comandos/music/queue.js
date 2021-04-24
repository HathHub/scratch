const Discord = require('discord.js');
module.exports = {
	name: 'queue',
	description: 'Muestra la lista de canciones del servidor',
	guildOnly: true,
	cooldown: 5,
	voiceOnly: true,
	async execute(message) {

		const queue = message.client.distube.getQueue(message);
		if (!queue) return message.channel.send(`${message.client.emotes.error} | La queue esta vacia!`);
		const embed = new Discord.MessageEmbed()
			.setTitle('Queue del Servidor')
			.setDescription(queue.songs.map((song, i) => `${i === 0 ? '**Escuchando:**' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n'))
			.setFooter(`Canciones en queue: ${queue.songs.length} | Duracion total de queue: ${queue.formattedDuration}`);
		message.channel.send(embed);
	},
};
