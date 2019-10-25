import { types } from 'mobx-state-tree';

export default types
  .model('String', {
    value: types.maybeNull(types.string)
  })
  .actions(self => {
    return {
      clear() {
        self.value = undefined;
      },
      setValue(s) {
        self.value = s;
      }
    };
  })
  .views(self => ({
    get hasValue() {
      return self.value && self.value.trim() !== '';
    }
  }));
