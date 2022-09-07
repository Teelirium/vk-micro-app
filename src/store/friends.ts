import { UserInfo } from "@vkontakte/vk-bridge";
import { makeAutoObservable, runInAction } from "mobx";
import vkBridge from "../vkBridge";

class Friends {
    loading = false
    friends: UserInfo[] = []
    constructor() {
        makeAutoObservable(this);
    }
    fetchFriends() {
        this.loading = true;
        setTimeout(() => {            
            vkBridge.send('VKWebAppGetFriends', {})
            .then((resp: any) => {
                //console.log(resp);
                runInAction(() => this.friends = resp.users);
                runInAction(() => this.loading = false);
            });
        }, 1000);
    }
}   

export default new Friends();