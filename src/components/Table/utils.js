export function range(start, end) {
	if (start > end) {
		[end, start] = [start, end];
	}
	return new Array(end - start + 1).fill(' ').map((_, index) => start + index);
}

export const nextSelector = (key, { col, row }) => {
	const dataID = { col, row };
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			if (dataID.col < 19) {
				dataID.col++;
			}
			break;
		case 'Tab':
			break;
		case 'ArrowRight':
			if (dataID.row < 25) {
				dataID.row++;
			}
			break;
		case 'ArrowLeft':
			if (dataID.row > 0) {
				dataID.row--;
			}
			break;
		case 'ArrowUp':
			if (dataID.col > 0) dataID.col--;
			break;
		default:
			break;
	}

	return `[data-id="${dataID.row}:${dataID.col}"]`;
};

export const isCell = (event) => (event.target.dataset.type === 'cell' ? true : false);
export const shiftPressed = (event) => (event.shiftKey === true ? true : false);
