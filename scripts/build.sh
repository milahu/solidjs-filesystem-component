#! /bin/sh

set -e

# assert clean git
changes="$(git status --porcelain=1 | grep -v '^?? ' || true)"
if [[ "$changes" != "" ]]
then
  echo "error: dirty git:"
  echo
  echo "$changes"
  exit 1
fi

(
  #set -x # trace
  npm run build
  git add docs
)

# assert changes
changes="$(git status --porcelain=1 | grep -v '^?? ' || true)"
if [[ "$changes" == "" ]]
then
  echo "no change"
  exit
fi

git commit -m build
