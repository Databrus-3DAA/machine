import React, { createContext, useContext, useState } from 'react';
import { IGlobalContext, Page } from 'types';

export const GlobalContext = createContext<IGlobalContext>({
	page: 'menu',
	setPage: () => {},
	number: 0,
	setNumber: () => {},
	code: 0,
	setCode: () => {},
});

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
	const [page, setPage] = useState<Page>('menu');
	const [number, setNumber] = useState<number>(0);
	const [code, setCode] = useState<number>(0);

	const value = {
		page,
		setPage,
		number,
		setNumber,
		code,
		setCode,
	}

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export function usePage() {
	const { page, setPage } = useContext(GlobalContext);
	return { page, setPage };
}

export function useIdentifiers() {
	const { number, setNumber, code, setCode } = useContext(GlobalContext);
	return { number, setNumber, code, setCode };
}