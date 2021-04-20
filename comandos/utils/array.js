module.exports = {
	name: 'array',
	description: 'Elige algo al azar de la lista que el usuario ingresó.',
	usage: '<opción1> <opción2> [opción3]',
	args: true,
	execute(message, args) {
		const array = args;
		array.push(...args);


		const yes = array[Math.floor(Math.random() * array.length)];
		message.channel.send(yes);
	},
};