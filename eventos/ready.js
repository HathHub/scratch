// cuando el cliente se enciende corre esto
// este evento solo se llama una vez cuando el cliente se enciende

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Listo! soy ${client.user.tag}`);
	},
};