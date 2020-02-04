import { isArray, isObject } from 'lodash/fp';
import { ConnectionHandler, RecordProxy, RecordSourceSelectorProxy } from 'relay-runtime';

import { isScalar } from './utils';

interface ListRecordRemoveUpdaterOptions {
  parentId: string;
  itemId: string;
  parentFieldName: string;
  store: RecordSourceSelectorProxy;
}

interface ListRecordAddUpdaterOptions {
  parentId: string;
  item: object;
  type: string;
  parentFieldName: string;
  store: RecordSourceSelectorProxy;
}

interface OptimisticConnectionUpdaterOptions {
  parentId: string;
  store: RecordSourceSelectorProxy;
  connectionName: string;
  item: object;
  customNode: any | null;
  itemType: string;
}

interface ConnectionDeleteEdgeUpdaterOptions {
  parentId: string;
  connectionName: string;
  nodeId: string;
  store: RecordSourceSelectorProxy;
  filters?: object;
}

interface CopyObjScalarsToProxyOptions {
  object: object;
  proxy: RecordProxy;
}

export const ROOT_ID = 'client:root';

export function listRecordRemoveUpdater({ parentId, itemId, parentFieldName, store }: ListRecordRemoveUpdaterOptions) {
  const parentProxy = store.get(parentId);
  const items = parentProxy.getLinkedRecords(parentFieldName);

  parentProxy.setLinkedRecords(
    items.filter(record => record._dataID !== itemId),
    parentFieldName,
  );
}

export function listRecordAddUpdater({ parentId, item, type, parentFieldName, store }: ListRecordAddUpdaterOptions) {
  const node = store.create(item.id, type);

  Object.keys(item).forEach(key => {
    node.setValue(item[key], key);
  });

  const parentProxy = store.get(parentId);
  const items = parentProxy.getLinkedRecords(parentFieldName);

  parentProxy.setLinkedRecords([...items, node], parentFieldName);
}

interface ConnectionUpdaterParams {
  store: RecordSourceSelectorProxy;
  parentId: string;
  connectionName: string;
  edge: any;
  before?: boolean;
  filters?: object;
  cursor?: string;
}
export function connectionUpdater({
  store,
  parentId,
  connectionName,
  edge,
  before,
  filters,
  cursor,
}: ConnectionUpdaterParams) {
  if (!edge) {
    // eslint-disable-next-line no-console
    console.log('maybe you forgot to pass an edge:', edge);
    return;
  }
  if (!parentId) {
    // eslint-disable-next-line no-console
    console.log('maybe you forgot to pass a parentId:', parentId);
    return;
  }

  const parentProxy = store.get(parentId);

  const connection = ConnectionHandler.getConnection(parentProxy, connectionName, filters);

  if (!connection) {
    // eslint-disable-next-line no-console
    console.log('maybe this connection is not in relay store yet:', connectionName);
    return;
  }

  const newEndCursorOffset = connection.getValue('endCursorOffset');
  connection.setValue(newEndCursorOffset + 1, 'endCursorOffset');

  const newCount = connection.getValue('count');
  connection.setValue(newCount + 1, 'count');

  if (before) {
    ConnectionHandler.insertEdgeBefore(connection, edge, cursor);
  } else {
    ConnectionHandler.insertEdgeAfter(connection, edge, cursor);
  }
}

export function optimisticConnectionUpdater({
  parentId,
  store,
  connectionName,
  item,
  customNode,
  itemType,
}: OptimisticConnectionUpdaterOptions) {
  const node = customNode || store.create(item.id, itemType);

  !customNode &&
    Object.keys(item).forEach(key => {
      if (isScalar(item[key])) {
        node.setValue(item[key], key);
      } else {
        node.setLinkedRecord(item[key], key);
      }
    });

  const edge = store.create('client:newEdge:' + node._dataID.match(/[^:]+$/)[0], `${itemType}Edge`);
  edge.setLinkedRecord(node, 'node');

  connectionUpdater({ store, parentId, connectionName, edge });
}

