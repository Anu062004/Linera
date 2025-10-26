export interface MicroApp {
  id: string;
  name: string;
  type: 'counter' | 'poll' | 'tip_jar';
  chainId: string;
  state: any;
  createdAt: string;
}

export interface DeployRequest {
  name: string;
  type: string;
}

export interface ExecuteRequest {
  appId: string;
  action: string;
  params?: any;
}

export interface LineraChain {
  chainId: string;
  owner: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface LineraApp {
  appId: string;
  chainId: string;
  wasmBytes: Buffer;
  state: any;
}

export interface CrossChainMessage {
  id: string;
  fromChainId: string;
  toChainId: string;
  messageType: string;
  payload: any;
  timestamp: string;
  status: 'pending' | 'delivered' | 'failed';
}
