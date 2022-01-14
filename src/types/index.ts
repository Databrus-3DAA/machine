
export type Page = 'menu' | 'screensaver';

export interface IGlobalContext {
	page: Page,
	setPage: (page: Page) => void,
}