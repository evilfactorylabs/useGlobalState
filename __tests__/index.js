import React from 'react'
import {useGlobalState, StateProvider} from '../lib'
import {fireEvent, render} from '@testing-library/react'

const Provider  = jest.fn(StateProvider)

test('StateProvider & useGlobalState test', () => {

    const Props ={
        reducer: (state, action) => {
            switch(action.type){
                case 'TEST': return {
                    ...state,
                    test: true 
                } 
                default: return state
            } 
        },
        initialState: {test: false},
        actions: [
            function changeTest(state, action){return action({ type: 'TEST' })}
        ]
    } 

    const ShowTest = () => {
        const [{test}] = useGlobalState()
        return (
            <span data-testid="showTest">
                {JSON.stringify(test)}
            </span>
        )
    } 

    const ChangeTest = () => {
        const [, actions] = useGlobalState()

        const handleClick = () => {
            actions.changeTest({
                type: 'TEST'
            }) 
        }

        return (<button data-testid="changeTest" onClick={handleClick}>Change Test</button>)
    }

    const {container, getByTestId } = render(
        <Provider {...Props}>
            <ShowTest/>
            <ChangeTest/>
        </Provider>
    )

    const showTest = getByTestId('showTest')
    const changeTest = getByTestId('changeTest')

    expect(Provider).toHaveBeenCalled()
    expect(showTest).toHaveTextContent('false')
    expect(container).toBeInTheDocument()

    fireEvent.click(changeTest)
    expect(showTest).toHaveTextContent('true')

})
