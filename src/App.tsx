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
			{page == 'menu' &&
				<Menu />
			}
			{page == 'screensaver' &&
				<ScreenSaver />
			}
		</>
	)
}

export default App;