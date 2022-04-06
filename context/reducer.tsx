export const initialState = {
    qnty : 0,
    token: '',
    netConnection: '',
    cats:[]
    
}


export const actionTypes = {
    GET_TOTAL: 'GET_TOTAL',
    SET_TOKEN: 'SET_TOKEN',
    GET_NET: 'GET_NET',
    GET_CATS: 'GET_CATS',
}

     
  function reducer(state, action) {
 

    switch (action.type) {
        
        // add to cart function
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            }
        case 'GET_TOTAL':
            return {
                ...state,
                qnty: action.qnty
            }
        case 'GET_NET':
            return {
                ...state,
                netConnection: action.netConnection
            }
        case 'GET_CATS':
            return {
                ...state,
                cats: action.cats
            }
        
      
        default:
            return state

            
        
    }
   
}

export default reducer
