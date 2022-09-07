import PropTypes from "prop-types";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
} from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import { UserInfo } from "@vkontakte/vk-bridge";

type Props = {
  id: string,
  user: UserInfo,
  go: any,
}

function Home({ id, go, user }: Props) {
  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {user && (
        <Group header={<Header mode='primary'>Пользователь</Header>}>
          <Cell
            before={
              user.photo_200 ? (
                <Avatar src={user.photo_200} />
              ) : null
            }
            description={
              user.city && user.city.title
                ? user.city.title
                : ""
            }
          >
            {`${user.first_name} ${user.last_name}`}
          </Cell>
          <Div>
            <Button size='l' mode='primary' onClick={go} data-to='persik'>
              Друзья пользователя
            </Button>
          </Div>
        </Group>
      )}
    </Panel>
  );
}

export default observer(Home);
