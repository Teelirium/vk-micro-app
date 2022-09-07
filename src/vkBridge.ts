import bridgeMock from '@vkontakte/vk-bridge-mock';
import bridge from '@vkontakte/vk-bridge';
export default (process.env.NODE_ENV === 'production' ? bridge : bridgeMock);