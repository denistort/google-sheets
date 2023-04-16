import { generateDashboardTemplate } from "../../components/Dashboard/dashboard.template";
import { $ } from "../../core/dom";
import { Page } from "../../core/Page";

export class DashboardPage extends Page {
	getRoot() {
		return $.create("div", "db").html(generateDashboardTemplate());
	}
}
