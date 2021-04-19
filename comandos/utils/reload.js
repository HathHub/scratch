// eslint-disable-next-line no-unused-vars
const fs = require('fs');
module.exports = {
	name: 'reload',
	description: 'Recarga un comando',
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.comandos.get(commandName)
            || message.client.comandos.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return message.channel.send(`No existe un comando llamado \`${commandName}\`, ${message.author}.`);

		const commandFolders = fs.readdirSync('./comandos');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./comandos/${folder}`).includes(`${command.name}.js`));
		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.comandos.set(newCommand.name, newCommand);
			message.channel.send(`El comando \`${newCommand.name}\` se ha recargado!`);
		}
		catch (error) {
			console.error(error);
			message.channel.send(`No se pudo recargar el comando \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};