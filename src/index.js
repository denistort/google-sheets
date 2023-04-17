import { Router } from './core/Router/Router';
import { DashboardPage, TablePage } from './pages';

import './styles/index.scss';

new Router('#root', {
	dashboard: DashboardPage,
	excel: TablePage,
});
