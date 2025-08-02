#!/bin/bash

# AutoDrop Platform Repository Setup Script
# This script configures the repository with proper permissions and settings

set -e

echo "🚀 Setting up AutoDrop Platform Repository..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Repository configuration
REPO_NAME="autodrop-platform-v2"
REPO_DESCRIPTION="Premium Islamic clothing marketplace with AI-powered discovery"
REPO_HOMEPAGE="https://autodropplatform.shop"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    print_error "GitHub CLI (gh) is not installed. Please install it first."
    print_status "Visit: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    print_error "Not authenticated with GitHub CLI. Please run 'gh auth login' first."
    exit 1
fi

print_status "Creating repository: $REPO_NAME"

# Create repository if it doesn't exist
if ! gh repo view "$REPO_NAME" &> /dev/null; then
    gh repo create "$REPO_NAME" \
        --description "$REPO_DESCRIPTION" \
        --homepage "$REPO_HOMEPAGE" \
        --public \
        --clone
    print_success "Repository created successfully"
else
    print_warning "Repository already exists"
fi

# Navigate to repository directory
cd "$REPO_NAME" || exit 1

print_status "Setting up branch structure..."

# Create and push branches
git checkout -b development 2>/dev/null || git checkout development
git push -u origin development 2>/dev/null || true

git checkout -b staging 2>/dev/null || git checkout staging
git push -u origin staging 2>/dev/null || true

git checkout main

print_success "Branch structure created"

print_status "Configuring repository settings..."

# Enable security features
gh repo edit \
    --enable-issues \
    --enable-projects \
    --disable-wiki \
    --enable-discussions \
    --default-branch main \
    --delete-branch-on-merge \
    --enable-auto-merge \
    --enable-squash-merge \
    --disable-merge-commit \
    --enable-rebase-merge

print_success "Repository settings configured"

print_status "Setting up branch protection rules..."

# Main branch protection
gh api repos/:owner/:repo/branches/main/protection \
    --method PUT \
    --field required_status_checks='{"strict":true,"contexts":["Lint and Test","Security Scan"]}' \
    --field enforce_admins=false \
    --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true,"require_code_owner_reviews":true}' \
    --field restrictions=null \
    --field allow_force_pushes=false \
    --field allow_deletions=false \
    --field block_creations=false \
    --field required_conversation_resolution=true \
    2>/dev/null || print_warning "Could not set main branch protection (may need admin access)"

# Staging branch protection
gh api repos/:owner/:repo/branches/staging/protection \
    --method PUT \
    --field required_status_checks='{"strict":true,"contexts":["Lint and Test"]}' \
    --field enforce_admins=false \
    --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
    --field restrictions=null \
    --field allow_force_pushes=false \
    --field allow_deletions=false \
    2>/dev/null || print_warning "Could not set staging branch protection (may need admin access)"

print_success "Branch protection rules configured"

print_status "Setting up repository secrets..."

# List of required secrets
SECRETS=(
    "STRIPE_SECRET_KEY"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    "ALIEXPRESS_API_KEY"
    "ALIEXPRESS_SECRET_KEY"
    "ALIEXPRESS_APP_KEY"
    "ALIEXPRESS_TRACKING_ID"
    "NEXT_PUBLIC_SITE_URL"
    "STRIPE_WEBHOOK_SECRET"
    "VERCEL_TOKEN"
    "VERCEL_ORG_ID"
    "VERCEL_PROJECT_ID"
    "SLACK_WEBHOOK"
)

print_warning "Please set up the following repository secrets manually:"
for secret in "${SECRETS[@]}"; do
    echo "  - $secret"
done

print_status "Setting up repository topics..."

# Add topics to repository
gh repo edit --add-topic nextjs,ecommerce,dropshipping,stripe,aliexpress,islamic-clothing,marketplace,ai-powered,typescript,tailwindcss

print_success "Repository topics added"

print_status "Setting up issue templates and PR template..."

# Create .github directory structure if it doesn't exist
mkdir -p .github/{ISSUE_TEMPLATE,workflows}

print_success "GitHub templates directory created"

print_status "Enabling security features..."

# Enable Dependabot security updates
gh api repos/:owner/:repo \
    --method PATCH \
    --field security_and_analysis='{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"},"dependabot_security_updates":{"status":"enabled"}}' \
    2>/dev/null || print_warning "Could not enable all security features (may need admin access)"

print_success "Security features enabled"

print_status "Repository setup completed! 🎉"

echo ""
echo "📋 Next Steps:"
echo "1. Set up repository secrets in GitHub UI"
echo "2. Add team members and configure permissions"
echo "3. Review and customize branch protection rules"
echo "4. Configure Vercel deployment"
echo "5. Test CI/CD pipeline"

echo ""
echo "🔗 Repository URL: $(gh repo view --web --json url -q .url)"

print_success "Setup script completed successfully!"
