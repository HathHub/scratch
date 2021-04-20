function parseTime(args) {
	if(!args) return undefined;

	switch (args.slice(-1)) {
	case 's':
		return Date.now() + parseInt(args.slice(0, -1)) * 1003;
	case 'm':
		return Date.now() + parseInt(args.slice(0, -1)) * 60030;
	case 'h':
		return Date.now() + parseInt(args.slice(0, -1)) * 3600300;

	case 'd':
		return Date.now() + parseInt(args.slice(0, -1)) * 86403000;

	default:
		return undefined;
	}
}

function parseTimeAndReason(args) {
	const resTime = parseTime(args[1]);
	return {
		reason: resTime ? args.slice(2).join(' ') : args.slice(1).join(' '),
		time: resTime,
	};
}

function humanizeDuration(ms, maxUnits, short, fraction) {
	const round = ms > 0 ? Math.floor : Math.ceil;
	const parsed = [
		{
			int: round(ms / 604800000),
			sin: 'week',
			plu: 'weeks',
			sho: 'w',
		},
		{
			int: round(ms / 86400000) % 7,
			sin: 'day',
			plu: 'days',
			sho: 'd',
		},
		{
			int: round(ms / 3600000) % 24,
			sin: 'hour',
			plu: 'hours',
			sho: 'h',
		},
		{
			int: round(ms / 60000) % 60,
			sin: 'minute',
			plu: 'minutes',
			sho: 'm',
		},
		{
			int: (round(ms / 1000) % 60) + (round(ms) % 1000) / 1000,
			sin: 'second',
			plu: 'seconds',
			sho: 's',
		},
	];

	const result = [];
	for (let i = 0; i < parsed.length; i++) {
		if (!result.length && parsed[i].int === 0) continue;

		if (result.length >= maxUnits) break;

		let int = parsed[i].int;
		if (!result.length && fraction && i === parsed.length - 1) {
			int = int.toFixed(1);
		}
		else {
			int = int.toFixed(0);
		}

		result.push(
			`${int}${
				short
					? parsed[i].sho
					: ' ' + (parseFloat(int) !== 1 ? parsed[i].plu : parsed[i].sin)
			}`,
		);
	}

	return result
		.map((res, i) => {
			if (!short) {
				if (i === result.length - 2) {
					return res + ' and';
				}
				else if (i !== result.length - 1) {
					return res + ',';
				}
			}
			return res;
		})
		.join(' ');
}

async function makeRole(msg) {
	const rol = await msg.guild.roles.create({
		data: {
			name: 'mute',
			color: 'BLACK',
		},
		reason: 'Mute Role',
	});

	await setChannelPerms(msg, rol);

	return rol;
}

function setChannelPerms(msg, rol) {
	msg.guild.channels.cache.forEach(async channel => {
		await channel.updateOverwrite(rol, {
			SEND_MESSAGES: false,
		});
	});
}

module.exports = {
	parseTime,
	setChannelPerms,
	makeRole,
	humanizeDuration,
	parseTimeAndReason,
};