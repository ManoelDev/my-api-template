import { env } from '../env';
import { app } from './app';

app
	.listen({
		host: '0.0.0.0',
		port: env.PORT,
	})
	.then(() => console.log(`🚀 Server running on port: ${env.PORT}`))
	.catch(error => {
		app.log.error(error);
		process.exit(1);
	});
