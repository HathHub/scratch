const {
	parseTimeAndReason,
	humanizeDuration,
	makeRole,
} = require('../../Utils/functions');
const { MessageEmbed } = require('discord.js');
const { crearDB } = require('megadb');
const times = new crearDB('times');
module.exports = {
	name: 'mute',
	description: 'Mutea a un usuario',
	args: true,
	usage:'<@usuario> [tiempo] [razón]',
	guildOnly: true,
	cooldown: 5,
	async execute(message, args) {

		if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(
				'I don\'t have enough permissions to mute.',
			);
		}


		const member =
      message.mentions.members.first() || message.guild.members.resolve(args[0]);
		if (!member) {
			return message.channel
				.send(
					new MessageEmbed()
						.setColor('RED')
						.setDescription('> *Member not found on server.*'),
				)
				.then(m => m.delete({ timeout: 10000 }));
		}

		if ([message.author.id, message.client.user.id].includes(member.id)) {
			return message.channel
				.send(
					new MessageEmbed()
						.setColor('RED')
						.setDescription('`ERROR` You must mention someone else.')
						.addField('Correct usage:', 'mute <@user> [time] [reason] '),
				);
		}


		if (
			member.roles.highest.comparePositionTo(message.guild.me.roles.highest) > 0
		) {
			return message.channel
				.send(
					new MessageEmbed()
						.setColor('RED')
						.setDescription(
							'> I can\'t mute this user because he has a higher role than mine.',
						),
				)
				.then(m => m.delete({ timeout: 10000 }));
		}

		let rolMute = message.guild.roles.cache.find(
			x => x.name.toLowerCase() === 'mute',
		);
		if (!rolMute) rolMute = await makeRole(message);

		if (member.roles.cache.has(rolMute.id)) {
			return message.channel
				.send(
					new MessageEmbed()
						.setColor('RED')
						.setDescription('> The mentioned user is already muted.'),
				)
				.then(m => m.delete({ timeout: 10000 }));
		}

		const response = parseTimeAndReason(args);
		member.roles
			.add(rolMute)
			.then(() => {
				message.channel.send(
					new MessageEmbed()
						.setColor('GREEN')
						.setDescription(
							`\`\`\`\nType: Mute${response.time ? ' temporary' : ''}\nMember: ${
								member.user.tag
							} - ${member.id}\nReason${
								response.reason ? `: ${response.reason}` : ' Not specified'
							}\nMod: ${
								message.author.tag
							}\nDate: ${new Date().toLocaleDateString('en')}\n${
								response.time
									? `Time: ${humanizeDuration(response.time - Date.now(), 1)}`
									: ''
							}\`\`\``,
						),
				);
			})
			.catch(err => {
				message.channel
					.send(
						new MessageEmbed()
							.setColor('RED')
							.setDescription(
								`An error occurred while muting the user.\n\`${err.name}: ${err.message}\``,
							),
					)
					.then(m => m.delete({ timeout: 15000 }));
			});

		if (response.time) {
			await times.set(`${message.guild.id}.mute.${member.id}`, {
				time: response.time,
				muteId: rolMute.id,
			});
		}
	},
};