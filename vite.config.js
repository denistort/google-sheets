import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
const viteAlliasesOptions = {
	/**
	 * Relative path to the project directory
	 */
	dir: 'src',

	/**
	 * Prefix symbol for the aliases
	 */
	prefix: '@',

	/**
	 * Allow searching for subdirectories
	 */
	deep: true,

	/**
	 * Search depthlevel for subdirectories
	 */
	depth: 1,

	/**
	 * Creates a Logfile
	 * use `logPath` to change the location
	 */
	createLog: false,

	/**
	 * Path for Logfile
	 */

	logPath: 'src/logs',

	/**
	 * Create global project directory alias
	 */
	createGlobalAlias: true,

	/**
	 * Turns duplicates into camelCased path aliases
	 */
	adjustDuplicates: false,

	/**
	 * Used paths in JS/TS configs will now be relative to baseUrl
	 */
	useAbsolute: false,

	/**
	 * Adds seperate index paths
	 * approach created by @davidohlin
	 */
	useIndexes: false,

	/**
	 * Generates paths in IDE config file
	 * works with JS or TS
	 */
	useConfig: true,

	/**
	 * Will generate Paths in tsconfig
	 * used in combination with `useConfig`
	 * Typescript will be auto detected
	 */
	dts: false,

	/**
	 * Root path of Vite project
	 */
	root: process.cwd(),
};

export default defineConfig({
	plugins: [ViteAliases(viteAlliasesOptions)],
});
