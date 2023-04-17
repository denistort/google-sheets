import { App } from '@core';
import { DashboardPage, TablePage } from '@pages';

import './styles/index.scss';

const application = new App('#root', {
	dashboard: DashboardPage,
	excel: TablePage,
});
application.render();
