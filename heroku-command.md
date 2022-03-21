heroku.yml
npm i -g heroku
heroku login

git init
npx gitignore node

git add . && git commit -m "my first deploy"

heroku apps:create spotify-radio
git remote -v

heroku stack:set container
heroku open
heroku logs -t -a semana-js-expert-06

heroku apps:delete
rm -rf .git