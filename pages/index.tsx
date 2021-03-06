import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Container, Input, View, Text, Wrapper } from "../components";
import { getConfig } from "../services/binance";

const Index = () => {
  const router = useRouter();

  const [config, setConfigs] = useState({} as ReturnType<typeof getConfig>);
  const { apiKey, apiSecret, hasConfig } = config;

  type X = Partial<Record<"apiKey" | "apiSecret", string>>;
  const setConfig = (newConfig: X) => {
    setConfigs({ ...config, ...newConfig });
  };

  const setNewConfig = () => {
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("apiSecret", apiSecret);
    setConfigs(getConfig());
  };

  useLayoutEffect(() => {
    const d = getConfig();
    setConfigs(d);
  }, []);

  useEffect(() => {
    if (hasConfig) router.push("/app");
  }, [hasConfig]);

  if (hasConfig) null;

  return (
    <Container>
      apiKey
      <Input
        defaultValue={apiKey}
        onChangeText={(apiKey) => setConfig({ apiKey })}
      />
      apiSecret
      <Input
        defaultValue={apiSecret}
        onChangeText={(apiSecret) => setConfig({ apiSecret })}
      />
      <Button onClick={setNewConfig}>Set Config</Button>
      <View>
        <Text>To get apiKey & apiSecret, you must enable Binance API management and follow the instructions</Text>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.binance.com/en/my/settings/api-management"
        >
          https://www.binance.com/en/my/settings/api-management
        </a>
        <Text>This is an open source project</Text>
        <Text>
          This project is only bridge between your data and binance API
        </Text>
          <Text>
            This is an open source project, you can check the code bellow
          </Text>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/aprakoso98/binance-next"
        >
          https://github.com/aprakoso98/binance-next
        </a>
      </View>
    </Container>
  );
};

export default Index;
