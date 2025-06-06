// src/services/dto/create-service.dto.ts
import { IsString, IsArray, IsOptional } from 'class-validator'

export class CreateServiceDto {
	@IsString()
	slug: string

	@IsString()
	title: string

	@IsString()
	description: string

	@IsString()
	image: string

	@IsString()
	fullDescription: string

	@IsArray()
	@IsString({ each: true })
	features: string[]

	@IsString()
	@IsOptional()
	price?: string
}
