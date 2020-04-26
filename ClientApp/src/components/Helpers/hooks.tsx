import React, { useEffect, Dispatch, useState } from "react";
import { Pattern } from "../../types/Patterns";
import { useSnackbar } from "notistack";
import SnackbarContentLayout from "../Layouts/SnackbarContentLayout";

export const useDebouncedEffect = (callback: Function, deps: any[]) =>
	useEffect(() => {
		const effect = setTimeout(callback, 300);
		return () => clearTimeout(effect);
	}, deps);

export const useSearchTrigger = (
	patterns: Pattern[],
	query: string,
	setPatternsFiltered: Dispatch<Pattern[]>
) => {
	const filterCallback = (p: Pattern) => p.name.includes(query);
	useEffect(() => {
		const filtered = patterns.filter(filterCallback);
		setPatternsFiltered(filtered);
	}, [query]);
};

export function useRequest<T>(
	request: (param: T) => Promise<any>
): [boolean, (param: T) => Promise<any>] {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [isRequestPending, setIsRequestPending] = useState<boolean>(false);

	const send = async (param: T) => {
		setIsRequestPending(true);
		try {
			await request(param);
		} catch (e) {
			const snackbar = enqueueSnackbar("Une erreur est survenue", {
				variant: "error",
				persist: true,
				action: (
					<SnackbarContentLayout
						onClose={() => closeSnackbar(snackbar)}
						details={e.message}
					/>
				),
			});
		} finally {
			setIsRequestPending(false);
		}
	};

	return [isRequestPending, send];
}

export function useRequestEffect<T>(
	request: (param?: T) => Promise<any>,
	deps: any[],
	param?: T
): boolean {
	const [isRequestPending, triggerRequest] = useRequest<T | undefined>(request);

	useEffect(() => {
		triggerRequest(param);
	}, deps);

	return isRequestPending;
}
