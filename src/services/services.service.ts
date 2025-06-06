// src/services/services.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma.service'
import { CreateServiceDto } from './dto/create-service.dto'

@Injectable()
export class ServicesService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateServiceDto) {
		return this.prisma.service.create({
			data: {
				slug: dto.slug,
				title: dto.title,
				description: dto.description,
				image: dto.image,
				fullDescription: dto.fullDescription,
				features: dto.features,
				price: dto.price
			}
		})
	}

	async findAll() {
		return this.prisma.service.findMany()
	}

	async findBySlug(slug: string) {
		return this.prisma.service.findUnique({
			where: { slug }
		})
	}
}
