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
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': 'http://127.0.0.1:42069'
					},
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
			</div>
		</>
	)
}

export default App;