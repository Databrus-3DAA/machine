import EventEmitter from 'events';
import { Gpio } from 'onoff';

const event = new EventEmitter();

const test = ['a', 0];

// RPi GPIO pinout
// https://pinout.xyz/pinout/
let pulse = new Gpio(7, 'in');
let motors = {
	x: [
		new Gpio(22, 'out'),
		new Gpio(24, 'out'),
		new Gpio(26, 'out'),
		new Gpio(28, 'out'),
		new Gpio(32, 'out'),
		new Gpio(36, 'out'),
		new Gpio(38, 'out'),
		new Gpio(40, 'out'),
	],
	
	y: {
		a: new Gpio(37, 'out'),
		b: new Gpio(35, 'out'),
		c: new Gpio(33, 'out'),
		d: new Gpio(31, 'out'),
		e: new Gpio(29, 'out'),
		f: new Gpio(27, 'out'),
	}
};

pulse.watch((err, value) => {
	if(err) throw err;
	console.log(value);
	// if(value) event.emit('pulse');
});

(async () => {
	motors.y[test[0]].writeSync(1);
	motors.x[test[1]].writeSync(1);
	await new Promise(res => event.once('pulse', res));
	motors.x[test[1]].writeSync(0);
	motors.y[test[0]].writeSync(0);
});

process.on('SIGINT', _ => {
	motors.x.forEach(m => m.unexport());
	Object.keys(motors.y).forEach(m => motors.y[m].unexport());
});