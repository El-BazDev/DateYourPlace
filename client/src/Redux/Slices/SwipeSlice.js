import { NEXT_RESTAURANT, PREVIOUS_RESTAURANT } from '../Actions/SwipeActions';
import restodatas from "../../Data.json"

const initialState = {
  restaurants: restodatas,
  currentIndex: 0,
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_RESTAURANT:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    case PREVIOUS_RESTAURANT:
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
      };
    default:
      return state;
  }
};

export default restaurantReducer;