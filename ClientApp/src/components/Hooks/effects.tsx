import { useEffect } from 'react';
import { useRequest } from './commons';
import { DEBOUCE_VALUE_MS } from './constants';

export const useDebouncedEffect = (callback: Function, deps: any[]): void =>
	useEffect(() => {
		const effect = setTimeout(callback, DEBOUCE_VALUE_MS);
		return () => clearTimeout(effect);
	}, deps); // eslint-disable-line react-hooks/exhaustive-deps

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
