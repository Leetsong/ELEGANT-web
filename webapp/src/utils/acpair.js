function apiMethod2Signature(api) {
  var cls = `${api.pkg}.${api.iface}`;
  var ret = api.ret.pkg && api.ret.pkg !== ''
    ? `${api.ret.pkg}.${api.ret.iface}`
    : `${api.ret.iface}`;
  var params = "";

  if (api.paramList && api.paramList.length !== 0) {
    for (var i = 0; i < api.paramList.length; i++) {
      if (i != 0) {
        params += ",";
      }
      params += api.paramList[i].pkg && api.paramList[i].pkg !== ''
        ? `${api.paramList[i].pkg}.${api.paramList[i].iface}`
        : `${api.paramList[i].iface}`;
    }
  }

  return `<${cls}: ${ret} ${api.method}(${params})>`
}

function apiIface2Signature(api) {
  console.warn("Unsupported now");
  return JSON.stringify(api);
}

function apiField2Signature(api) {
  console.warn("Unsupported now");
  return JSON.stringify(api);
}

function signature2ApiMethod(signature) {
  const sigReg = /^<(.*?): (.*?) (.*?)\((.*?)\)>$/;

  var extracted = sigReg.exec(signature);

  var cls = extracted[1].split('.');
  var ret = extracted[2].split('.');
  var methodName = extracted[3];
  var paramList = extracted[4] === '' ? [] : extracted[4].split(',');

  var api = {
    '@type': 'method',
    pkg: '',
    iface: '',
    method: '',
    ret: {
      pkg: '',
      iface: ''
    },
    paramList: [
      {
        pkg: '',
        iface: ''
      }
    ]
  };

  api.pkg = cls.length === 1
    ? "" : cls.slice(0, cls.length - 1).join('.');
  api.iface = cls[cls.length - 1];

  api.method = methodName;

  api.ret.pkg = ret.length === 1
    ? "" : ret.slice(0, ret.length - 1).join('.');
  api.ret.iface = ret[ret.length - 1];

  for (var i = 0; i < paramList.length; i ++) {
    var cc = paramList[i].split('.');
    api.paramList[i] = {
      pkg: cc.length === 1
        ? "" : cc.slice(0, cc.length - 1).join('.'),
      iface: cc[cc.length - 1]
    };
  }

  return api;
}

function signature2ApiIface(signature) {
  console.warn("Unsupported now");
  return null;
}

function signature2ApiField(signature) {
  console.warn("Unsupported now");
  return null;
}

export function api2Signature(api) {
  switch (api['@type']) {
    case 'method': return apiMethod2Signature(api);
    case 'iface': return apiIface2Signature(api);
    case 'field': return apiField2Signature(api);
    default: console.error("Only 'method', 'iface', and 'field' are valid");
  }
}

export function signature2Api(type, signature) {
  switch (type) {
    case 'method': return signature2ApiMethod(signature);
    case 'iface': return signature2ApiIface(signature);
    case 'field': return signature2ApiField(signature);
    default: console.error("Only 'method', 'iface', and 'field' are valid");
  }
}
