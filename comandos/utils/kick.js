module.exports = {
	name: 'kick',
	description: 'Kickea a alguien del servidor.',
	guildOnly: true,
	usage: '<usuario> <razón>',
	args: true,
	permissions: 'KICK_MEMBERS',
	// eslint-disable-next-line no-unused-vars
	async execute(message, args) {

		const member = message.mentions.members.first();
		const razon = args.slice(1).join(' ') ? args.slice(1).join(' ') : 'Razon sin especificar';
		member.kick(razon);
		message.channel.send('Usuario kickeado');
	},
};