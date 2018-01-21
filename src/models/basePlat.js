import {platService} from '../utils/request';
import baseService from '../utils/baseService';

export default (namespace, serviceRootPath, methodNameSuffix) => {
  return baseService(platService, namespace, serviceRootPath, methodNameSuffix);
}
