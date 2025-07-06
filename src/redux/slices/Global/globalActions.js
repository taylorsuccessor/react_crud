const globalActions = {
  // General State Updates
  setState: (state, action) => {
    state.state = action.payload;
  },
};

export default globalActions;
