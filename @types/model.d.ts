declare namespace Model {
  interface Log {
    created_time: string;
  }

  interface History extends Log {
    user_exp: number;
    user_name: string;
  }

  interface User extends Log {
    user_id: number;
    auth_id: string;
    auth_provider: string;
    user_name: string;
    user_exp: number;
    introduction: string | null;
    email: string | null;
    refresh_token: string | null;
  }

  interface Notification extends Log {
    notification_id: number;
    user_id: number;
    notification_type: string;
    notification_title: string;
    notification_text: string;
    notification_link: string;
  }

  interface Voca {
    voca_id: number;
    user_id: number;
    lang_name: string;
    headword: string;
    word_order: number;
  }

  interface POS {
    pos_id: number;
    user_id: number;
    lang_name: string;
    pos_name: string;
    pos_text: string;
  }

  interface POSLog extends POS, Log {
    pos_log_id: number;
  }
}
