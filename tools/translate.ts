export interface TranslateResponse {
  code: number;
  message: string;
  data: {
    source: {
      text: string;
      type: string;
      type_desc: string;
      pronounce: string;
    };
    target: {
      text: string;
      type: string;
      type_desc: string;
      pronounce: string;
    };
  };
}

import { API_BASE_URL, TRANSLATE_ENDPOINT } from '../main';
const TARGET_LANG = 'zh-CHS' as const;

export async function translate(text: string): Promise<string> {
  const url = `${API_BASE_URL}${TRANSLATE_ENDPOINT}?text=${encodeURIComponent(text)}&target=${TARGET_LANG}`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`翻译请求失败: ${response.status} ${response.statusText}`);
  }

  const json: TranslateResponse = await response.json() as TranslateResponse;

  if (json.code !== 200) {
    throw new Error(`翻译失败: ${json.message}`);
  }

  return json.data.target.text;
}
