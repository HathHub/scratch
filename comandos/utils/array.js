module.exports = {
	name: 'array',
	description: 'Ping!',
	execute(message, args) {
		const array = args;
		array.push(...args);


		const yes = array[Math.floor(Math.random() * array.length)];
		message.channel.send(yes);
	},
};