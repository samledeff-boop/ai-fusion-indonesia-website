#!/bin/bash

# Auto-push script for AFP_Indonesia site
# Sync vers ai-fusion-core ET ai-fusion-indonesia-website
# Usage: ./watch-and-push.sh

SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SITE_DIR/../.." && pwd)"
DEPLOY_REPO="$HOME/.afp-indonesia-deploy"
DEPLOY_REMOTE="https://github.com/samledeff-boop/ai-fusion-indonesia-website.git"

echo "=== AFP_Indonesia Auto-Push & Sync ==="
echo "Source: $SITE_DIR"
echo "Deploy repo: $DEPLOY_REPO"
echo "Appuie sur Ctrl+C pour arrêter"
echo ""

# Initialiser le repo de déploiement si nécessaire
if [ ! -d "$DEPLOY_REPO/.git" ]; then
    echo "Initialisation du repo de déploiement..."
    git clone "$DEPLOY_REMOTE" "$DEPLOY_REPO" 2>/dev/null || {
        mkdir -p "$DEPLOY_REPO"
        cd "$DEPLOY_REPO"
        git init
        git remote add origin "$DEPLOY_REMOTE"
    }
fi

# Fonction pour sync et push
sync_and_push() {
    sleep 2  # Attendre que les modifications soient terminées

    cd "$REPO_ROOT"

    # Vérifier s'il y a des changements
    if git diff --quiet sites/AFP_Indonesia/ && git diff --cached --quiet sites/AFP_Indonesia/; then
        return
    fi

    TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
    echo ""
    echo "$(date '+%H:%M:%S') - Modifications détectées..."

    # 1. Push vers ai-fusion-core
    git add sites/AFP_Indonesia/
    git commit -m "[AFP_Indonesia] Auto-update $TIMESTAMP"
    git push origin main
    echo "$(date '+%H:%M:%S') - ✓ Push ai-fusion-core OK"

    # 2. Sync vers ai-fusion-indonesia-website
    echo "$(date '+%H:%M:%S') - Sync vers ai-fusion-indonesia-website..."

    # Copier les fichiers (exclure .git et watch-and-push.sh)
    rsync -av --delete \
        --exclude '.git' \
        --exclude 'watch-and-push.sh' \
        "$SITE_DIR/" "$DEPLOY_REPO/"

    # Commit et push vers le repo de déploiement
    cd "$DEPLOY_REPO"
    git add -A
    git commit -m "Sync from ai-fusion-core - $TIMESTAMP" 2>/dev/null || true
    git push origin main 2>/dev/null || git push -u origin main

    echo "$(date '+%H:%M:%S') - ✓ Push ai-fusion-indonesia-website OK"
    echo "$(date '+%H:%M:%S') - ✓ Cloudflare va déployer automatiquement"
    echo ""
}

# Surveiller les changements avec fswatch
fswatch -o "$SITE_DIR" --exclude "\.git" --exclude "watch-and-push\.sh" --exclude "node_modules" | while read; do
    sync_and_push
done
