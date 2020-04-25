import { useEffect, Dispatch } from "react";
import { Pattern } from "../../types/Patterns";

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
