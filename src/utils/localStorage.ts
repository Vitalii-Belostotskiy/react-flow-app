import { RootState } from "../store/store";

/**
 * Loads the persisted Redux state from localStorage
 * @returns {Partial<RootState> | undefined} The parsed state object or undefined if no state exists
 * @throws {Error} If there's an error loading or parsing the state
 */
export const loadState = (): Partial<RootState> | undefined => {
  try {
    const currentState = localStorage.getItem("reduxState");
    return currentState ? JSON.parse(currentState) : undefined;
  } catch (error) {
    throw new Error("Failed to load state from localStorage");
  }
};

/**
 * Saves the current Redux state to localStorage
 * @param {RootState} state - The complete Redux state tree to persist
 * @throws {Error} If there's an error stringifying or saving the state
 */
export const saveState = (state: RootState) => {
  try {
    const newState = JSON.stringify(state);
    localStorage.setItem("reduxState", newState);
  } catch (error) {
    throw new Error("Failed to save state to localStorage");
  }
};
