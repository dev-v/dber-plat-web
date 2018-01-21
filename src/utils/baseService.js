export default (service,namespace, serviceRootPath, methodNameSuffix = '') => {
  return {
    namespace,
    state: {},
    reducers: {},
    effects: {
      * [`query${methodNameSuffix}`]({page, condition}, {call}) {
        return (yield call(service.post,
          `${serviceRootPath}/query/${page}`, condition)).response;
      },
      * [`queryWithoutPage${methodNameSuffix}`]({condition}, {call}) {
        return (yield call(service.post, `${serviceRootPath}/query`,
          condition)).response;
      },
      * [`del${methodNameSuffix}`]({id}, {call}) {
        return (yield call(service.get,
          `${serviceRootPath}/del/${id}`)).response;
      },
      * [`delWithCondition${methodNameSuffix}`]({condition}, {call}) {
        return (yield call(service.post,
          `${serviceRootPath}/delWithCondition`, condition)).response;
      },
      * [`save${methodNameSuffix}`]({data}, {call}) {
        return (yield call(service.post, `${serviceRootPath}/save`,
          data)).response;
      },
      * [`get${methodNameSuffix}`]({id}, {call}) {
        return (yield call(service.get,
          `${serviceRootPath}/get/${id}`)).response;
      },
    },
  };
}
