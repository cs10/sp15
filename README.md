# [CS10 Fall 2014][site]

Fall 2014. It's gonna be real.

[site]: http://cs10.berkeley.edu/fa14

## Background
This repo serves as the source for the Fall 2014 CS10 course website. All changes (`git push`es) to this repo will automatically update the class website.

## Notes
### Building and Deployment
To view the website from a local copy, you should be able to just open `index.html`. However, some images may not work.
The website should be served with the following structure:
```
- root
    - fa14/
    - resources/
```
The [`resources`](cs10/resources) folder is a separate repo in the CS10 organization which contains images and some other shared materials.

It's best to view the website from a running server. If you have Python you can simply run `python -m SimpleHttpServer` (for Python 2), or `python -m http.server` (for Python 3).


#### Weekly Schedule
The weekly schedule is based off a jQuery plugin called FullCalendar which is included in `assets/`. We use it in connection with a Google calendar source to show events for labs, lectures, discussions and office hours. Each type of event gets it's own GCal source.  You can edit the code on the index page to change the calendar sources.

`assets/gcal.js` has a small hack to edit the URLs for events to point to the Berkeley interactive map. It uses the location info to determine the URL it should use.
### Custom Stuff
**Staff Images**:

* All Family Members are defined in staff.js
* To add a new family member to an existing section, simply add a new object to the array.
* To add a new SECTION to the webpage, you must:
    1. Add a new array section to staff.js
    2. Add the section to the 'all' object in staff.js
    3. Add the section to window.onload in staff.js
    4. Create a `<div>` with an `id=` using the same name. 

**Index Page**
The current index page is very 'thin' overall and much of it's content is contained in files in the `includes/` folder. This are loaded via a `$.ajax` call. 

(Naturally, this is a stupid decision performance-wise, so eventually it will be fixed with a real build system...probably.)