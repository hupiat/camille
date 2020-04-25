type BaseElement = {
	id: number;
	name: string;
	dateCreation: Date;
};

export type Tag = BaseElement;

export type PatternElement = BaseElement & {
	nextElementsIds: number[];
};

export type Pattern = BaseElement & {
	tags: Tag[];
	elements: PatternElement[];
};
