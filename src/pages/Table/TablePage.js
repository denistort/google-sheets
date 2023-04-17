import { Formula, Header, Table, Toolbar } from '@components';
import { createStore } from '@core/createStore';
import { debounce, storage } from '@core/utils';
import { normalizeInitialState } from '@store/initialState';
import { rootReducer } from '@store/rootReducer';
import { Page } from '@core/Page';
import { RootComponent } from '@core/RootComponent/Root.component';

const storageNameGener = (params) => `excel:${params}`;

export class TablePage extends Page {
	constructor(param) {
		super(param);
		this.storeSub = null;
	}
	getRoot() {
		const nameId = storageNameGener(this.params);
		const store = createStore(rootReducer, normalizeInitialState(nameId));
		/*
		Subscribing on store
		*/
		const stateListener = debounce((state) => {
			storage(nameId, state);
		}, 300);
		store.subscribe(stateListener);

		this.rootComponent = new RootComponent({
			components: [Header, Toolbar, Formula, Table],
			store,
		});

		return this.rootComponent.getRoot();
	}

	afterRender() {
		this.rootComponent.init();
	}
	destroy() {
		this.rootComponent.destroy();
		this.storeSub.unsubscribe();
	}
}
