import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';
import reactNativeWeb from 'vite-plugin-react-native-web';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: false,
			},
		}),
		reactNativeWeb(),
	],
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
	},
	assetsInclude: ['**/*.md']
});
