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
    voca_order: number;
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

  interface Meaning {
    meaning_id: number;
    user_id: number;
    voca_id: number;
    pos_id: number;
    meaning_order: number;
    meaning_text: string;
  }

  interface Example {
    example_id: number;
    user_id: number;
    meaning_id: number;
    example_order: number;
    example_text: string;
    example_translation: string;
  }

  interface MeaningList {
    pos_name: string | null;
    meanings: (Meaning & { examples: Example[] | null })[];
  }

  interface Cognate {
    cognate_id: number;
    user_id: number;
    voca1_id: number;
    voca2_id: number;
  }

  interface Synonym {
    synonym_id: number;
    user_id: number;
    voca1_id: number;
    voca2_id: number;
  }

  interface Antonym {
    antonym_id: number;
    user_id: number;
    voca1_id: number;
    voca2_id: number;
  }

  interface Etymology extends Log {
    etymology_id: number;
    user_id: number;
    voca_id: number;
    etymology_text: string;
  }

  interface VocaInfo {
    voca_id: number;
    is_unique: boolean;
    meanings: Model.MeaningList[];
    cognates: Model.Voca[];
    synonyms: Model.Voca[];
    antonyms: Model.Voca[];
    etymology: Model.Etymology;
  }
}
