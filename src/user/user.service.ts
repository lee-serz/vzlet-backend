import { AuthDto } from '@/auth/dto/auth.dto'
import {
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import type { User } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUsers() {
		return this.prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				rights: true,
				password: false
			}
		})
	}

	async deleteUserById(userId: string): Promise<{ message: string }> {
		try {
			await this.prisma.user.delete({
				where: {
					id: userId
				}
			})
			return { message: 'Пользователь успешно удалён' }
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			throw new HttpException(
				'Не удалось удалить пользователя',
				HttpStatus.BAD_REQUEST
			)
		}
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)
		return profile
	}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async updateUserRole(
		adminId: string,
		userId: string,
		updateUserRoleDto: UpdateUserRoleDto
	) {
		const { role } = updateUserRoleDto

		const admin = await this.prisma.user.findUnique({ where: { id: adminId } })
		if (!admin || !admin.rights.includes('ADMIN')) {
			throw new ForbiddenException('У вас нет разрешения на смену ролей')
		}

		const user = await this.prisma.user.findUnique({ where: { id: userId } })
		if (!user) {
			throw new NotFoundException('User not found')
		}

		return await this.prisma.user.update({
			where: { id: userId },
			data: {
				rights: [role]
			}
		})
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async create(dto: AuthDto) {
		return this.prisma.user.create({
			data: {
				...dto,
				password: await hash(dto.password)
			}
		})
	}

	async update(id: string, dto: Partial<User>) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		return this.prisma.user.update({
			where: {
				id
			},
			data,
			select: {
				name: true,
				email: true
			}
		})
	}
}
