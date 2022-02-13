# Дигитализирана верзија на „Бушава азбука“

Дигитализирана верзија на второто издание на книгата „Бушава азбука“ на Горан Стефановски, илустрирана од Душан Петричиќ и објавена како заеднички производ на ООЗТ Редакција „Детска Радост“, ИРО „Мисла“, ИРО „Наша книга“, Книгоиздателство „Македонска книга“ и ООЗТ Печатница при НИПРО „Нова Македонија“, во 1986 година, во Скопје, Социјалистичка Република Македонија.

Користени алатки:

- Jekyll
- Bundler
- Bootstrap
- gulp.js
- Node.js
- npm

## Инсталирање на помошни компоненти

Инсталирајте **Node.js** и **npm** на вообичаениот начин за вашиот оперативен систем.

- https://nodejs.org/en/docs/guides/
- https://docs.npmjs.com/getting-started

Инсталирајте го **Jekyll** според упатството на https://jekyllrb.com/docs/installation/.

Извршете `npm install` веднаш по клонирањето на складиштето за да ги снимите сите потребни помошни компоненти, пред да можете да го стартувате Jekyll.

## gulp.js

Извршете `npx gulp` за повикување на локалната верзија на gulp.js и задачите дефинирани во `gulpfile.js`.

## Стартување на Jekyll

Стартувајте го Jekyll со командата `bundle exec jekyll serve --incremental` или `jekyll serve --incremental` доколку не користите Bundler.

## Progressive Web App

Презентацијата претставува т.н. прогресивна веб-апликација, така што лесно може да се инсталира како мобилна апликација на телефони, таблети и останати уреди што користат iOS или Android.

### Компресија на видео содржини

Најавната шпица на „Бушава азбука“ е компресирана со `ffmpeg` во видео форматите `H264` и `Webm` со следните команди:

#### H264

`ffmpeg -i bushava-azbuka-najavna-shpica-izvor.mp4 -crf 30 -b:a 96k -c:a libvorbis -ar 32000 bushava-azbuka-najavna-shpica.mp4`

#### Webm

`ffmpeg -i bushava-azbuka-najavna-shpica-izvor.mp4 -c:v libvpx-vp9 -crf 50 -b:a 96k -c:a libvorbis -ar 32000 bushava-azbuka-najavna-shpica.webm`

## Пријава на грешки

Доколку забележите нешто скршено или некаков проблем, ве молам пријавете преку https://github.com/gocemitevski/bushava-azbuka/issues.

## Лиценца

Дигитализираната верзија на „Бушава азбука“, со исклучок на содржината на самата книга, е достапна преку лиценцата „[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode)“. Може слободно да се користи според правилата што произлегуваат од таа лиценца.
