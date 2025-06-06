import { Module } from '@nestjs/common'
import { ApplicationsController } from './application.controller'
import { ApplicationsService } from './application.service'
import { PrismaService } from '@/prisma.service'
import { MailModule } from '@/mail/email.module'
import { MailService } from '@/mail/email.service'

@Module({
	imports: [MailModule],
	controllers: [ApplicationsController],
	providers: [ApplicationsService, PrismaService, MailService]
})
export class ApplicationModule {}
