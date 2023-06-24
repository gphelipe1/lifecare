import { notification } from "antd";
import { IconType } from "antd/es/notification/interface";

const NotificationPopup = (message: string, type: IconType) => {
    notification.open({
        message: message,
        type: type,
    });
};

export default NotificationPopup;