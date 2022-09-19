declare namespace Model {
  type User = { user: UserTable };
  type Notification = { notification: NotificationTable[] };
  type VocaCount = { count: (VocaTable & { count: number })[] };

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

  interface VocaTable {
    voca_id: number;
    user_id: number;
    lang_name: string;
    word: string;
    word_order: number;
    created_time: string;
  }
}
