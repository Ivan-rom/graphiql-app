import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useSelectURL = () => {
  return useSelector((state: RootState) => state.request.url);
};
export const useSelectMethod = () => {
  return useSelector((state: RootState) => state.request.method);
};
export const useSelectBody = () => {
  return useSelector((state: RootState) => state.request.body);
};
export const useSelectHeader = () => {
  return useSelector((state: RootState) => state.request.header);
};
export const useSelectRequest = () => {
  return useSelector((state: RootState) => state.request);
};
