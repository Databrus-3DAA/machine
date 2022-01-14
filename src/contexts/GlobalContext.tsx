import React, { createContext, useContext, useState } from 'react';
import { IGlobalContext, Page } from 'types';

export const GlobalContext = createContext<IGlobalContext>({
	page: 'menu',
	setPage: () => {},
});

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
	const [page, setPage] = useState<Page>('screensaver');

	const value = {
		page,
		setPage,
	}

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export function usePage() {
	const { page, setPage } = useContext(GlobalContext);
	return { page, setPage };
}