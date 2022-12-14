import { withStore } from "/src/hocs/withStore";
import { TState } from "/src/types/commonTypes";

// export const withUser = withStore((state: any) => state?.user?.data);

export const userReducer = (state: TState) => state?.user?.data
