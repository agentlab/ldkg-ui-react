import { useState, useCallback, useEffect } from 'react';
import { Key } from 'rc-tree/lib/interface';
import { Popup } from '../../../../hooks/usePopupState';
import { TreeItem } from '../../types';

type Props<T extends TreeItem<T>> = {
  dataSource: T[];
  contextMenu: Popup;
  saveReqDialog: Popup;
  editing: boolean;
  titlePropName: string;
  viewKindElement: any;
  onCreateFolder: (newFolder: any) => void;
  onDeleteFolder: (id: string) => Promise<void>;
  onSelect: (data: T) => void;
};

type ReturnShape<T> = {
  treeData: T[];
  setTreeData: (data: T[]) => void;
  selection: T | undefined;
  setSelection: (selected: T) => void;
  expandedKeys: Key[];
  setExpandedKeys: (keys: Key[]) => void;
  baseExpandedKeys: Key[];
  setBaseExpandedKeys: (keys: Key[]) => void;
  autoExpandParent: boolean;
  onExpand: (expandedKeys: Key[]) => void;
  onContextMenu: (event: any) => void;
  onCreateDirectory: (parentId: string) => Promise<void>;
  onDeleteDirectory: (id: string) => Promise<void>;
  onChange: (keys: any, ev: any) => void;
};

export function useTree<T extends { children?: T[]; key: Key }>({
  dataSource,
  contextMenu,
  saveReqDialog,
  editing,
  titlePropName,
  onCreateFolder,
  onDeleteFolder,
  onSelect,
  viewKindElement,
}: Props<T>): ReturnShape<T> {
  const [treeData, setTreeData] = useState(dataSource);
  const [selection, setSelection] = useState<T>();
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [baseExpandedKeys, setBaseExpandedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = useCallback(
    (expandedKeys: Key[]) => {
      setExpandedKeys(expandedKeys);
      setBaseExpandedKeys(expandedKeys);
      setAutoExpandParent(false);
    },
    [setExpandedKeys, setBaseExpandedKeys, setAutoExpandParent],
  );

  const onCreateDirectory = useCallback(
    async (parentId: string) => {
      await onCreateFolder({
        [titlePropName]: 'new',
        [viewKindElement?.options.treeNodeParentKey || 'parent']: parentId,
      });
    },
    [onCreateFolder, titlePropName, viewKindElement],
  );

  const onDeleteDirectory = useCallback(
    async (id: string) => {
      await onDeleteFolder(id);
    },
    [onDeleteFolder],
  );

  const onContextMenu = useCallback(({ event, node }: any) => {
    event.preventDefault();
    if (!contextMenu.isPopupVisible) {
      document.addEventListener(`click`, function onClickOutside() {
        contextMenu.open();
        document.removeEventListener(`click`, onClickOutside);
      });
    }
    contextMenu.open();
    contextMenu.setPopupCoords({ x: event.clientX, y: event.clientY });
  }, []);

  const onChange = useCallback(
    (keys: any, ev: any) => {
      if (!editing) {
        const newData = ev.node;
        setSelection(newData);
        setBaseExpandedKeys(expandedKeys);
        onSelect(newData);
      } else {
        saveReqDialog.open();
      }
    },
    [setSelection, setBaseExpandedKeys, onSelect, saveReqDialog],
  );

  useEffect(() => {
    setTreeData(dataSource);
  }, [dataSource]);

  return {
    treeData,
    setTreeData,
    selection,
    setSelection,
    expandedKeys,
    setExpandedKeys,
    baseExpandedKeys,
    setBaseExpandedKeys,
    autoExpandParent,
    onExpand,
    onChange,
    onContextMenu,
    onCreateDirectory,
    onDeleteDirectory,
  };
}
