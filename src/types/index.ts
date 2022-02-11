export type Page = 'menu' | 'screensaver';

export interface IGlobalContext {
	page: Page,
	setPage: (page: Page) => void,
	number: string,
	setNumber: (number: string) => void,
	code: string,
	setCode: (code: string) => void,
}