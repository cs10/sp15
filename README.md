# [CS10 Spring 2015][site]

[site]: http://cs10.org/sp15

## Background
The Spring 2015 site is built using [Jekyll](jekyllrb.com) and is hosted on Github, with a backup on the CS10 instructional account.

Currently, there isn't much fancy work being done with Jekyll -- just a few include statements and basic page layouts.

## Jekyll
This site is built with Jekyll. To build the site, you need Jekyll and Ruby installed. Github has some fairly straight forward instructions, here:
https://help.github.com/articles/using-jekyll-with-pages/

To preview the site you should run:
`bundle exec jekyll serve`

## Updating the Website

The most common file to edit will be `assets/schedule.js` which defines the main class calendar. There are 4 main functions (`reading`, `lab`, `lect`, `hw`) for each type of item on the calendar. Their inputs are listed at the top of the file.

Some things:
* lectures content should go in `lecture/## - Title/` and should not include the source files
* discussion resources should go in `discussion/##/`

#### TODO: A note about directory listings  


## Web Dependencies

* Bootstrap
* jQuery
* FullCalendarJS -- for the Google Calendar schedule
* MomentJS -- needed for FullCalendar and is a date API used in other places

Note: The use of FullCalendar requires a Google Developer account, but these are free and there shouldn't be much configuration needed. The API key is supplied in the configuration file. You need a free Google Developer Console account to get a calendar API if the current one is broken.