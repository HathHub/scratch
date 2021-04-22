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
DATO: Cada campo en el que dice `true` se puede poner true o false\n
OTRO DATO: en caso de que quieran usar el soporte multilenguaje en uno de los comandos deben exportar `language` -> ```js execute(message, args, language)```
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
