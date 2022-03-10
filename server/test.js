import { init } from 'raspi';
import { DigitalInput, DigitalOutput, PULL_DOWN, HIGH, LOW } from 'raspi-gpio';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

init(() => {
	const pulse = new DigitalInput({
		pin: 'P1-7',
		pullResistor: PULL_DOWN
	});

	const motors = {
		x: [
			new DigitalOutput('P1-22'),
			new DigitalOutput('P1-24'),
			new DigitalOutput('P1-26'),
			new DigitalOutput('P1-28'),
			new DigitalOutput('P1-32'),
			new DigitalOutput('P1-36'),
			new DigitalOutput('P1-38'),
			new DigitalOutput('P1-40'),
		],

		y: {
			a: new DigitalOutput('P1-27'),
			b: new DigitalOutput('P1-29'),
			c: new DigitalOutput('P1-31'),
			d: new DigitalOutput('P1-33'),
			e: new DigitalOutput('P1-35'),
			f: new DigitalOutput('P1-37'),
		}
	}

	pulse.on('change', (value) => {
		console.log('Pulse change:', value);
	});

	(async () => {
		await delay(1000);
		motors.x[0].write(HIGH);
		motors.y.a.write(HIGH);
		await delay(1000);
		motors.y.a.write(LOW);
		motors.x[0].write(LOW);
	})();
});