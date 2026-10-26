#!/usr/bin/env bash
# Tags a stable release and creates its GitHub Release.
#
# @hummingbirdui/react and create-hummingbird-react-app are a Changesets
# "fixed" group: they always share one version and ship together, so a single
# vX.Y.Z tag and Release covers both. The step refuses to run if the versions
# ever drift apart.
#
# It acts only when the version is a stable x.y.z that is live on npm for every
# package — prereleases (published manually via prerelease.yml) are never
# tagged — and the tag and the Release are each guarded on their own, so a
# partial failure (or a missed run) self-heals on the next push to main, and
# reruns never duplicate anything.
set -euo pipefail

source "$(dirname "$0")/packages.sh"

VERSION=$(shared_version)

if ! echo "$VERSION" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+$'; then
  echo "Version $VERSION is not a stable x.y.z — nothing to do"; exit 0
fi
TAG="v$VERSION"

# Registry reads can lag a just-finished publish by a minute or so — retry
# before concluding a version was never published.
for entry in "${PACKAGES[@]}"; do
  name="${entry#*:}"
  published=""
  for attempt in $(seq 1 12); do
    if npm view "$name@$VERSION" version >/dev/null 2>&1; then
      published=1; break
    fi
    echo "npm does not report $name@$VERSION yet (attempt $attempt/12) — retrying in 10s"
    sleep 10
  done
  if [ -z "$published" ]; then
    echo "$name@$VERSION is not on npm — nothing to do"; exit 0
  fi
done

NOTES=$(mktemp)
node .github/scripts/release-notes.mjs "$VERSION" > "$NOTES"

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
