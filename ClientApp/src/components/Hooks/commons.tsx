import React, { useEffect, Dispatch, useState, useRef, useMemo } from 'react';
import { Pattern } from '../../types/Patterns';
import { useSnackbar } from 'notistack';
import SnackbarContentLayout from '../UI/Layouts/SnackbarContentLayout';
import { useTranslation } from 'react-i18next';

const DEBOUCE_VALUE_MS = 300;

export const useDebounce = (): ((callback: Function) => void) => {
	const ref = useRef<NodeJS.Timeout>();
	return (callback: Function) => {
		if (ref.current) {
			clearTimeout(ref.current);
			ref.current = undefined;
		}
		ref.current = setTimeout(() => {
			callback();
			ref.current = undefined;
		}, DEBOUCE_VALUE_MS);
	};
};

export const useSearchFunction = (patterns: Pattern[], query: string): Pattern[] =>
	useMemo(() => patterns.filter((p: Pattern) => p.name.includes(query)), [
		patterns,
		query,
	]);

export const useSearchTrigger = (
	patterns: Pattern[],
	query: string,
	setIdsPatternsFiltered: Dispatch<number[]>
): void => {
	const filtered = useSearchFunction(patterns, query);
	useEffect(() => setIdsPatternsFiltered(filtered.map((p) => p.id)), [
		filtered,
		patterns,
		query,
		setIdsPatternsFiltered,
	]);
};

export function useRequest<T>(
	request: (param: T) => Promise<any>
): [boolean, (param: T) => Promise<any>] {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
	const { t } = useTranslation();

	const send = async (param: T) => {
		setIsRequestPending(true);
		try {
			await request(param);
		} catch (e) {
			const snackbar = enqueueSnackbar(t('common.error.generic'), {
				variant: 'error',
				persist: true,
				action: <SnackbarContentLayout onClose={() => closeSnackbar(snackbar)} />,
			});
		} finally {
			setIsRequestPending(false);
		}
	};

	return [isRequestPending, send];
}
