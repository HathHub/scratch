const Discord = require('discord.js');
const { prefix, devID } = require('../config.json');
const mensajes = require('../mensajes.json');
const { crearDB } = require('megadb');
const account = new crearDB('cuenta', 'lenguaje');

module.exports = {
	name: 'message',
	// eslint-disable-next-line no-unused-vars
	async execute(message) {
		// ejemplo de evento message esto envia en la consola el nombre del autor del mensaje, lo que envio y donde lo envió
		// si el usuario es un bot


		if(!message.author.bot) {

			const d = new Date,
				dformat = [d.getMonth() + 1,
				  d.getDate(),
				  d.getFullYear()].join('/') + ' ' +
				 [d.getHours(),
				  d.getMinutes(),
				  d.getSeconds()].join(':');

			console.log('Nombre: ' + message.author.tag);
			console.log('Guild: ' + message.guild.name + ' en: #' + message.channel.name);
			console.log('Mensaje: ' + message.content);
			console.log('Fecha: ' + dformat);
		}

		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = message.client.comandos.get(commandName)
               || message.client.comandos.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if(!command) return message.channel.send('el comando no existe');

		if (command.guildOnly && message.channel.type === 'dm') {
			return message.reply('No es posible ejecutar ese comando dentro de DMs!');
		}

		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply('Necesitas el permiso ' + '`' + `${command.permissions}` + '`' + ' para hacer eso.');
			}
		}
		// si no se especifico ningun argumento
		if (command.args && !args.length) {
			let reply = `No especificaste ningún argumento, ${message.author}!`;
			// si el comando tiene un uso especificado
			if (command.usage) {
				reply = `\nEl uso correcto sería \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);

		}

		if (command.voiceOnly && !message.member.voice.channel) return message.channel.send(`${message.client.emotes.error} | Debes estar en un canal de voz para hacer eso!`);


		if (command.devOnly) {
			if(devID.length === 0) return message.channel.send('El dueño del bot no ha especificado su `ID` aún así que esos comandos estan deshabilitados.');
			if (message.author.id != devID) return message.channel.send(`Ese comando solo puede ser utilizado por el dueño del bot, ${message.author}`);

		}


		const { cooldowns } = message.client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());

		}

		// eslint-disable-next-line no-unused-vars
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`Tienes que esperar \`${timeLeft.toFixed(1)} segundos(s)\` para usar \`${command.name}\` de nuevo.`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		const Cuenta = await account.get(message.author.id);
		let language;
		if (command.multiLanguage) {
			language = mensajes.español;

			if(Cuenta === 'english') {
				language = mensajes.english;
			}
		}
		try {
			command.execute(message, args, language);
		}
		catch (error) {
			console.error(error);
			message.reply('Hubo un error al tratar de ejecutar ese comando\n `' + error + '`');
		}

	},
};
