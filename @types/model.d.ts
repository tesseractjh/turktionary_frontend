declare namespace Model {
  type User = { user: UserTable };
  type Notification = { notification: NotificationTable[] };
  type VocaCount = { count: (VocaTable & { count: number })[] };
  type POSList = POSTable & {
    examples: (string | null)[];
    example_orders: (number | null)[];
  };
  type POS = { pos: POSTable };

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

  interface POSTable {
    pos_id: number;
    user_id: number;
    lang_name: string;
    pos_name: string;
    pos_text: string;
    pos_order: number;
    created_time: Date;
  }
}
