const { execSync } = require('child_process');
module.exports = {
	name: 'terminal',
	description: 'yes',
	guildOnly: true,
	cooldown: 5,
	devOnly: true,
	execute(message, args) {
		// si el comando es invocado por otro usuario a ti, terminará la sentencia

		try {
			const process = execSync(args.join(' '));
			// envia el contenido de la terminal
			message.channel.send(process, { code:'sh' })
				.catch(err => {
					// cannot send empty messages
					if (err.code === 50006) {
						// enviamos mensaje al canal de que la terminal no retorna ningún mensaje
						message.channel.send('Mensaje vacío');
					}
				});
		}
		catch (err) {
			// retorna el error de terminal al canal
			message.channel.send(err, { code: 'sh' });
		}
	},
};