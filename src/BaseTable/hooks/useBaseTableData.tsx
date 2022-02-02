import { useContext, useCallback, useMemo } from 'react';
import { MstContext } from '../..//MstContext';
import { processViewKindOverride } from '../../Form';
import { applySnapshot, getSnapshot } from 'mobx-state-tree';
import { mapViewKindPropsToActions } from '../../actions';

export const useTableData = ({ viewKindElement: baseViewKindElement, viewDescr, actions }: any) => {
  const { store } = useContext(MstContext);
  const [id, collIri, collIriOverride, inCollPath, viewKindElement, viewDescrElement] = processViewKindOverride(
    { viewKindElement: baseViewKindElement, viewDescr },
    store,
  );

  const viewOptions = useMemo(() => viewKindElement.options || {}, [viewKindElement]);
  const coll = useMemo(() => store.getColl(collIriOverride), [collIriOverride, store]);

  const actionsMap = useMemo(
    () => mapViewKindPropsToActions({ actions, viewKindActionProps: viewOptions.selectActions, coll, root: store }),
    [store, coll, actions, viewOptions],
  );

  const handleEndReached = useCallback(() => {
    if (!coll.isLoading) {
      coll.loadMore();
    }
  }, [coll]);

  const onSelect = useCallback(
    (data: any) => {
      const withConnections = viewOptions.connections;
      if (data && data.length) {
        store.setSelectedData(collIriOverride, data[0]);
        withConnections && store.editConn(withConnections, data[0]);
      }
    },
    [store, viewOptions, collIriOverride],
  );
  //заглушка
  const setData = useCallback(
    (cb: any) => {
      const newData = cb(getSnapshot<any>(coll?.data));
      applySnapshot(coll?.data, newData);
    },
    [coll],
  );

  const getCollConstrJs = useCallback(() => {
    return getSnapshot(coll.collConstr);
  }, [coll.collConstr]);

  const setCollConstrJs = useCallback(
    (collConstr: any) => {
      applySnapshot(coll.collConstr, collConstr);
    },
    [coll.collConstr],
  );

  return {
    sourceData: getSnapshot<any>(coll?.data) || [],
    isLoading: coll.isLoading,
    viewOptions,
    actionsMap,
    handleEndReached,
    onSelect,
    setData,
    getCollConstrJs,
    setCollConstrJs,
  };
};
