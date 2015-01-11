// this is an idea for making the site easier to update, maybe..
// This is major WIP and the API / format for this has yet to be finalized
/* DATA MODELS -- OPTIONAL DATA NOTED */
lecture = {
        title: '',
        url: 'url',
        video: 'url',
        classes: 'optional classes to apply'
};

reading = {
    title: 'Name',
    url: 'duh',
    classes: 'required hard' // or whatver
};

lab = {
    title: '',
    url: '',
    RQ: 1, // OPTIONAL -- INT,
    video: '' // OPTIONAL -- LINK
};

discussion = {
    title: '',
    url: '' // OPTIONAL -- default is none.
};

cs10 = window.cs10 || {};

cs10.newLabObject = function(title, url, rq, video) {
    // FIXME -- better handle the URL via config
    // TODO  -- How does "Project Work" or no lab fit into this?
    var baseURL = '../labs/llab/html/topic.html?topic=';
    var labObj = { type: 'Lab' };
    labObj.title = title;
    
    if (!title) {
        labObj.title = 'No Lab';
    }
    if (url) {
        labObj.url = baseURL + url;
    }
    labObj.RQ = rq;

    labObj.video = video;
    return labObj;
};

cs10.newReadingsObject = function(title, url, classes) {
    var reading = {
        type: 'Reading',
        title: title,
        url: url
    };
    
    if (!classes) {
        classes = 'required'; // Default option
    }
    
    reading.classes = 'reading ' + classes;
    
    return reading;
};

cs10.newLectureObject = function(title, guest, videURL) {
    var obj = { type: 'Lecture' };

    if (!title) {
        obj.title = 'No Lecture';
        return obj;
    }
    // Global Counter for lecture
    cs10.lectureCounter = cs10.lectureCounter || 0;
    cs10.lectureCounter += 1;
    var count = cs10.lectureCounter;
    var lectureURL = 'lectures/' + (count < 10 ? '0' : '' ) + count + '/';
    obj.title = title;
    obj.url = lectureURL;
    obj.guest = guest;
    obj.video = videoURL;
    return obj;
};

cs10.newDiscussionObject = function(title, files) {
    var obj = { 'type' : 'Discussion' };
    if (!title) {
        obj.title = 'No Class';
        return obj;
    }
    // Global Counter for lecture
    cs10.discussionCounter = cs10.discussionCounter || 0;
    cs10.discussionCounter += 1;
    obj.title = title;

    if (files) {
        var count = cs10.discussionCounter;
        var discussionURL = 'disc/' + (count < 10 ? '0' : '' ) + count + '/';
        obj.url = dsicussionURL;
    }

    return obj;
};
cs10.newHomeworkObject = function(title, url) {
    var obj = { type: 'Homework' };

    if (!title) {
        obj.title = 'No Homework!<br />But you might want to check next week\'s';
        return obj;
    }

    obj.title = title;
    obj.classes = 'assignmentDue';
    if (url) {
        obj.url = url;
    }
    return obj;
};

var lab      = cs10.newLabObject,
    readings = cs10.newReadingsObject,
    lect     = cs10.newLectureObject,
    disc     = cs10.newDiscussionObject,
    hw       = cs10.newHomeworkObject;

cs10.renderObject = function(obj) {
    obj.classes = obj.classes || ' ';
    var html = $(document.createElement('div')).attr(
        { 'class': obj.classes }
    );

    var heading = $(document.createElement('h3')).html(obj.type);
    html.append(heading);
    var content;
    if (obj.url) {
        content = $(document.createElement('a')).attr(
            { 'href': obj.url}).html(obj.title);
    } else {
        content = $(document.createElement('span')).html(obj.title);
    }
    if (obj.video) {
        content.append('<br />');
        var video = $(document.createElement('a')).attr(
            { 'href': obj.video,
              'target': '_blank'
            }).html('Watch a video here.');
        content.append(video);
    }
    if (obj.RQ) {
        content.append('<br />');
        content.append($(document.createElement('b')).html('Reading Quiz ' +
        obj.RQ));
    }

    html.append(content);
    return html.html();
};

