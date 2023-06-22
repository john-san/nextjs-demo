import { call, put, takeLatest, select } from "redux-saga/effects";
import { ActionTypes } from "../actions/userActions";
import {
  resetError,
  getUserByIdFailure,
  getUserByIdSuccess,
  getUserByIdLoading,
  getUsersLoading,
  getUsersSuccess,
  createUserSuccess,
  deleteUserSuccess,
  updateUserSuccess,
  getUsersFailure,
  createUserFailure,
  deleteUserFailure,
  updateUserFailure,
} from "../actions/userActions";
import { getUsers, createUser, deleteUser, updateUser } from "./userApi";
// import User from "../types/User";
import { User } from "../gql/__generated__/graphql";

// function* getUserByIdSaga(action: any) {
//   try {
//     yield put(resetError());
//     yield put(getUserByIdLoading()); // dispatches loading state to the reducer

//     const fetchedUser = yield call(getUserById, action.payload);
//     yield put(getUserByIdSuccess(fetchedUser)); // dispatches user to the reducer
//   } catch (error) {
//     yield put(getUserByIdFailure(error.message));
//   }
// }

// saga worker
function* getUsersSaga() {
  try {
    yield put(resetError());
    yield put(getUsersLoading()); // dispatches loading state to the reducer
    const initialFetch: boolean = yield select(
      (state) => state.user.initialFetch
    );
    // initial fetch hasn't been performed, fetch users from the API
    if (initialFetch == false) {
      const fetchedUsers: User[] = yield call(getUsers);
      yield put(getUsersSuccess(fetchedUsers)); // dispatches users to the reducer
    } else {
      // fetch existing users from the store
      const existingUsers: User[] = yield select((state) => state.user.users);
      yield put(getUsersSuccess(existingUsers)); // dispatches users to the reducer
    }
  } catch (error) {
    yield put(getUsersFailure(error));
  }
}

function* createUserSaga(action: any) {
  try {
    const user: User = yield call(createUser, action.payload);
    yield put(createUserSuccess(user));
  } catch (error) {
    yield put(createUserFailure(error));
  }
}

function* deleteUserSaga(action: any) {
  try {
    yield call(deleteUser, action.payload);
    yield put(deleteUserSuccess(action.payload));
  } catch (error) {
    yield put(deleteUserFailure(error));
  }
}

function* updateUserSaga(action: any) {
  try {
    const user: User = yield call(updateUser, action.payload);
    yield put(updateUserSuccess(user));
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}
// saga listener
export function* userSagas() {
  yield takeLatest(ActionTypes.GET_USERS, getUsersSaga);
  // yield takeLatest(ActionTypes.GET_USER_BY_ID, getUserByIdSaga);
  yield takeLatest(ActionTypes.CREATE_USER, createUserSaga);
  yield takeLatest(ActionTypes.DELETE_USER, deleteUserSaga);
  yield takeLatest(ActionTypes.UPDATE_USER, updateUserSaga);
}
