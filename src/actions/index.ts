import { addObjects, deleteObjects, addConectionToTarget, addTreeObj } from './baseActions';
import { Actions } from './types';
export * from './types';
export * from './utils';

export const actions: Actions = {
  'ldkg:addObjects': addObjects,
  'ldkg:deleteObjects': deleteObjects,
  'ldkg:addConectionToTarget': addConectionToTarget,
  'ldkg:addTreeObj': addTreeObj,
};
