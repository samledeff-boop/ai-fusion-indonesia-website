#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/optimize-agent-photos.sh
#
# Expects 8 source images (any format cwebp supports) in:
#   assets/images/agents-src/
# Named:
#   amanda, rafi, sari, kevin, dina, arif, nabila, sami
# With any extension (e.g. amanda.png, rafi.jpg, etc).
#
# Outputs optimized WebP in:
#   assets/images/agents/
# Files:
#   <name>-main-400.webp, <name>-main-800.webp

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$SITE_DIR/assets/images/agents-src"
OUT_DIR="$SITE_DIR/assets/images/agents"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "error: cwebp not found. Install with: brew install webp" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

names=(amanda rafi sari kevin dina arif nabila sami)

find_one() {
  local name="$1"
  local matches
  matches="$(ls -1 "$SRC_DIR"/"$name".* 2>/dev/null || true)"
  if [ -z "$matches" ]; then
    return 1
  fi
  # If multiple extensions exist, just take the first.
  echo "$matches" | head -n 1
}

compress() {
  local in="$1"
  local base="$2"

  # 800w is plenty given CSS caps at 500px desktop.
  cwebp -q 78 -resize 800 0 -metadata none "$in" -o "$OUT_DIR/${base}-main-800.webp" >/dev/null
  cwebp -q 78 -resize 400 0 -metadata none "$in" -o "$OUT_DIR/${base}-main-400.webp" >/dev/null
}

missing=0
for name in "${names[@]}"; do
  if ! in="$(find_one "$name")"; then
    echo "missing: $SRC_DIR/$name.<ext>" >&2
    missing=1
    continue
  fi
  echo "optimize: $(basename "$in") -> ${name}-main-{400,800}.webp"
  compress "$in" "$name"
done

if [ "$missing" -ne 0 ]; then
  echo "" >&2
  echo "error: some source images are missing. Put them in: $SRC_DIR" >&2
  exit 1
fi

echo ""
echo "done: $OUT_DIR"
