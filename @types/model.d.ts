declare namespace Model {
  type User = { user: Partial<UserTable> };
  type Notification = { notification: Partial<NotificationTable>[] };

  interface UserTable {
    user_id: number;
    auth_id: string;
    auth_provider: string;
    user_name: string;
    user_exp: number;
    introduction: string | null;
    email: string | null;
    refresh_token: string | null;
    created_time: Date;
  }

  interface NotificationTable {
    notification_id: number;
    user_id: number;
    notification_text: string;
    notification_link: string;
    checked: boolean;
    created_time: Date;
  }
}
