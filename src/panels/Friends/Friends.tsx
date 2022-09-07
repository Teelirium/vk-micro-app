import { useEffect } from "react";
import {
  Avatar,
  Cell,
  Group,
  Header,
  List,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import friends from "../../store/friends";
import st from "./Friends.module.scss";
import { observer } from "mobx-react-lite";
import { UserInfo } from "@vkontakte/vk-bridge";

type Props = {
  id: string;
  user: UserInfo;
  go: any;
};

function Friends(props: Props) {
  useEffect(() => {
    friends.fetchFriends();
  }, []);

  return (
    <Panel id={props.id}>
      <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to='home' />}>
        Друзья
      </PanelHeader>
      <Group
        header={
          <Header mode='primary'>
            Друзья пользователя {props.user.first_name} {props.user.last_name}
          </Header>
        }
      >
        <List className={st.list}>
          {!friends.loading &&
            friends.friends.map((friend) => (
              <Cell
                key={friend.id}
                before={
                  friend.photo_200 ? <Avatar src={friend.photo_200} /> : null
                }
              >
                {friend.first_name} {friend.last_name}
              </Cell>
            ))}
        </List>
      </Group>
    </Panel>
  );
}

export default observer(Friends);
