/* eslint-disable indent */
const fs = require('fs');
// llama al modulo de discord.js
const Discord = require('discord.js');
const { token } = require('./config.json');
// crea un nuevo cliente de Discord
const client = new Discord.Client();
const eventFiles = fs.readdirSync('./eventos').filter(file => file.endsWith('.js'));
client.comandos = new Discord.Collection();
client.cooldowns = new Discord.Collection();
// lee la carpeta ./comandos
const commandFolders = fs.readdirSync('./comandos');
// lee la carpeta ./eventos
for (const file of eventFiles) {
	const event = require(`./eventos/${file}`);
	if (event.once) {
       client.once(event.name, (...args) => event.execute(...args, client));
	}
 else {
       client.on(event.name, (...args) => event.execute(...args, client));
	}
}
for (const folder of commandFolders) {
    // !! no se pueden dejar archivos sin subcategoria asignada
    // lee subcarpetas de el directorio ./comandos
	const commandFiles = fs.readdirSync(`./comandos/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
        // llama al archivo js en cada subcategoria
		const command = require(`./comandos/${folder}/${file}`);
		client.comandos.set(command.name, command);
	}
}
// entra a discord con el token de tu app
client.login(token);