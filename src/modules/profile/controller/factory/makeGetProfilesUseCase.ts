import { ProfilesRepository } from '../../repository/prisma/ProfilesRepository';
import { GetProfilesUseCase } from '../../useCase/GetProfilesUseCase';

export function makeGetProfilesUseCase() {
	const profilesRepository = new ProfilesRepository();
	const getProfilesUseCase = new GetProfilesUseCase(profilesRepository);
	return getProfilesUseCase;
}
