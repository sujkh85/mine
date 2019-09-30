import IconService, { HttpProvider, IconBuilder } from "icon-sdk-js";

let provider;
if (process && process.env && process.env.NODE_ENV === "development") {
  provider = new HttpProvider("https://bicon.net.solidwallet.io/api/v3");
} else {
  provider = new HttpProvider("https://wallet.icon.foundation/api/v3");
}

const iconService = new IconService(provider);

const {
  CallBuilder,
  CallTransactionBuilder,
  IcxTransactionBuilder
} = IconBuilder;

const callBuild = ({ from, method, to, params = {} } = {}) => {
  const callBuilder = new CallBuilder();
  const obj = callBuilder
    .from(from)
    .to(to)
    .method(method)
    .params(params)
    .build();
  return obj;
};

const sendTxBuild2 = ({
  from,
  to,
  networkId = "0x3",
  stepLimit = "0x493e0",
  value = "0x0"
} = {}) => {
  const TransactionBuilder = new IcxTransactionBuilder();
  const obj = TransactionBuilder.nid(networkId)
    .from(from)
    .to(to)
    .stepLimit(stepLimit)
    .value(value)
    .timestamp(`0x${(new Date().getTime() * 1000).toString(16)}`)
    .version("0x3")
    .build();

  return {
    jsonrpc: "2.0",
    method: "icx_sendTransaction",
    params: obj,
    id: 1
  };
};

const sendTxBuild = ({
  from,
  to,
  method,
  params = {},
  networkId = "0x3",
  stepLimit = "0x493e0",
  value = "0x0"
} = {}) => {
  const callTransactionBuilder = new CallTransactionBuilder();
  const obj = callTransactionBuilder
    .nid(networkId)
    .from(from)
    .to(to)
    .stepLimit(stepLimit)
    .value(value)
    .timestamp(`0x${(new Date().getTime() * 1000).toString(16)}`)
    .method(method)
    .params(params)
    .version("0x3")
    .build();

  return {
    jsonrpc: "2.0",
    method: "icx_sendTransaction",
    params: obj,
    id: 1
  };
};

export default {
  iconService,
  callBuild,
  sendTxBuild,
  sendTxBuild2
};
