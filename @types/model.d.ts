declare namespace Model {
  type User = { user: UserTable };
  type Notification = { notification: NotificationTable[] };

  interface UserTable {
    user_id: number;
    auth_id: string;
    auth_provider: string;
    user_name: string;
    user_exp: number;
    introduction: string | null;
    email: string | null;
    refresh_token: string | null;
    created_time: string;
  }

  interface NotificationTable {
    notification_id: number;
    user_id: number;
    notification_type: string;
    notification_title: string;
    notification_text: string;
    notification_link: string;
    created_time: string;
  }
}
