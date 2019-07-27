/**
 * @ignore 
 * Main Function of useGlobalState
 *
 * https://github.com/evilfactorylabs/useGlobalState
 *
 * @version 1.0.0
 */
import {
    createElement,
    createContext,
    useContext,
    useReducer,
} from 'react'


/**
 * @ignore
 * @var {createContext} StateContext  
 */
const StateContext = createContext()

/**
 * @name <StateProvider/>
 * @param {Object} props
 * @property {Function} reducer **{@link https://reactjs.org/docs/hooks-reference.html#usereducer | useReducer}**
 * @property {Object} initialState
 * @property {Element} children **{@link https://reactjs.org/docs/react-api.html#createelement | createElement}**
 * @description 
 *  **<StateProvider/>** as Wrapper of your `React` Application.
 *
 * @example <caption>Example Use of `<StateProvider/>`.</caption>
 * import React, {useReducer} from 'react'
 * import App from './you-app.js'
 * import {StateProvider} from 'evilfactorylabs/global-state'
 *
 * const initialState = { todo: [] } 
 * const reducer = useReducer(state, action)
 *
 * ReactDOM.render(
 *    <StateProvider reducer={reducer} initialState={initialState}>
 *      <App/>
 *    </StateProvider>
 * , document.getElementById('root'))
 *
 */
export const StateProvider = ({reducer, initialState, children }) => createElement(StateContext.Provider, {
    value: useReducer(reducer, initialState)
}, children)


/**
 * @function useGlobalState 
 * @name useGlobalState
 * @param {Function=} newAction [optional]
 * @example 
 * import {useGlobalState} from '@evilfactorylabs/global-state'
 *
 * ...
 * const createTodo = (state, action, todo) => {
 *  return action({
 *    type: 'ADD_TODO',
 *    data: todo,
 *  })
 * } 
 *
 * const [,addTodo] = useGlobalState(createTodo)
 *
 * addTodo({title: 'New Task'})
 * ...
 */

export const useGlobalState = (newAction) => {
    const [state, action] = useContext(StateContext)
    // newAction is action injector
    return [state, newAction ? newAction.bind(null, state, action) : action ]
}
