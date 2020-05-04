import { useEffect } from 'react';
import { useRequest, useDebounce } from './commons';

export const useDebouncedEffect = (callback: Function, deps: any[]): void => {
	const debounce = useDebounce();
	useEffect(() => debounce(callback), deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export function useRequestEffect<T>(
	request: (param?: T) => Promise<any>,
	deps: any[],
	param?: T
): boolean {
	const [isRequestPending, triggerRequest] = useRequest<T | undefined>(request);
	useEffect(() => {
		triggerRequest(param);
	}, deps); // eslint-disable-line react-hooks/exhaustive-deps

	return isRequestPending;
}
