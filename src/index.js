/**
 * Main Function of useGlobalState
 *
 * https://github.com/evilfactorylabs/useGlobalState
 */
import {
    createElement,
    createContext,
    useContext,
    useReducer,
} from 'react'


/**
 * @var {createContext} StateContext  
 */
const StateContext = createContext()

/**
 * @param {Function} newAction 
 * @example 
 * (state, action, todo) => {
 *  return action({
 *    type: 'ADD_TODO',
 *    data: {
 *      ...state,
 *      todo: [
 *        ...state.todo,
 *        todo,
 *      ],
 *    } 
 *  })
 * } 
 */

export const useGlobalState = (newAction) => {
    const [state, action] = useContext(StateContext)
    // newAction is action injector
    return [state, newAction ? newAction.bind(null, state, action) : action ]
}


/**
 * @name StateProvider
 * @param {Object} props
 * @property {useReducer} reducer
 * @property {Object} initialState
 * @property {Node|React.Element} children
 *
 * @description 
 *  Provider of this state management
 *
 * @example
 *
 * ```
 * <StateProvider reducer={reducer} initialState={initialState}>
 *  {children}
 * </StateProvider>
 * ```
 */
export const StateProvider = ({reducer, initialState, children }) => createElement(StateContext.Provider, {
    value: useReducer(reducer, initialState)
}, children)

