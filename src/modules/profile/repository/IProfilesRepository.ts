import { Profiles } from '@prisma/client';

export type IProfilesRepository = {
	listById(uuid: string): Promise<Partial<Profiles> | null>;
};
