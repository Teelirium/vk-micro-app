import { UserInfo } from "@vkontakte/vk-bridge";
import { makeAutoObservable, runInAction } from "mobx";
import vkBridge from "../vkBridge";

class User {
    loading = false;
    user: UserInfo | null = null; 
    constructor() {
        makeAutoObservable(this);
    }
    fetchUser() {
        this.loading = true;
        setTimeout(() => {            
            vkBridge.send('VKWebAppGetUserInfo')
            .then(user => {
                runInAction(() => {
                    this.user = user;
                    this.loading = false;
                });
            });
        }, 500);
    }
}

export default new User();