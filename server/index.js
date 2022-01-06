require('dotenv').config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const EventEmitter = require('events');
// const GPIO = require('array-gpio');

const app = express();
// const event = new EventEmitter();

// RPi GPIO pinout
// https://pinout.xyz/pinout/
// let pulse = GPIO.in(7);
// let motors = {
// 	x: [
// 		GPIO.out(22),
// 		GPIO.out(24),
// 		GPIO.out(26),
// 		GPIO.out(28),
// 		GPIO.out(32),
// 		GPIO.out(36),
// 		GPIO.out(38),
// 		GPIO.out(40),
// 	],

// 	y: {
// 		a: GPIO.out(27),
// 		b: GPIO.out(29),
// 		c: GPIO.out(31),
// 		d: GPIO.out(33),
// 		e: GPIO.out(35),
// 		f: GPIO.out(37),
// 	}
// };

// pulse.watch(state => {
// 	if(state) {
// 		event.emit('pulse');
// 	}
// });

app.use(express.static(path.join(__dirname,"..", "/build")));


// app.route('/').post(async (req, res) => {
// 	let data = req.body;
			
// 	if(!data.x || !data.y) return res.json({"status":"error", "msg":"Missing X or Y variables!"});

// 	motors.y[data.y].on();
// 	motors.x[data.x].on();
// 	await new Promise(res => event.once('pulse', res));
// 	motors.x[data.x].off();
// 	motors.y[data.y].off();
// 	res.json({"status":"ok"});
// });

app.listen(process.env.PORT, () => {
	console.log(`Server running on port: ${process.env.PORT}`);
});