#!/bin/bash
# Auto-deploy: commit et push les changements vers GitHub → Cloudflare
SITE_DIR="/Users/samiouaguenouni/Documents/ai-fusion-core/sites/AFP_Indonesia"

cd "$SITE_DIR" || exit 1

# Verifier s'il y a des changements
if git -C "$SITE_DIR" diff --quiet && git -C "$SITE_DIR" diff --cached --quiet && [ -z "$(git -C "$SITE_DIR" ls-files --others --exclude-standard)" ]; then
    echo "Aucun changement detecte."
    exit 0
fi

# Ajouter, commit et push
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
git -C "$SITE_DIR" add -A
git -C "$SITE_DIR" commit -m "[AUTO-DEPLOY] Mise a jour site Indonesia - $TIMESTAMP"
git -C "$SITE_DIR" push origin main

echo "Site deploye avec succes a $TIMESTAMP"
