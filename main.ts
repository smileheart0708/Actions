import { sendMail } from './post_email';
import { generateEmailHtml, type EpicGameItem } from './email_epic_template';

export const API_BASE_URL = 'https://60s.viki.moe' as const;
export const API_ENDPOINT = '/v2/epic' as const;
export const TRANSLATE_ENDPOINT = '/v2/fanyi' as const;

const requiredEnvVars = ['EMAIL_NAME', 'EMAIL_PASS'] as const;

interface ApiResponse {
  code: number;
  message: string;
  data: EpicGameItem[];
}

async function fetchEpicGames(): Promise<EpicGameItem[]> {
  const url = `${API_BASE_URL}${API_ENDPOINT}`;
  console.log(`正在请求: ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
  }

  const json: ApiResponse = await response.json() as ApiResponse;

  if (json.code !== 200) {
    throw new Error(`API返回错误: ${json.message}`);
  }

  return json.data;
}

async function main() {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error(`[ERROR] 缺少以下环境变量: ${missingVars.join(', ')}`);
    process.exit(1);
  }

  console.log('[INFO] 环境变量获取成功');

  try {
    const games = await fetchEpicGames();
    console.log(`[INFO] 获取到 ${games.length} 个游戏`);

    const html = await generateEmailHtml(games);
    const emailName = process.env.EMAIL_NAME!;
    const emailPass = process.env.EMAIL_PASS!;

    await sendMail(emailName, emailPass, html);
    console.log('[OK] 邮件发送完成');
  } catch (error) {
    console.error('[ERROR]', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
