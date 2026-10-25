#!/usr/bin/env bash
# Publishes every package in .github/scripts/packages.sh at their shared
# version. Usage: publish-packages.sh [dist-tag]   (default: latest)
#
# npm cannot publish several packages atomically, and a published version can
# never be republished. So this script:
#   1. checks everything it can before publishing anything: the versions
#      match, and a dry-run publish (which runs each prepublishOnly build)
#      succeeds for every package that still needs publishing;
#   2. publishes one package at a time, library first, stopping at the first
#      failure — if the library fails, the CLI is never published;
#   3. skips versions already on npm, so rerunning after a partial failure
#      publishes only what is missing and completes the release.
set -euo pipefail

source "$(dirname "$0")/packages.sh"

TAG="${1:-}"
TAG_ARGS=()
if [ -n "$TAG" ]; then TAG_ARGS=(--tag "$TAG"); fi

VERSION=$(shared_version)
echo "Releasing version $VERSION${TAG:+ (dist-tag $TAG)}"

PENDING=()
for entry in "${PACKAGES[@]}"; do
  name="${entry#*:}"
  if npm view "$name@$VERSION" version >/dev/null 2>&1; then
    echo "$name@$VERSION is already on npm — skipping"
  else
    PENDING+=("$entry")
  fi
done

if [ "${#PENDING[@]}" -eq 0 ]; then
  echo "Nothing to publish"; exit 0
fi

echo "::group::Pre-flight: dry-run publish"
for entry in "${PENDING[@]}"; do
  dir="${entry%%:*}"; name="${entry#*:}"
  if ! (cd "$dir" && npm publish --dry-run ${TAG_ARGS[@]+"${TAG_ARGS[@]}"}); then
    echo "::endgroup::"
    echo "::error::Dry run failed for $name@$VERSION. Nothing was published."
    exit 1
  fi
done
echo "::endgroup::"

PUBLISHED=()
for entry in "${PENDING[@]}"; do
  dir="${entry%%:*}"; name="${entry#*:}"
  echo "Publishing $name@$VERSION"
  if ! (cd "$dir" && npm publish ${TAG_ARGS[@]+"${TAG_ARGS[@]}"}); then
    if [ "${#PUBLISHED[@]}" -eq 0 ]; then
      echo "::error::Publishing $name@$VERSION failed. Nothing was published."
    else
      echo "::error::Publishing $name@$VERSION failed after ${PUBLISHED[*]} was published. Fix the cause and re-run this workflow: it skips what is already on npm and publishes the rest at the same version. Do not bump the version to work around this."
    fi
    exit 1
  fi
  PUBLISHED+=("$name@$VERSION")
done

echo "Published: ${PUBLISHED[*]}"
