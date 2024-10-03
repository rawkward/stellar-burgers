import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store";

let store = configureStore({
  reducer: rootReducer
})

describe('testing rootReducer initialization', () => {
  
})
