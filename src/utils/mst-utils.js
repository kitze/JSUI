import map from 'lodash/map';
import { types } from 'mobx-state-tree';

export const createModel = (model, value) => types.optional(model, () => model.create(value));
export const whatever = defaultValue => types.optional(types.frozen(), defaultValue);
export const typeFromEnum = (name, enumz) => types.enumeration(name, map(enumz, e => e));
