1) Call get_github_file with:
owner: "AutoDrop-Platform", repo: "autodropplatform-q4",
path: "app/page.js", ref: "main".
2) Replace the main visible heading text in the fetched file with exactly: "Welcome from Smart AI 🚀".
3) Base64-encode the updated file content.
4) Call update_github_file with:
owner: "AutoDrop-Platform", repo: "autodropplatform-q4",
path: "app/page.js", branch: "main",
message: "Smart AI: update homepage text",
sha: <sha from step 1>, content_base64: <encoded content>.
