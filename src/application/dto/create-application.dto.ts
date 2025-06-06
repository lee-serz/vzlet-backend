import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator'

export class CreateApplicationDto {
	@IsString()
	serviceSlug: string

	@IsString()
	serviceName: string

	@IsString()
	userName: string

	@IsString()
	@IsPhoneNumber('RU')
	phone: string

	@IsString()
	@IsEmail()
	email: string

	@IsString()
	@IsOptional()
	comment?: string

	@IsString()
	@IsOptional()
	userId?: string
}
