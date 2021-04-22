const Discord = require('discord.js');
const { crearDB } = require('megadb');
const account = new crearDB('cuenta', 'lenguaje');
module.exports = {
	name: 'language',
	description: 'Changes your language',
	aliases: ['lenguaje'],
	cooldown: 5,
	async execute(message) {

		const embed = new Discord.MessageEmbed()
			.setTitle('Cambiar lenguaje')
			.setDescription('Cambia el lenguaje del bot')
			.addFields(
				{ name: '🇪🇸', value: 'Español', inline: true },
				{ name: '🇺🇸', value: 'English', inline: true },
			);

		// eslint-disable-next-line no-shadow
		message.channel.send(embed).then(message => {
			message.react('🇪🇸');
			message.react('🇺🇸');
			const filteres = (reaction, user) => reaction.emoji.name === '🇪🇸' && !user.bot;
			const collectores = message.createReactionCollector(filteres, { max: 1, time: 5 * 60 * 1000 });
			// 5 min
			const filterusa = (reaction, user) => reaction.emoji.name === '🇺🇸' && !user.bot;
			const collectorusa = message.createReactionCollector(filterusa, { max: 1, time: 5 * 60 * 1000 });
			// 5 min

			collectorusa.on('collect', (reaction, user) => {

				message.delete();
				account.establecer(user.id, 'english');
				message.channel.send('Language changed to **English**');
			});
			collectores.on('collect', (reaction, user) => {

				message.delete();
				account.establecer(user.id, 'español');
				message.channel.send('Lenguaje cambiado a **Español**');
			});
		});
	},
};
