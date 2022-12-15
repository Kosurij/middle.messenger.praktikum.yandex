import { TState } from "/src/types";

export const userReducer = (state: TState) => state?.user?.data;

export const errorReducer = (state: TState) => state?.error;

