import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendCustomEmail(
		to: string,
		subject: string,
		text: string,
		html?: string
	) {
		await this.mailerService.sendMail({
			to,
			subject,
			text,
			html: html || text
		})
	}

	async sendApplicationNotification(email: string, applicationData: any) {
		await this.mailerService.sendMail({
			to: email,
			subject: 'Ваша заявка принята',
			template: './application',
			context: {
				userName: applicationData.userName,
				serviceName: applicationData.serviceName,
				date: new Date().toLocaleDateString('ru-RU')
			}
		})
	}
}
