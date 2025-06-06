import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/guards/jwt.guard'
import { ApplicationsService } from './application.service'
import { CreateApplicationDto } from './dto/create-application.dto'
import { MailService } from '@/mail/email.service'

@Controller('applications')
export class ApplicationsController {
	constructor(
		private readonly applicationsService: ApplicationsService,
		private mailService: MailService
	) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAll() {
		return this.applicationsService.findAll()
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() dto: CreateApplicationDto) {
		return this.applicationsService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.applicationsService.remove(id)
	}

	@UseGuards(JwtAuthGuard)
	@Post(':id/send-email')
	async sendEmail(
		@Param('id') id: string,
		@Body() dto: { subject: string; message: string }
	) {
		const application = await this.applicationsService.findOne(id)
		await this.mailService.sendCustomEmail(
			application.email,
			dto.subject,
			dto.message
		)
		return { success: true }
	}
}
