import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./store/global";
import { persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { migrations, CURRENT_REDUX_PERSIST_VERSION } from "./store/_ migrations";

const persistConfig = {
  key: "root",
  version: CURRENT_REDUX_PERSIST_VERSION,
  storage,
  blacklist: ["keys"],
  migrate: createMigrate(migrations, { debug: true }),
};

const reducers = combineReducers({
  global: globalReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
