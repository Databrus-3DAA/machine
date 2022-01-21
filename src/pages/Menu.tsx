import React from 'react';
import style from '../styles/Menu.module.css';
import { useIdentifiers, usePage } from '../contexts/GlobalContext';

const buttonLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Neste', '0', 'remove'];

function Menu() {
	const { page, setPage } = usePage();
	const { number, setNumber, code, setCode } = useIdentifiers();

	const onClick = async (key: string | number) => {
		const element = document.getElementById(number == 0 ? 'phone' : 'code')!;

		switch(key) {
			case 'remove':
				if(element.innerHTML.length <= 0) return;
				if(element.innerHTML.length == 4 || element.innerHTML.length == 7) element.innerHTML = element.innerHTML.slice(0, -1);
				element.innerHTML = element.innerHTML.slice(0, -1);
				break;
			case 'Neste':
				const data =  JSON.stringify({
					phone: Number(element.innerHTML.replace(/\s+/g, ""))
				})

				console.log(data);

				await fetch(`http://127.0.0.1:42069/api/checkPhone`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: data, 
				})
					// .then(res => res.json());
				if(element.innerHTML.length != 10) break;
				setNumber(Number(element.innerHTML.replace(/\s+/g, "")));
				break;
			default:
				if(element.innerHTML.length >= 10) return;
				if(element.innerHTML.length == 3 || element.innerHTML.length == 6) element.innerHTML += ' ';
				element.innerHTML += key;
		}
	}

	return (
		<>
			<div className={style.inputContainer}>
				{(!number && !code) &&
					<>
						<div className={style.title}>Telefonnummer</div>
						<div className={style.inputBox} id="phone"></div>
					</>
				}
				{(number != 0 && !code) &&
					<>
						<div className={style.title}>Kode</div>
						<div className={style.inputBox} id="code"></div>
					</>
				}
			</div>

			<div className={style.buttons}>
				{buttonLabels.map(label => <button className={style.button} onClick={() => onClick(label)}>{label != 'remove' ? label : <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 14.7143H8.552L15.6093 7.90906L13.724 6.09106L3.448 16.0001L13.724 25.9091L15.6093 24.0911L8.552 17.2858H28V14.7143Z" fill="#161616"/></svg>}</button>)}
			</div>
		</>
	)
}

export default Menu;