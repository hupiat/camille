import { useEffect } from 'react';
import { useRequest, useDebounce } from './commons';

export const useDebouncedEffect = (callback: Function, deps: any[]): void => {
	const debounce = useDebounce();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => debounce(callback), deps);
};

export function useRequestEffect<T>(
	request: (param?: T) => Promise<any>,
	deps: any[],
	param?: T
): boolean {
	const [isRequestPending, triggerRequest] = useRequest<T | undefined>(request);
	useEffect(() => {
		triggerRequest(param);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return isRequestPending;
}
