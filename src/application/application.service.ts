import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma.service'
import { CreateApplicationDto } from './dto/create-application.dto'
import { MailService } from '@/mail/email.service'

@Injectable()
export class ApplicationsService {
	constructor(
		private prisma: PrismaService,
		private mailService: MailService
	) {}

	async create(dto: CreateApplicationDto) {
		const application = await this.prisma.application.create({
			data: {
				serviceSlug: dto.serviceSlug,
				serviceName: dto.serviceName,
				userName: dto.userName,
				phone: dto.phone,
				email: dto.email,
				comment: dto.comment,
				userId: dto.userId
			}
		})
		return application
	}

	async findAll() {
		return this.prisma.application.findMany({
			orderBy: { createdAt: 'desc' },
			include: {
				user: { select: { id: true, email: true } }
			}
		})
	}

	async findOne(id: string) {
		return this.prisma.application.findUnique({
			where: { id }
		})
	}

	async remove(id: string) {
		return this.prisma.application.delete({
			where: { id },
			select: { id: true }
		})
	}
}
