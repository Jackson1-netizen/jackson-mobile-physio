/**
 * Netlify ignore command.
 * Exit 0 skips the build. Exit 1 lets it run.
 *
 * Allowed:
 * - Deploy Previews (pull requests, including PRs into cursor/design-option-2-b759)
 * - The branch cursor/design-option-2-b759
 *
 * main and every other branch are skipped. This does not merge or deploy a custom domain.
 */
const context = process.env.CONTEXT || "";
const branch = process.env.BRANCH || "";
const allowedBranch = "cursor/design-option-2-b759";
const allow = context === "deploy-preview" || branch === allowedBranch;

if (allow) {
  console.log(`Netlify build allowed: context=${context || "unset"} branch=${branch || "unset"}`);
  process.exit(1);
}

console.log(`Netlify build ignored: context=${context || "unset"} branch=${branch || "unset"}`);
process.exit(0);
