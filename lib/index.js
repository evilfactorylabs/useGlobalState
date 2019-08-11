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
 * @ignore
 * @var {Object} actions
 */
let actions = {}
const memoActions = []

/**
 * @name <StateProvider/>
 * @param {Object} props
 * @property {Function} reducer **{@link https://reactjs.org/docs/hooks-reference.html#usereducer | useReducer}**
 * @property {Object} initialState
 * @property {Element} children **{@link https://reactjs.org/docs/react-api.html#createelement | createElement}**
 * @property {Array|Function} actions
 * @description 
 *  **<StateProvider/>** as Wrapper of your `React` Application.
 *
 * @example <caption>Example Use of `<StateProvider/>`.</caption>
 * import React from 'react'
 * import App from './you-app.js'
 * import {StateProvider} from 'evilfactorylabs/global-state'
 *
 * const initialState = { todo: [] } 
 *
 * function todoReducer(state, action) {
 *  switch (action.type) {
 *    case "ADD_TODO":
 *      return {
 *        ...state,
 *        todo: [...state.todo, action.todo]
 *      };
 *    default:
 *      return state;
 *  }
 * }
 *
 * ReactDOM.render(
 *    <StateProvider reducer={todoReducer} initialState={initialState}>
 *      <App/>
 *    </StateProvider>
 * , document.getElementById('root'))
 *
 */
export const StateProvider = ({reducer, initialState, children, actions:newActions}) => {
    if(Array.isArray(newActions)){
        for(let i=0; i<newActions.length;i++){
            if(typeof newActions[i] === 'function'){
                actions[newActions[i].name] = newActions[i] 
            }
        }
    } else if(typeof newActions === 'function'){
        actions[newActions.name] = newActions
    }

    return createElement(StateContext.Provider, {
        value: useReducer(reducer, initialState)
    }, children)
}


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
 * const [,actions.createTodo] = useGlobalState(createTodo)
 *
 * actions.createTodo({title: 'New Task'})
 * ...
 */

export const useGlobalState = (newAction) => {
    const [state, action] = useContext(StateContext)
    // newAction is action injector

    // bind action
    // Object iteration
    for(let i in actions){
        if(!memoActions.includes(i)) {
            actions[i]=actions[i].bind(null,state, action) 
            memoActions.push(i)
        }
    }

    newAction = newAction ? {
        [newAction.name]: newAction.bind(null, state, action),
    } : actions 

    return [state, newAction]
}
