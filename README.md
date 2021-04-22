# IMPORTANT
### CONFIG.JSON
```json
{
	"prefix": "!", <- TU PREFIX
	"token": "", <- EL TOKEN DE TU APP
	"devID": "" <- TU ID
}

```
### COMMAND.JS
DATO: Cada campo en el que dice `true` se puede poner true o false                                                                                                               
OTRO DATO: en caso de que quieran usar el soporte multilenguaje en uno de los comandos deben exportar `language` al igual que debajo;
```js 
execute(message, args, language)
```
**BASE DE LOS COMANDOS DEL BOT:**
```js
const Discord = require('discord.js'); // <- AQUI ARRIBA SE DEFINEN LAS DEPENDECIAS
module.exports = {
	name: 'nombre del comando',
	description: 'lo que hace el comando',
	aliases: ['alias 1', 'alias 2'], // <- OTROS NOMBRES POR LOS QUE EJECUTAR TU COMANDO
	guildOnly: true, // <- SI SE PUEDE EJECUTAR UNICAMENTE EN SERVERS
	cooldown: 5, // <- CUANTO TIEMPO TIENE QUE PASAR PARA VOLVER A EJECUTAR EL COMANDO (EN SEGUNDOS, EN message.js YA SE CONVIERTE A MILISEGUNDOS)
	args: true, // <- SI EL COMANDO ESPERA ALGÚN ARGUMENTO
	usage: '<argumento1> [argumento2]', // <- EL USO QUE SE LE DEBE DAR AL COMANDO(NO PONGAS EL PREFIX, EL BOT YA LO HACE Y <> SON PARA OBLIGATORIAS Y [] PARA OPCIONALES)
	devOnly: true, // <- SI SOLO LA PERSONA DEFINIDA EN config.json DENTRO DE `devID` PUEDE USAR EL COMANDO
	multiLanguage: true, // <- SI EL COMANDO ACEPTA O NO ACEPTA SOPORTE MULTILENGUAJE
	execute(message, args, ) { 
		// ... <- CODIGO
	},
};
```
### LENGUAJES MULTIPLES - MESSAGE.JS
**MESSAGE.JS (linea 1 - 10)**
```js
const Discord = require('discord.js');
const { prefix, devID } = require('../../config.json'); // obtiene el prefix y la id del dueño de config.json
const mensajes = require('../mensajes.json'); // obtiene los mensajes de mensajes.json
const { crearDB } = require('megadb'); // modulo para almacenar el lenguaje de cada usuario
const account = new crearDB('cuenta', 'lenguaje'); // la key por la que se obtiene el lenguaje del usuario

module.exports = {
	name: 'message',
	// eslint-disable-next-line no-unused-vars
	async execute(message) {
```
**MESSAGE.JS (linea 89 - 100)**
```js
const Cuenta = await account.get(message.author.id);
	let language;
	if (command.multiLanguage) { // si el comando tiene multiLanguage en true
	language = mensajes.español; // lenguaje por default si no esta especificado en la base de datos

	if(Cuenta === 'english') { // si el usuario tiene su lenguaje puesto en english (inglés)
	language = mensajes.english; // hace que el lenguaje sea english
        }
        }
	try {
	command.execute(message, args, language); // exporta el lenguaje del usuario
	}
```
