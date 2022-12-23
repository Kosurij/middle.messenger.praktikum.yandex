import { TState } from "/src/types";

export const userReducer = (state: TState) => state?.user?.data;

export const searchedUserReducer = (state: TState) => state?.user?.searchedUser;

export const selectedChatReducer = (state: TState) => state?.selectedChat;

export const resourcesReducer = (state: TState) => state?.resources?.data;

export const errorReducer = (state: TState) => state?.error;
