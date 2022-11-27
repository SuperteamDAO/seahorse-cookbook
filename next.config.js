/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,

	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.md$/,
			use: [
				{
					loader: "html-loader",
				},
				{
					loader: "markdown-loader",
					options: {
						// Pass options to marked
						// See https://marked.js.org/using_advanced#options
					},
				},
			],
		});

		return config;
	},
};

module.exports = nextConfig;
