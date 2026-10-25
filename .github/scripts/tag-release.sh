#!/usr/bin/env bash
# Tags a stable release and creates its GitHub Release, for one package.
# Usage: tag-release.sh <package-dir> <npm-name> <tag-prefix>
#   tag-release.sh packages/hummingbird-react "@hummingbirdui/react" "v"
#   tag-release.sh packages/create-hummingbird-react-app create-hummingbird-react-app "create-hummingbird-react-app@"
#
# It acts only when the version in package.json is a stable x.y.z that is
# live on npm — prereleases (published manually via prerelease.yml) are never
# tagged — and the tag and the Release are each guarded on their own, so a
# partial failure (or a missed run) self-heals on the next push to main, and
# reruns never duplicate anything. Each package is guarded independently.
set -euo pipefail

DIR="$1"
NAME="$2"
PREFIX="$3"

VERSION=$(node -p "require('./$DIR/package.json').version")
if ! echo "$VERSION" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+$'; then
  echo "$NAME: version $VERSION is not a stable x.y.z — nothing to do"; exit 0
fi
TAG="$PREFIX$VERSION"

# Registry reads can lag a just-finished publish by a minute or so — retry
# before concluding the version was never published.
published=""
for attempt in $(seq 1 12); do
  if npm view "$NAME@$VERSION" version >/dev/null 2>&1; then
    published=1; break
  fi
  echo "npm does not report $NAME@$VERSION yet (attempt $attempt/12) — retrying in 10s"
  sleep 10
done
if [ -z "$published" ]; then
  echo "$NAME@$VERSION is not on npm — nothing to do"; exit 0
fi

NOTES=$(mktemp)
node .github/scripts/release-notes.mjs "$VERSION" "$DIR/CHANGELOG.md" > "$NOTES"

if [ -z "$(git ls-remote --tags origin "refs/tags/$TAG")" ]; then
  git tag "$TAG"
  git push origin "$TAG"
else
  echo "Tag $TAG already exists — skipping tag"
fi

if ! gh release view "$TAG" >/dev/null 2>&1; then
  gh release create "$TAG" --title "$TAG" --notes-file "$NOTES"
else
  echo "Release $TAG already exists — skipping release"
fi
