export const NOTIF_WISHLIST_CHANGED = 'notif_wishlist_changed'

let instance = null
var observers = {}

class NotificationService {

    constructor() {
        if (!instance) {
            instance = this
        }
        return instance;
    }

    postNotification = (name, data) => {
        let obs = observers[name];
        for (var x = 0; x < obs.length; x++) {
            var obj = obs[x];
            obj.callBack(data);
        }
    }

    addObserver = (name, observer, callBack) => {
        let obs = observers[name]

        if (!obs) {
            observers[name] = [];
        }

        let obj = { observer: observer, callBack: callBack }
        observers[name].push(obj);

    }

    removeObserver = (observer, name) => {
        var obs = observers[name]
        if (obs) {
            for (var x = 0; x < obs.length; x++) {
                if (obs[x].observer === observer) {
                    obs.slice(x, 1)
                    observers[name] = obs
                    break;
                }
            }
        }
    }
}

export default NotificationService