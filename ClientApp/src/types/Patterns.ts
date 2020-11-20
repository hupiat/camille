import { Position, Vector } from './Commons';

export type IdentifiedElement = { id: number };

export type NamedElement = { name: string };

export type BaseElement = IdentifiedElement & NamedElement;

export type Tag = BaseElement;

export type PatternElement = BaseElement & Position & Array<{ [nextId: number]: Vector }>;

export type Pattern = BaseElement & {
  tags: Tag[];
  elements: PatternElement[];
};

export type UnexistingElement<T extends IdentifiedElement> = Omit<
  T,
  'id' | 'dateCreation'
>;
