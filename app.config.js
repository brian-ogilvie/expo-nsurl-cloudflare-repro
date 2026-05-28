const variant = process.env.APP_VARIANT;

const name =
  variant === "development" ? "Cloudflare Repro (Dev)" : "Cloudflare Repro";

const bundleIdentifier =
  variant === "development"
    ? "dev.brianogilvie.expoNsurlCloudflareRepro.dev"
    : "dev.brianogilvie.expoNsurlCloudflareRepro";

module.exports = ({ config }) => ({
  ...config,
  name,
  ios: {
    ...config.ios,
    bundleIdentifier,
  },
});
