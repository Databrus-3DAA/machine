import path from 'path';
import express from 'express';
import Prisma from '@prisma/client';
import bodyParser from 'body-parser';
import EventEmitter from 'events';

import { init } from 'raspi';
import { DigitalInput, DigitalOutput, PULL_DOWN, HIGH, LOW } from 'raspi-gpio';

/**
 * Lager en ny express aplication som hoster UI-en lokalt og API-en,
 * en ny prisma client som kobler til databasen og håndterer all database kommunikasjon, 
 * og en ny event emitter som brukes til å stoppe motorene når den ene pinen blir high.
 */
const app = express();
const prisma = new Prisma.PrismaClient();
const event = new EventEmitter();

/**
 * Ved at express serveren bruker bodyParser så slipper vi å parse bodyen til en json
 * objekt når vi skal håndtere API-en.
 */
app.use(bodyParser.json())

/**
 * Lager en ny express route for alle statiske filler altså bygget versjonen av UI-en.
 */
app.use(express.static(path.join("..", "/dist")));

/**
 * init funksjonen fra raspi biblioteket kjøres når GPIO pinene er klare til bruk.
 * Hadde vi ikke hatt logikken som brukers pinene utenfor hadde vi bare fått problemmer.
 */
init(() => {
	/**
	 * RPi GPIO pinout
	 * https://pinout.xyz/pinout/
	 * https://github.com/nebrius/raspi-io/wiki/Pin-Information
	 */

	// Setter opp GPIO pinen for avbrytning av motoren.
	const pulse = new DigitalInput({
		pin: 'P1-7',
		pullResistor: PULL_DOWN
	});

	// Setter opp GPIO pinen for alle motorene som en X og Y akse i en 2 Dimensjonal array.
	const motors = {
		x: [
			new DigitalOutput('P1-18'), // Motor 1 / M1
			new DigitalOutput('P1-22'), // Motor 2 / M2
			new DigitalOutput('P1-24'), // Motor 3 / M3
			new DigitalOutput('P1-26'), // Motor 4 / M4
			new DigitalOutput('P1-32'), // Motor 5 / M5
			new DigitalOutput('P1-36'), // Motor 6 / M6
			new DigitalOutput('P1-38'), // Motor 7 / M7
			new DigitalOutput('P1-40'), // Motor 8 / M8
		],

		y: {
			a: new DigitalOutput('P1-23'), // Hylle 1 / H1
			b: new DigitalOutput('P1-29'), // Hylle 2 / H2
			c: new DigitalOutput('P1-31'), // Hylle 3 / H3
			d: new DigitalOutput('P1-33'), // Hylle 4 / H4
			e: new DigitalOutput('P1-35'), // Hylle 5 / H5
			f: new DigitalOutput('P1-37'), // Hylle 6 / H6
		}
	}

	// Legger til logikk som kjøres når avbrytnings pinen blir high.
	pulse.on('change', (value) => {
		console.log('Pulse change:', value);
		if(value) event.emit('pulse');
	});

	// Setter alle motorene til LOW.
	motors.x.forEach(m => m.write(LOW));
	Object.keys(motors.y).forEach(m => motors.y[m].write(LOW));

	// Setter opp en rout som tar imot en post request fra UI-en (fungerer som en API).
	app.route('/api/checkInput').post(async ({ body: { phone, code } }, res) => {
		/**
		 * Henter orderen fra databasen med produkt informasjon hvor koden og telefonnummeret
		 * matcher og statusen på orderen 0 altså ikke hentet som er 1, refundert som er 2
		 * eller avbrut/kanselert som er 3.
		 */
		const data = await prisma.order.findFirst({
			where: { phone, code, state: 0 },
			include: { machine_items: true }
		});

		console.log(data);
		
		/**
		 * Hvis orderen ikke finnes eller er refundert eller avbrutt/kanselert så vil UI-en få en
		 * false tilbake og koden vil stoppe med returnen eller så får UI-en en true og resten av
		 * koden vil kjøre.
		 */
		res.send(JSON.stringify({ validInput: data != null }));
		if(data == null) return;

		/**
		 * Siden posisjonen til produktet i maskinen er en stringified array, så må vi parse den
		 * fra string til array.
		 */
		const {x, y} = JSON.parse(data.machine_items.pos);
		console.log(x, y);

		/**
		 * Etter å ha skaffet posisjonen til produktet i maskinen, så starter vi motorene og
		 * ventet på eventen for å stoppe motorene.
		 */
		motors.x[x].write(HIGH);
		motors.y[y].write(HIGH);
		await new Promise(res => event.once('pulse', res));
		motors.y[y].write(LOW);
		motors.x[x].write(LOW);
	});

	// Starte serveren på port 42069.
	app.listen(42069, () => {
		console.log(`Server running on port: 42069`);
	});
});