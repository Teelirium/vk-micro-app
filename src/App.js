import bridge from "@vkontakte/vk-bridge-mock";
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  ScreenSpinner,
  SplitCol,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Friends from "./panels/Friends/Friends";
import Home from "./panels/Home/Home";
import friends from "./store/friends";
import user from "./store/user";

const spinner = <ScreenSpinner size='large' />;

function App() {
  const loadingStates = [friends.loading, user.loading];
  const [scheme, setScheme] = useState("bright_light");
  const [activePanel, setActivePanel] = useState("home");
  const [popout, setPopout] = useState(null);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        setScheme(data.scheme);
      }
    });
    user.fetchUser();
  }, []);

  useEffect(() => {
    setPopout(loadingStates.some((val) => val) ? spinner : null);
  }, loadingStates);

  const goTo = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider scheme={scheme}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id='home' 
                  go={goTo} 
                  user={user.user} 
                />
                <Friends id='persik' 
                  go={goTo} 
                  user={user.user} 
                />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default observer(App);
