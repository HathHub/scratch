const { prefix } = require('../../config.json');
module.exports = {
	name: 'help',
	description: 'Lista de todos los comandos',
	aliases: ['comandos'],
	usage: '[comando]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { comandos } = message.client;

		if (!args.length) {
			data.push('Lista de los comandos:');
			data.push(comandos.map(command => command.name).join(', '));
			data.push(`\nPuedes \`${prefix}help [nombre del comando]\` para obtener informacíon sobre el comando!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Te envie mis comandos a dm!');
				})
				.catch(error => {
					console.error(`No se ha podido enviar un dm a ${message.author.tag}.\n`, error);
					message.reply('No he podido enviarte un dm, ¿Tienes tus DMs desactivados?');
				});
		}

		const name = args[0].toLowerCase();
		const command = comandos.get(name) || comandos.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Ese comando no existe');
		}

		data.push(`**Nombre:** ${command.name}`);

		if (command.aliases) data.push(`**Sinonimos:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descripción:** ${command.description}`);
		if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} segundo(s)`);

		message.channel.send(data, { split: true });
	},
};