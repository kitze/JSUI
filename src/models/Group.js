import { types } from 'mobx-state-tree';
import uuid from 'uuid';

export default types
  .model('Group', {
    name: '',
    id: types.optional(types.identifier, () => uuid.v4())
  })
  .actions(self => ({
    setName(name) {
      self.name = name;
    }
  }));
