#!/bin/bash
# One command, the whole release: build the app, put the disk image and the
# ZIP in a GitHub Release, and point the site's feed at them.
#
#   ./release.sh                 # arm64, build + GitHub Release + feed + push
#   SEARCH_ARCH=x86_64 ./release.sh
#
# What it does:
#   1. ./build.sh release dmg — Dajet.app, Dajet.dmg, Dajet.zip, appcast.json
#      (and appcast.json.zip, once you have a Developer ID; see build.sh).
#   2. Creates or refreshes the GitHub Release v<VERSION>-dajet, whose
#      "latest" URL is what the feed names — so the file is only offered
#      after its release exists.
#   3. Copies build/appcast.json to docs/, commits it, and pushes — the
#      site (github.io) keeps serving the feed that Updater.feed reads.
#
# NOTES.md, next to this script, is what's new. Its first paragraph goes
# into the feed (and the release notes).
set -euo pipefail

cd "$(dirname "$0")"
REPO="bestdeejay-design/dajet-browser"
VERSION="$(tr -d '[:space:]' < VERSION)"
TAG="v${VERSION}-dajet"
NOTES="$(head -1 NOTES.md)"

./build.sh release dmg

if gh release view "$TAG" --repo "$REPO" >/dev/null 2>&1; then
  echo "release: refreshing $TAG"
  gh release edit "$TAG" --repo "$REPO" --title "Dajet ${VERSION}" --notes "$NOTES"
  gh release upload "$TAG" --repo "$REPO" --clobber build/Dajet.dmg build/Dajet.zip
else
  echo "release: creating $TAG"
  gh release create "$TAG" build/Dajet.dmg build/Dajet.zip --repo "$REPO" \
    --title "Dajet ${VERSION}" --notes "$NOTES"
fi

cp build/appcast.json docs/appcast.json
git add docs/appcast.json
git commit -m "docs: publish $VERSION to the site feed"
git push origin main
echo "released: https://github.com/$REPO/releases/tag/$TAG"