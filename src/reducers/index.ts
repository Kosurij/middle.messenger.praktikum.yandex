import { TState } from "/src/types";

export const userReducer = (state: TState) => state?.user?.data;

export const resourcesReducer = (state: TState) => state?.resources?.data;

export const errorReducer = (state: TState) => state?.error;

