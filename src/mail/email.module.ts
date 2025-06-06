import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { MailService } from './email.service'

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async (config: ConfigService) => ({
				transport: {
					host: config.get('MAIL_HOST'),
					port: config.get('MAIL_PORT'),
					secure: false, // Для портов 587 (TLS) установите false
					ignoreTLS: false, // Не игнорировать TLS
					requireTLS: true, // Требовать TLS для порта 587
					connectionTimeout: 10000, // Таймаут подключения 10 сек
					greetingTimeout: 10000, // Таймаут приветствия 10 сек
					auth: {
						user: config.get('MAIL_USER'),
						pass: config.get('MAIL_PASSWORD')
					}
				},
				defaults: {
					from: `"Сервис" <${config.get('MAIL_FROM')}>`
				}
			}),
			inject: [ConfigService]
		})
	],
	providers: [MailService],
	exports: [MailService]
})
export class MailModule {}
