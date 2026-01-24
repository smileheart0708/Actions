import { sendMail } from './post_email';

// 定义所需的环境变量列表
const requiredEnvVars = ['EMAIL_NAME', 'EMAIL_PASS'] as const;

// 检查缺失的环境变量
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error(`错误：缺少以下环境变量: ${missingVars.join(', ')}`);
    console.error('请确保已设置所有必需的环境变量');
    process.exit(1);
}

// 所有环境变量都存在，继续执行
console.log("环境变量获取成功，开始发送邮件...");
const emailName = process.env.EMAIL_NAME!;
const emailPass = process.env.EMAIL_PASS!;
sendMail(emailName, emailPass);
