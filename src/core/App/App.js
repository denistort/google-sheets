import { $ } from '../utils/dom';
import { ActiveRoute } from './activeRoute';

export class App {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in ROUTER');
		}
		this.$placeholder = $(selector);
		this.routes = routes;
		this.changePageHandler = this.changePageHandler.bind(this);
		this.currentPage = null;
	}

	render() {
		this.init();
	}

	init() {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	changePageHandler() {
		if (this.page) {
			this.page.destroy();
		}
		this.$placeholder.clear('');

		if (ActiveRoute.path.includes('excel')) {
			const Page = this.routes.excel;
			this.page = new Page(ActiveRoute.param);
			this.$placeholder.append(this.page.getRoot());
		} else {
			const Page = this.routes.dashboard;
			this.page = new Page();
			this.$placeholder.append(this.page.getRoot());
		}
		this.page.afterRender();
	}

	destroy() {
		window.removeEventListener('hashchange', this.changePageHandler);
	}
}
