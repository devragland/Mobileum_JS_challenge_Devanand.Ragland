// useAppDispatch.ts
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'

/**
 * A custom hook that wraps the use of Redux's useDispatch hook.
 *
 * This hook is specific to the application's Redux store type, ensuring that
 * dispatch actions are correctly typed according to the AppDispatch type defined in the store.
 *
 * Usage:
 * const dispatch = useAppDispatch();
 * dispatch(someReduxAction());
 *
 * By using this custom hook, TypeScript can provide better type checking and autocomplete
 * for dispatch actions, reducing the likelihood of dispatching incorrectly typed actions.
 *
 * Returns:
 * A dispatch function from the Redux store with specific type AppDispatch.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()
