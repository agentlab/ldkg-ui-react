import { addObjects, deleteObjects, addConectionToTarget } from './baseActions';
import { Actions } from './types';
export * from './types';
export * from './utils';

export const actions: Actions = {
  'ldkg:addObjects': addObjects,
  'ldkg:deleteObjects': deleteObjects,
  'ldkg:addConectionToTarget': addConectionToTarget,
};
