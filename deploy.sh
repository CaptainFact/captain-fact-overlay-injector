#!/usr/bin/env bash

CURRENT_BRANCH=$(git branch | grep \* | cut -d ' ' -f2-)

if [ "$CURRENT_BRANCH" = "master" ]; then
  REMOTE=embed.captainfact.io
elif [ "$CURRENT_BRANCH" = "staging" ]; then
  REMOTE=staging.embed.captainfact.io
else
  echo "Unknown branch: $CURRENT_BRANCH"
  exit 1
fi

surge -d ${REMOTE} -p ./dist
