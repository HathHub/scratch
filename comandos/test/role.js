module.exports = {
	name: 'role',
	description: 'Agrega un rol a alguien.',
	args: true,
	usage: '<user> <role>',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		const guild = message.guild;

		// eslint-disable-next-line no-shadow
		const role = guild.roles.cache.find(role => role.name === args[1]);
		const member = message.mentions.members.first();
		member.roles.add(role);

	},
};
