import { Profiles } from '.prisma/client';
import { IProfilesRepository } from '../repository/IProfilesRepository';

export class GetProfilesUseCase {
	constructor(private profileRepository: IProfilesRepository) {
		// inject.
	}

	async execute(id: string): Promise<Partial<Profiles> | Error> {
		const getProfile = await this.profileRepository.listById(id);

		if (getProfile === null || !getProfile) {
			throw new Error('Perfil não encontrado.');
		}

		return getProfile;
	}
}
