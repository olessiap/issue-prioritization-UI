const defaultState = {
  githubKey: null,
  repos:null,
  error:null,
}

function reducer(state = defaultState, action) {
  switch(action.type){
    case "SET_KEY":
      return {
        ...state,
        githubKey:action.payload
      }
    case "RESOLVED":
      //set username in LS to use in calls later
      localStorage.setItem('user', action.payload.login)
      return{
        ...state,
        error:null
      }
    case "ERROR":
      return{
        ...state,
        error:action.payload,
      }
    default: return state
  }
}

export default reducer