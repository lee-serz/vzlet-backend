// src/services/services.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ServicesService } from './services.service'
import { CreateServiceDto } from './dto/create-service.dto'

@Controller('services')
export class ServicesController {
	constructor(private readonly servicesService: ServicesService) {}

	@Post()
	async create(@Body() dto: CreateServiceDto) {
		return this.servicesService.create(dto)
	}

	@Get()
	async findAll() {
		return this.servicesService.findAll()
	}

	@Get(':slug')
	async findOne(@Param('slug') slug: string) {
		return this.servicesService.findBySlug(slug)
	}
}
