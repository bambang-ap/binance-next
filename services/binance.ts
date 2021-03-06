import { Spot, SpotMethods } from "@binance/connector";
import axios from "axios";
import binanceApiNode, { Binance as BinanceMethods } from "binance-api-node";
import defaultConfig from "../config.json";

export type BinanceTarget = Exclude<keyof BinanceMethods, "ws">;
export type BinanceRet<T extends BinanceTarget> = ReturnType<BinanceMethods[T]>;
export type BinanceParams<T extends BinanceTarget> = Parameters<
  BinanceMethods[T]
>;
export type BinanceConfig = Exclude<
  Parameters<typeof binanceApiNode>[0],
  undefined
>;

export type BTarget = keyof SpotMethods;
export type BRet<T extends BTarget> = ReturnType<SpotMethods[T]>;
export type BParams<T extends BTarget> = Parameters<SpotMethods[T]>;
export type BConfig = ConstructorParameters<typeof Spot>;

export const clientRequest = <T extends BinanceTarget>(
  target: T,
  params?: BinanceParams<T>
) => {
  const { xApiKey, xApiSignature } = defaultConfig;
  const { apiKey, apiSecret } = getConfig();

  return axios.post<Awaited<BinanceRet<T>>>(`/api/${target}`, params, {
    headers: {
      "X-API-Key": xApiKey,
      "X-API-Signature": xApiSignature,
      "API-Key": apiKey,
      "API-Secret": apiSecret,
    },
  });
};

export const clientRequestConnector = <T extends BTarget>(
  target: T,
  params?: BParams<T>
) => {
  const { xApiKey, xApiSignature } = defaultConfig;
  const { apiKey, apiSecret } = getConfig();

  return axios.post<Awaited<BRet<T>>>(`/api/connector/${target}`, params, {
    headers: {
      "X-API-Key": xApiKey,
      "X-API-Signature": xApiSignature,
      "API-Key": apiKey,
      "API-Secret": apiSecret,
    },
  });
};

export const getConfig = () => {
  return {
    apiKey: localStorage.getItem("apiKey") ?? "",
    apiSecret: localStorage.getItem("apiSecret") ?? "",
    get hasApiKey() {
      return this.apiKey.length > 0;
    },
    get hasApiSecret() {
      return this.apiSecret.length > 0;
    },
    get hasConfig() {
      return this.hasApiKey && this.hasApiSecret;
    },
  };
};

const Binance = <T extends BinanceTarget>(
  config: BinanceConfig,
  target: T,
  params?: BinanceParams<T>
): BinanceRet<T> => {
  const p = Array.isArray(params) ? params : [];
  const client = binanceApiNode(config);
  // @ts-ignore
  return client[target]?.(...p);
};

export default Binance;
