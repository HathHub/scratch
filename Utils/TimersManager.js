const { crearDB } = require('megadb');
const times = new crearDB('times');

class TimersManager {
	constructor(client) {
		Object.defineProperty(this, 'client', { value: client });
	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async check() {
		// eslint-disable-next-line no-constant-condition
		while (true) {
			this.verifiedAndEmit();
			await this.sleep(2000);
		}
	}

	verifiedAndEmit() {
		times.datos().then(guilds => {
			for (const guildId in guilds) {
				if (!this.client.guilds.resolve(guildId)) {
					this.delete(guildId);
					continue;
				}

				for (const type in guilds[guildId]) {

					for (const memberId in guilds[guildId][type]) {

						if (Date.now() >= guilds[guildId][type][memberId].time) {

							this.client.emit('timers', {
								userId: memberId,
								guildId: guildId,
								ban: type == 'ban' ? true : undefined,
								mute: guilds[guildId][type][memberId].muteId,
							});
							this.delete(guildId, memberId, type);
						}

					}
				}
			}
		});
	}

	delete(guildId, memberId, type) {
		if (!memberId && !type) times.delete(`${guildId}`);

		times.delete(`${guildId}.${type}.${memberId}`);
	}
}

module.exports = TimersManager;