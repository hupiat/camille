import { Position, Vector } from './Commons';

export type IdentifiedElement = { id: number };

export type NamedElement = { name: string };

export type DatedElement = { dateCreation: Date };

export type BaseElement = IdentifiedElement & NamedElement & DatedElement;

export type Tag = BaseElement;

export type PatternElement = BaseElement & Position & Array<{ [nextId: number]: Vector }>;

export type Pattern = BaseElement & {
	tags: Tag[];
	elements: PatternElement[];
};

export type UnexistingElement<T extends IdentifiedElement & DatedElement> = Omit<
	T,
	'id' | 'dateCreation'
>;
