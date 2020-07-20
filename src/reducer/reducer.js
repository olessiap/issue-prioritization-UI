const defaultState = {
  githubKey: null
}

function reducer(state = defaultState, action) {
  switch(action.type){
    case "SET_KEY":
      return {
        ...state,
        githubKey:action.payload
      }
    default: return state
  }
}

export default reducer