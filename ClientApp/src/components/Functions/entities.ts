import {
  IdentifiedElement,
  NamedElement,
  BaseElement,
} from '../../types/Patterns';

export const weakEgality = (
  item1: Partial<IdentifiedElement & NamedElement>,
  item2: Partial<IdentifiedElement & NamedElement>
): boolean => !!(item1.name === item2.name || (item1.id && item1.id === item2.id));

export const mapElementThenBreak = <T extends IdentifiedElement>(
  elements: T[],
  finder: (element: T) => boolean,
  mapper: (element: T) => void
): T[] => {
  for (const element of elements) {
    if (finder(element)) {
      mapper(element);
      break;
    }
  }
  return elements;
};

export const isExistingElement = (element: BaseElement): boolean =>
  !!(element.id && element.name);
