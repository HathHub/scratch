/* eslint-disable no-inline-comments */
// evento personalizado no remover!!
module.exports = {
	name: 'timers',
	// eslint-disable-next-line no-unused-vars
	execute(client, times) {
		if (times.ban) removeBan(client, times);
		if (times.mute) removeMuted(client, times);
	},
};

async function removeBan(client, times) {
	const guild = client.guilds.resolve(times.guildId); // obtener el servidor

	if (!guild) return; // si el servidor no fue encontrado pos nada

	const form = await guild.fetchBans();
	const userBanned = form.find(ban => ban.user.id == times.userId); // buscar entre los bans la id del user
	if (!userBanned) return; // si no encontro nada retorna nada
	try {
		await guild.members.unban(userBanned.user, 'TimeUp!'); // intentara removerle el ban
	}
	// eslint-disable-next-line no-empty
	catch {}
}

async function removeMuted(client, times) {
	const guild = client.guilds.resolve(times.guildId);
	if (!guild) return; // si el bot no esta en el servidor

	const member = guild.members.resolve(times.userId);
	if (!member) return; // si el miembro no esta en el servidor

	const rolMuted = guild.roles.resolve(times.mute);
	if (!rolMuted) return; // si no existe el rol muted

	if (!member.roles.cache.has(rolMuted.id)) return; // si no tiene el rol muted

	member.roles.remove(rolMuted); // remueve el rol
}