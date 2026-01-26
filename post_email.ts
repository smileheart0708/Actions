import nodemailer from 'nodemailer';

export async function sendMail(user: string, pass: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.126.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `Epic Game喜加一<${user}>`,
      to: 'smileheart0708@163.com',
      subject: 'Epic Game新的限时免费游戏来了！',
      html: html,
    });

    console.log('[INFO] 邮件发送成功:', info.messageId);
  } catch (error) {
    console.error('[ERROR] 发送失败:', error);
    throw error;
  }
}