import { runInRepo } from '../utils.ts'
import { RunOptions } from '../types.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'intlify/vue-i18n',
		branch: 'master',
		build: {
			script: 'build',
			args: ['--all', '-t'],
		},
		beforeTest: 'pnpm playwright-core install chromium',
		test: [
			'test:cover',
			{
				script: 'test:e2e',
				args: ['--exclude', 'e2e/bridge/**'],
			},
		],
	})
}
