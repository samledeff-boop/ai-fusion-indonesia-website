#!/bin/bash

# 🤖 Auto-commit & push pour AFP Indonesia Website
# Surveille les modifications et push automatiquement vers GitHub/Cloudflare
# Usage: ./auto-commit-push.sh

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🤖 Auto-commit & push activé"
echo "📁 Repo: $REPO_DIR"
echo "🌐 GitHub: https://github.com/samledeff-boop/ai-fusion-indonesia-website"
echo "☁️  Cloudflare: Déploiement automatique activé"
echo ""
echo "💡 Appuie sur Ctrl+C pour arrêter"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Fonction pour commit et push
auto_push() {
    sleep 2  # Attendre que toutes les sauvegardes soient finies

    cd "$REPO_DIR"

    # Vérifier s'il y a des changements
    if git diff --quiet && git diff --cached --quiet; then
        return
    fi

    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    CHANGED_FILES=$(git status --short | head -5)

    echo "⚡ $(date '+%H:%M:%S') - Modifications détectées"
    echo "$CHANGED_FILES" | sed 's/^/  /'
    echo ""

    # Commit et push
    git add -A
    git commit -m "Auto-update: $TIMESTAMP

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>" --quiet

    if git push origin main --quiet 2>&1; then
        echo "✅ $(date '+%H:%M:%S') - Publié sur GitHub"
        echo "☁️  Cloudflare va déployer dans ~30 secondes"
        echo ""
    else
        echo "❌ $(date '+%H:%M:%S') - Erreur lors du push"
        echo ""
    fi
}

# Vérifier que fswatch est installé
if ! command -v fswatch &> /dev/null; then
    echo "❌ fswatch n'est pas installé"
    echo "📦 Installation: brew install fswatch"
    exit 1
fi

# Surveiller les changements (exclure .git et scripts)
fswatch -o \
    --exclude "\.git/" \
    --exclude "\.sh$" \
    --exclude "node_modules/" \
    --exclude "\.DS_Store" \
    "$REPO_DIR" | while read; do
    auto_push
done
