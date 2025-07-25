import { combineReducers } from "redux";
import userReducer from "./userSlice";
import { newsApi } from "../services/newsApi";
import { tmdbApi } from "../services/tmdbApi";
import { socialApi } from "../services/socialApi";

const rootReducer = combineReducers({
  user: userReducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
  [socialApi.reducerPath]: socialApi.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