export function connectionDeleteEdgeUpdater({
  parentId,
  connectionName,
  nodeId,
  store,
  filters,
}: ConnectionDeleteEdgeUpdaterOptions) {
  const parentProxy = parentId === null ? store.getRoot() : store.get(parentId);
  const connection = ConnectionHandler.getConnection(parentProxy, connectionName, filters);

  if (!connection) {
    // eslint-disable-next-line no-console
    console.log(
      `Connection ${connectionName} not found on ${parentId}, maybe this connection is not in relay store yet`,
    );
    return;
  }

  const newCount = connection.getValue('count');
  connection.setValue(newCount - 1, 'count');

  ConnectionHandler.deleteNode(connection, nodeId);
}

export function connectionTransferEdgeUpdater({
  store,
  connectionName,
  newEdge,
  sourceParentId,
  destinationParentId,
  deletedId,
  before,
  filters,
}) {
  if (newEdge) {
    // get source and destination connection
    const sourceParentProxy = store.get(sourceParentId);
    const sourceConnection = ConnectionHandler.getConnection(sourceParentProxy, connectionName, filters);

    const destinationParentProxy = store.get(destinationParentId);
    const destinationConnection = ConnectionHandler.getConnection(destinationParentProxy, connectionName, filters);

    // if source nor destination connection were found, connectionTransfer wont complete
    if (!sourceConnection || !destinationConnection) {
      // eslint-disable-next-line no-console
      console.log('maybe this connection is not in relay store yet:', connectionName);
      return;
    }

    // new edge cursor stuffs
    const newEndCursorOffset = destinationConnection.getValue('endCursorOffset');
    destinationConnection.setValue(newEndCursorOffset + 1, 'endCursorOffset');

    const newCount = destinationConnection.getValue('count');
    destinationConnection.setValue(newCount + 1, 'count');

    if (before) {
      ConnectionHandler.insertEdgeBefore(destinationConnection, newEdge);
    } else {
      ConnectionHandler.insertEdgeAfter(destinationConnection, newEdge);
    }

    ConnectionHandler.deleteNode(sourceConnection, deletedId);
  }
}

export function copyObjScalarsToProxy({ object, proxy }: CopyObjScalarsToProxyOptions) {
  Object.keys(object).forEach(key => {
    if (isObject(object[key]) || isArray(object[key])) {
      return;
    }
    proxy.setValue(object[key], key);
  });
}

interface MutationCallbackResult {
  onCompleted: (response: any) => void;
  onError: () => void;
}

interface MutationCallbackArgs {
  mutationName: string;
  successMessage?: string | ((response?: any) => string) | null;
  infoMessage?: string | ((response?: any) => string) | null;
  warningMessage?: string | ((response?: any) => string) | null;
  errorMessage: string;
  afterCompleted?: (response: any) => void;
  afterError?: () => void;
}

export const getMutationCallbacks = ({
  mutationName,
  successMessage,
  infoMessage,
  warningMessage,
  errorMessage,
  afterCompleted,
  afterError,
}: MutationCallbackArgs): MutationCallbackResult => {
  return {
    onCompleted: (response: any) => {
      const data = response[mutationName];

      if (!data || data.error) {
        // eslint-disable-next-line no-console
        console.log(data.error);
        afterError && afterError();
        return;
      }

      //eslint-disable-next-line no-console
      successMessage && console.log(typeof successMessage === 'function' ? successMessage(response) : successMessage);
      //eslint-disable-next-line no-console
      infoMessage && console.log(typeof infoMessage === 'function' ? infoMessage(response) : infoMessage);
      //eslint-disable-next-line no-console
      warningMessage && console.log(typeof warningMessage === 'function' ? warningMessage(response) : warningMessage);

      afterCompleted && afterCompleted(response);
    },
    onError: () => {
      // eslint-disable-next-line no-console
      console.log(errorMessage);
      afterError && afterError();
    },
  };
};
