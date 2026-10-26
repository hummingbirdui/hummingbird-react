# Packages released together. They are a Changesets "fixed" group
# (.changeset/config.json), so they always share one version.
# "<package dir>:<npm name>", in publish order: the library first, since the
# CLI's templates depend on it.
# shellcheck disable=SC2034 # used by the scripts that source this file
PACKAGES=(
  "packages/hummingbird-react:@hummingbirdui/react"
  "packages/create-hummingbird-react-app:create-hummingbird-react-app"
)

# Prints the shared version, or fails if the packages' versions differ.
shared_version() {
  local version="" entry dir v
  for entry in "${PACKAGES[@]}"; do
    dir="${entry%%:*}"
    v=$(node -p "require('./$dir/package.json').version")
    if [ -z "$version" ]; then
      version="$v"
    elif [ "$v" != "$version" ]; then
      echo "::error::Package versions differ ($dir is $v, expected $version). Check the \"fixed\" group in .changeset/config.json." >&2
      return 1
    fi
  done
  echo "$version"
}
