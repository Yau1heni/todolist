import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;