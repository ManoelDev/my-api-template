import { Profiles } from '@prisma/client';
import { IProfilesRepository } from '../IProfilesRepository';
import { prisma } from '@/libs/prisma';

export class ProfilesRepository implements IProfilesRepository {
	async listById(id: string): Promise<Partial<Profiles> | null> {
		return prisma.profiles.findFirst({
			where: { Account: { every: { id } } },
			select: {
				name: true,
				avatar: true,
				bio: true,
				phone: true,
			},
		});
	}
}
