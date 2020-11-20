import { URL_PREFIX } from '../../config';
import { NamedElement } from '../../types/Patterns';

export const namesWithCommas = (elements: NamedElement[]) =>
  elements.map((e) => e.name).join(', ');

export const request = (suffix: string) => `${URL_PREFIX}/${suffix}`;