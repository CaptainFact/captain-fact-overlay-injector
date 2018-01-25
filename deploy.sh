#!/usr/bin/env bash

CURRENT_BRANCH=$(git branch | grep \* | cut -d ' ' -f2-)

if [ "$CURRENT_BRANCH" = "master" ]; then
  REMOTE=captainfact.surge.sh
elif [ "$CURRENT_BRANCH" = "staging" ]; then
  REMOTE=staging.captainfact.surge.sh
else
  echo "Unknown branch: $CURRENT_BRANCH"
  exit 1
fi

surge ${REMOTE}