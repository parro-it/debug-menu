#!/bin/sh
gh re --new debug-menu --description  &&

git init &&

git remote add origin https://github.com/parro-it/debug-menu.git &&

joe sublimetext node > .gitignore &&
echo '\nprivate\ninit\n' >> .gitignore &&

git add .  &&
git commit -m "project skeleton" &&
git push --set-upstream origin master

