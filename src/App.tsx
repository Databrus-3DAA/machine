import React from 'react';
import Menu from './pages/Menu';
import ScreenSaver from './pages/ScreenSaver';
import { usePage } from './contexts/GlobalContext';
import './styles/global.css';

function App() {
	const { page, setPage } = usePage();
	setPage('menu')

	return (
		<>
			<div className='title'>
				<h1>DATABRUS</h1>
			</div>

			<div className='container'>
				{page == 'menu' &&
					<Menu />
				}
				{page == 'screensaver' &&
					<ScreenSaver />
				}
			</div>
		</>
	)
}

export default App;