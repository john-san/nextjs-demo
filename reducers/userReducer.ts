// import User from "../types/User";
import { ActionTypes } from "../actions/userActions";
import { User } from "../gql/__generated__/graphql";

export interface UserState {
  users: User[];
  currentUser: User | null;
  initialFetch: boolean; // to check if the initial fetch has been done
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  initialFetch: false,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.GET_USERS_LOADING:
    case ActionTypes.GET_USER_BY_ID_LOADING:
      return {
        ...state,
        loading: true,
      };

    // if using local state
    case ActionTypes.GET_USER_BY_ID:
      return {
        ...state,
        currentUser: state.users.find(
          (user: User) => user.id === action.payload
        ),
      };

    case ActionTypes.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case ActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        initialFetch: true,
      };
    case ActionTypes.CREATE_USER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case ActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        currentUser: null,
      };
    case ActionTypes.UPDATE_USER_CANCEL:
      return {
        ...state,
        currentUser: null,
      };

    case ActionTypes.GET_USER_BY_ID_FAILURE:
    case ActionTypes.GET_USERS_FAILURE:
    case ActionTypes.CREATE_USER_FAILURE:
    case ActionTypes.DELETE_USER_FAILURE:
    case ActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.RESET_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
