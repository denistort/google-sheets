import { generateToolBarTemplate } from './Toolbar.template';
import { AbstractComponentWithState } from '@core/Components';
import { defaultStyle } from '@core/constants';
import { $ } from '@core/utils/dom';

export class Toolbar extends AbstractComponentWithState {
	static className = 'excel__toolbar';
	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			subOnStore: ['currentStyleCell'],
			...options,
		});
	}

	prepare() {
		this.initState(defaultStyle);
	}

	get template() {
		return generateToolBarTemplate(this.state);
	}

	onClick(event) {
		const $target = $(event.target);
		if ($target.dataset.type === 'button') {
			const value = JSON.parse($target.dataset.value);
			this.$emit('toolbar:applyStyle', value);
		}
	}

	toHtml() {
		return this.template;
	}

	storeChanged(changes) {
		this.setState(changes.currentStyleCell);
	}
}
