/*
 *@description:
 * @author wayne
 * @date 2023-03-31 09:54
 */

export interface TestSlicesTypes {
	num: number;
	addNumber: () => void;
	reduceNumber: () => void;
}

const InitialValue = {
	num: 0
};

const CreateTestSlice = (set, get) => {
	return {
		test: {
			...InitialValue,
			addNumber: () => {
				set(state => {
					state.test.num = get().test.num + 1;
				});
			},
			reduceNumber: () => {
				set(state => {
					state.test.num = state.test.num - 1;
				});
			}
		}
	};
};

export default CreateTestSlice;
