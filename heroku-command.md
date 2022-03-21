heroku.yml
npm i -g heroku
heroku login

git init
npx gitignore node

git add . && gti commit -m "my first deploy"

heroku apps:create spotify-radio
git remote -v

heroku stack:set container