// ==================================================
// ==========     SCHEDULE ITEMS           ==========
// ==================================================

// Aug 25 - 29
cs10.week1 = {
    readings: 'No Readings',
    lectA: lect(null),
    labA: lab(null),
    lectB: lect(null),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Welcome to CS10!'),
    hw: hw('HW0') };

// Sept 1 - 5
cs10.week2 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab('Build Your Own Blocks', 'berkeley_bjc/intro_new/2-loops-variables.topic', 1),
    lectB: lect('Welcome and Abstraction'),
    labB: lab('Conditionals', 'berkeley_bjc/intro_new/3-conditionals.topic'),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1') };

// Sept 8 - 12
cs10.week3 = {
    readings: [ reading(null) ],
    lectA: lect('Functions'),
    labA: lab('Functions', 'berkeley_bjc/intro_new/4-abstraction-testing.topic', 2),
    lectB: lect('Creativity and Abstraction'),
    labB: lab('Lists 1', 'berkeley_bjc/lists/lists-I.topic'),
    disc: disc('All about lists'),
    hw: hw('HW1') };

// Sept 15 - 19
cs10.week4 = {
    readings: [ reading(null) ],
    lectA: lect('3D Graphics'),
    labA: lab('Lists 1 & HW Help', 'berkeley_bjc/lists/lists-I.topic', 3),
    lectB: lect('Programming Paradigms'),
    labB: lab('Algorithms', 'berkeley_bjc/areas/algorithms.topic'),
    disc: disc('Lists'),
    hw: hw('Start on HW2') };

// Sept 22 - 26
cs10.week5 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1') };

// Sept 29 - Oct 3
cs10.week6 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1') };

// Oct 6 - 10
cs10.week7 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect(null),
    labB: lab(null),
    disc: disc('Welcome to CS10!'),
    hw: hw('HW0') };

// Oct 13 - 17
cs10.week8 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1') };

// Oct 20 - 24
cs10.week9 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1') };

// Oct 27 - 31
cs10.week10 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect(null),
    labB: lab(null),
    disc: disc('Welcome to CS10!'),
    hw: hw('HW0') };

// Nov 3 - 7
cs10.week11 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1') };

// Nov 10 - 14
cs10.week12 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1') };

// Nov 17 - 21
cs10.week13 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect(null),
    labB: lab(null),
    disc: disc('Welcome to CS10!'),
    hw: hw('HW0') };

// Nov 24 - 28
cs10.week14 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1') };

// Dec 1 - 5
cs10.week15 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1') };

// Dec 8 - 12
cs10.week16 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect(null),
    labB: lab(null),
    disc: disc('Welcome to CS10!'),
    hw: hw('HW0') };

// Dec 15 - 19
cs10.week17 = {
    readings: [ reading(null) ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1') };

cs10.schedule = [];
cs10.buildCal = function() {
    var calDiv     = $('#main-cal'),
        calPills   = $('#cal-sidebar'),
        calContent = $('#cal-content'),
        pillsList  = '',
        calData    = '',
        selector, title, i = 1;

    for (; i <= 17; i += 1) {
        cs10.schedule.push(cs10['week' + i]);
        selector = 'cal-week-' + i;
        title = 'Week ' + i;
        // TODO: Add the date.
        pillsList += '<li><a href="#' + selector +
        '" target="' + selector + '" role="tab" data-toggle="tab">' + title + '</a></li>\n';
    }

    /* Bootstrap div format:
     * <div class="tab-pane active" id="home"></div>
     */
    var week, weekStr, isActive;
    for (i = 0; i < 17; i += 1) {
        // TODO this should be the current week of the school year.
        isActive = i === 0 ? 'active' : '';
        selector = 'cal-week-' + (i + 1);
        week = cs10.schedule[i].map(cs10.renderObject);
        weekStr = week.join('\n');
        calData += '<div class="tab-pane ' + isActive + '" id="' + selector +
        '">' + weekStr + '</div>\n';
    }
    calPills.html(pillsList);
    calContent.html(calData);
};

        // $(document).ready(cs10.buildCal);
