module.exports = {
	name: 'kick',
	description: 'Kickea a alguien del servidor.',
	guildOnly: true,
	usage: '<usuario> <razón>',
	args: true,
	permissions: 'KICK_MEMBERS',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {

		const taggedUser = message.mentions.users.first();

		message.channel.send(`Has kickeado a  ${taggedUser.username}`);
	},
};