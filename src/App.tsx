import React, { useState } from 'react';
import style from './styles/Main.module.css';
import './styles/global.css';

const buttonLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Neste', 0, 'remove'];

function App() {
	const [code, setCode] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [number, setNumber] = useState<string | null>(null);

	const onClick = async (key: string | number) => {
		const element = document.getElementById(!number ? 'phone' : 'code')!;

		switch(key) {
			case 'remove':
				if(element.innerHTML.length <= 0) return;
				if((number && (element.innerHTML.length == 4 || element.innerHTML.length == 7))) element.innerHTML = element.innerHTML.slice(0, -1);
				element.innerHTML = element.innerHTML.slice(0, -1);
				break;
			case 'Neste':
				if(!number) {
					if(element.innerHTML.length != 10) return setError('* Telefonnummeret er ikke 8 siffere');
					return setNumber(element.innerHTML.replace(/\s+/g, ""));
				}

				if(element.innerHTML.length != 5) return setError('* Koden er ikke 5 siffere');

				const data = {
					phone: number,
					code: element.innerHTML.replace(/\s+/g, "")
				};

				const res = await (await fetch('http://127.0.0.1:42069/api/checkInput', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data), 
				})).json()

				console.log(res);
				
				if(!res.validInput) return setError('* Ingen ordre registret på dette telefonnummeret eller denne koden');
				setCode(element.innerHTML.replace(/\s+/g, ""));
				break;
			case 'cancel':
				setError(null);
				setNumber(null);
				setCode(null);
				break;
			default:
				if((!number && element.innerHTML.length >= 10) || (number && element.innerHTML.length >= 5)) return;
				if(!number && (element.innerHTML.length == 3 ||  element.innerHTML.length == 6)) element.innerHTML += ' ';
				element.innerHTML += key;
				if(error && ((!number && element.innerHTML.length == 10) || (number && element.innerHTML.length == 5))) setError(null);
		}
	}

	if(number && code) setTimeout(() => {
		setNumber(null);
		setError(null);
		setCode(null);
	}, 5000);

	return (
		<>
			<div className='title'>
				<h1>DATABRUS UB</h1>
			</div>

			<div className='container'>
				{(!number || !code) && (
					<>
						{(number && !code) &&
							<button className={style.cancel} onClick={() => onClick('cancel')}>
								<svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 14.7143H8.552L15.6093 7.90906L13.724 6.09106L3.448 16.0001L13.724 25.9091L15.6093 24.0911L8.552 17.2858H28V14.7143Z"/></svg>
								<div>Avbryt</div>
							</button>
						}

						<div className={style.inputContainer}>
							{(!number && !code) &&
								<>
									<div className={style.title}>Telefonnummer</div>
									<div className={style.inputBox} id="phone"></div>
								</>
							}

							{(number && !code) &&
								<>
									<div className={style.title}>Kode</div>
									<div className={style.inputBox} id="code" style={{ letterSpacing: '5px' }}></div>
								</>
							}

							{error != null && (
								<div style={{color: 'red', textAlign: 'center'}}>{error}</div>
							)}
						</div>

						<div className={style.buttons}>
							{buttonLabels.map(label => <button key={label} className={style.button} onClick={() => onClick(label)}>{label != 'remove' ? label : <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 14.7143H8.552L15.6093 7.90906L13.724 6.09106L3.448 16.0001L13.724 25.9091L15.6093 24.0911L8.552 17.2858H28V14.7143Z" fill="#161616"/></svg>}</button>)}
						</div>
					</>
				)}

				{(number && code) && (
					<>
						<div style={{paddingBottom: '80px', fontSize: '20px'}}>
							Takk for at du handler hos Databrus
						</div>

						<div>
							<svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path className={style.checkmark2} d="M160 30C88.3187 30 30 88.3187 30 160C30 231.681 88.3187 290 160 290C231.681 290 290 231.681 290 160C290 88.3187 231.681 30 160 30ZM227.656 116.431L143.656 216.431C142.735 217.529 141.588 218.415 140.294 219.031C139 219.647 137.589 219.977 136.156 220H135.988C134.586 219.999 133.2 219.704 131.92 219.134C130.64 218.563 129.494 217.73 128.556 216.688L92.5562 176.688C91.642 175.718 90.9308 174.575 90.4644 173.327C89.9981 172.078 89.786 170.749 89.8407 169.417C89.8953 168.086 90.2156 166.778 90.7827 165.572C91.3498 164.366 92.1523 163.286 93.1429 162.394C94.1336 161.503 95.2925 160.818 96.5515 160.381C97.8105 159.944 99.1442 159.763 100.474 159.848C101.804 159.934 103.104 160.284 104.296 160.879C105.489 161.474 106.55 162.301 107.419 163.312L135.725 194.762L212.344 103.569C214.062 101.582 216.494 100.351 219.113 100.142C221.732 99.9335 224.327 100.764 226.339 102.454C228.351 104.143 229.617 106.557 229.863 109.172C230.109 111.788 229.317 114.395 227.656 116.431Z" fill="#03A062"/>
								<path className={style.checkmark1} d="M40 160C40 93.8416 93.8416 40 160 40C226.158 40 280 93.8416 280 160C280 226.158 226.158 280 160 280C93.8416 280 40 226.158 40 160Z" stroke="#03A062" strokeWidth="20"/>
							</svg>
						</div>
					</>
				)}
			</div>
		</>
	)
}

export default App;