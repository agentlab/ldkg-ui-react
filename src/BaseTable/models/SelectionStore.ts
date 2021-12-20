import { types } from 'mobx-state-tree';

const MstJsObjectWithSelection = types.model({
  item: types.frozen<any>(),
  selected: types.boolean,
});
const getId = (item: any) => item['@id'];

export const SelectionStore = types
  .model('SelectionStore', {
    selection: types.map(MstJsObjectWithSelection),
    selectionLength: 0,
  })
  .views((self: any) => {
    return {
      get isAllSelected() {
        return self.selection.size && self.selectionLength === self.selection.size;
      },
    };
  })
  .actions((self: any) => {
    return {
      isItemSelected(id: string) {
        return self.selection.get(id)?.selected;
      },
      deselectItem(id: string) {
        if (self.selection.has(id)) {
          self.selection.get(id).selected = false;
          self.selectionLength--;
        }
      },
      selectItem(id: string) {
        if (self.selection.has(id)) {
          self.selection.get(id).selected = true;
          self.selectionLength++;
        }
      },
      toggleItem(id: string) {
        return self.isItemSelected(id) ? self.deselectItem(id) : self.selectItem(id);
      },
      selectAll() {
        self.selection.forEach((item: any) => {
          item.selected = true;
          self.selectionLength = self.selection.size;
        });
      },
      deselectAll() {
        self.selection.forEach((item: any) => {
          item.selected = false;
          self.selectionLength = 0;
        });
      },
      setItems(data: any) {
        data.forEach((element: any) => {
          const id = getId(element);
          if (!self.selection.has(id)) self.selection.set(id, { item: element, selected: false });
        });
      },
      getSelectedItems() {
        return [...self.selection.values()].reduce((acc: any, selectObject: any) => {
          if (selectObject.selected) acc.push(selectObject.item);
          return acc;
        }, []);
      },
    };
  });
