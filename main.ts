import { sendMail } from './post_email';

const emailName = process.env.EMAIL_NAME;
const emailPass = process.env.EMAIL_PASS;

if (emailName && emailPass) {
    console.log("环境变量获取成功，开始发送邮件...");
    sendMail(emailName, emailPass);
} else {
    console.error("错误：未找到环境变量 EMAIL_NAME 或 EMAIL_PASS");
    process.exit(1);
}
