import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { IContract } from "../../types";
import { dummyContracts } from "../../data/dummyData";
import type { RootState } from "../store";

interface InitialState {
	contracts: IContract[];
}

const initialState: InitialState = {
	contracts: dummyContracts,
};

export type DraftContract = Pick<IContract, "title" | "client" | "startDate" | "endDate">;

const createContract = (contractData: DraftContract): IContract => {
	return {
		...contractData,
		id: nanoid(),
		status: "Active",
	};
};

const contractSlice = createSlice({
	name: "contractSlice",
	initialState: initialState,
	reducers: {
		addContract: (state, action: PayloadAction<DraftContract>) => {
			const contractData = createContract(action.payload);
			state.contracts.push(contractData);
		},

		updateContract: (state, action: PayloadAction<IContract>) => {
			const index = state.contracts.findIndex((c) => c.id === action.payload.id);
			if (index !== -1) {
				state.contracts[index] = action.payload;
			}
		},

		deleteContract: (state, action: PayloadAction<string>) => {
			state.contracts = state.contracts.filter((c) => c.id !== action.payload);
		},
	},
});

export const selectContracts = (state: RootState) => {
	return state.contract.contracts;
};

export const selectContractById = (id: string) => (state: RootState) => state.contract.contracts.find((c) => c.id === id);

export const { addContract, updateContract, deleteContract } = contractSlice.actions;

export default contractSlice.reducer;
