import nodemailer from 'nodemailer';

export async function sendMail(user: string, pass: string) {
  // 1. 创建传输器
  const transporter = nodemailer.createTransport({
    host: 'smtp.126.com',
    port: 465,
    secure: true, // 465 端口通常使用 SSL
    auth: {
      user: user,
      pass: pass,
    },
  });

  try {
    // 2. 配置邮件内容
    const info = await transporter.sendMail({
      from: `Epic Game喜加一<${user}>`, // 发件人地址
      to: 'smileheart0708@163.com',
      subject: 'Epic Game新的限时免费游戏来了！', 
      text: '你好，这是通过 Bun 自动运行发送的邮件text。', 
      html: '<b>你好</b>，这是通过 Bun 自动运行发送的邮件。', // 支持 HTML
    });

    console.log('邮件发送成功:', info.messageId);
  } catch (error) {
    console.error('发送失败:', error);
  }
}