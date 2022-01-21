export type Page = 'menu' | 'screensaver';

export interface IGlobalContext {
	page: Page,
	setPage: (page: Page) => void,
	number: number,
	setNumber: (number: number) => void,
	code: number,
	setCode: (code: number) => void,
}