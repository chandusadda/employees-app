import rootReducer from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import { configureStore } from "@reduxjs/toolkit";

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// create config to saga & reducer to store
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true,
});

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;