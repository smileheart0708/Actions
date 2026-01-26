// email_template.ts

// 1. 定义接口，对应你提供的 API data 结构
export interface EpicGameItem {
  id: string;
  title: string;
  cover: string;
  original_price_desc: string;
  description: string;
  is_free_now: boolean;
  free_end: string;
  free_start: string;
  link: string;
}

// 2. 样式常量配置（方便后期微调）
const THEME = {
  bg: '#09090b',          // 极深背景
  cardBg: '#18181b',      // 卡片背景
  textMain: '#ffffff',    // 主文字
  textSub: '#a1a1aa',     // 副文字
  accent: '#3b82f6',      // 科技蓝 (Tailwind Blue-500)
  accentHover: '#2563eb', // 深蓝
  badgeFree: '#22c55e',   // 绿色 (表示正在进行)
  badgeWait: '#f59e0b',   // 橙色 (表示即将开始)
  border: '#27272a'       // 边框色
};

// 3. 辅助函数：生成单个游戏卡片的 HTML
const renderGameCard = (game: EpicGameItem) => {
  // 判断状态文案和颜色
  const statusText = game.is_free_now ? 'AVAILABLE NOW' : 'COMING SOON';
  const statusColor = game.is_free_now ? THEME.badgeFree : THEME.badgeWait;
  const dateInfo = game.is_free_now 
    ? `截止: ${game.free_end.split(' ')[0]}` 
    : `开始: ${game.free_start.split(' ')[0]}`;

  return `
    <tr>
      <td style="padding-bottom: 30px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${THEME.cardBg}; border: 1px solid ${THEME.border}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);">
          <tr>
            <td style="width: 100%; height: 200px; background-image: url('${game.cover}'); background-size: cover; background-position: center; background-repeat: no-repeat; background-color: #333;">
              </td>
          </tr>
          
          <tr>
            <td style="padding: 24px;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 4px 12px; background-color: ${statusColor}20; border: 1px solid ${statusColor}; border-radius: 4px;">
                    <span style="font-size: 12px; font-weight: bold; color: ${statusColor}; letter-spacing: 1px;">${statusText}</span>
                  </td>
                </tr>
              </table>

              <h2 style="margin: 16px 0 8px 0; color: ${THEME.textMain}; font-size: 24px; font-weight: 700; font-family: 'Helvetica Neue', Arial, sans-serif;">${game.title}</h2>
              
              <p style="margin: 0 0 16px 0;">
                <span style="text-decoration: line-through; color: ${THEME.textSub}; font-size: 14px; margin-right: 8px;">${game.original_price_desc}</span>
                <span style="color: ${THEME.textMain}; font-size: 18px; font-weight: bold;">FREE</span>
              </p>

              <p style="margin: 0 0 24px 0; color: ${THEME.textSub}; font-size: 14px; line-height: 1.6;">${game.description}</p>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <a href="${game.link}" target="_blank" style="display: block; width: 100%; text-align: center; background-color: ${THEME.accent}; color: #ffffff; padding: 14px 0; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; box-shadow: 0 0 15px ${THEME.accent}40;">
                      立即领取 / GET IT
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding-top: 12px;">
                    <span style="color: ${THEME.textSub}; font-size: 12px;">${dateInfo}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    `;
};

// 4. 导出主函数
export const generateEmailHtml = (games: EpicGameItem[]): string => {
  const gamesHtml = games.map(game => renderGameCard(game)).join('');

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Epic Free Games</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${THEME.bg}; -webkit-font-smoothing: antialiased;">
  
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${THEME.bg};">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px;">
          
          <tr>
            <td style="padding-bottom: 30px; text-align: center;">
              <h1 style="margin: 0; color: ${THEME.textMain}; font-family: 'Arial Black', Arial, sans-serif; font-size: 28px; letter-spacing: -1px;">
                EPIC <span style="color: ${THEME.accent};">GAMES</span> ALERT
              </h1>
              <p style="margin: 8px 0 0 0; color: ${THEME.textSub}; font-size: 14px;">本周喜加一更新 · 自动推送</p>
            </td>
          </tr>

          ${gamesHtml}

          <tr>
            <td style="padding-top: 20px; text-align: center; border-top: 1px solid ${THEME.border};">
              <p style="margin: 0; color: #52525b; font-size: 12px;">
                Powered by Bun Runtime<br>
                ${new Date().toLocaleDateString()} Daily Check
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
};