import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Role, User } from '@prisma/client'
import { UserService } from './user.service'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// Получить всех
	@Auth([Role.ADMIN])
	@Get('all')
	async getAllUsers() {
		return this.userService.getUsers()
	}

	// Только администраторы могут удалять пользователей
	@Auth([Role.ADMIN])
	@Delete(':userId')
	async deleteUser(
		@Param('userId') userId: string
	): Promise<{ message: string }> {
		return this.userService.deleteUserById(userId)
	}

	// Повысить права для пользователя
	@Auth([Role.ADMIN])
	@Put(':userId/role')
	async updateUserRole(
		@CurrentUser('id') id: string,
		@Param('userId') userId: string,
		@Body() updateUserRoleDto: UpdateUserRoleDto
	) {
		return this.userService.updateUserRole(id, userId, updateUserRoleDto)
	}

	@Auth()
	@Get('profile')
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id)
	}

	@Auth()
	@Put('profile/update')
	async updateProfile(@CurrentUser('id') id: string, @Body() dto: User) {
		return this.userService.update(id, dto)
	}
}
