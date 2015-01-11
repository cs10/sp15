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

cs10.week1 = {
    readings: 'No Readings',
    lectA: lect(null),
    labA: lab(null),
    lectB: lect(null),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Welcome to CS10!'),
    hw: hw('HW0')
};

cs10.week2 = {
    readings: [ 
        reading('Prof. Harvey\'s Intro to Abstraction',
                'http://inst.eecs.berkeley.edu/~cs10/sp11/lec/01/2010-08-30-CS10-L01-BH-Abstraction.txt',
                'required'),
        reading('Why Software is Eating the World',
                'https://bcourses.berkeley.edu/courses/1246916/files#CS10%3A%20The%20Beauty%20and%20Joy%20of%20Computing%2FReadings%2FMarc_Andreessen_on_Why_Software_Is_Eating_the_World__WSJ.com.pdf',
                'required'),
        reading('Learning to Code!',
                'http://www.youtube.com/watch?v=dU1xS07N-FA',
                'optional'),
        reading('Is Abstraction the Key to Computing?',
                'http://doi.acm.org/10.1145/1232743.1232745',
                'optional'),
        reading('Scratch: Programming for All',
                'https://bcourses.berkeley.edu/courses/1246916/files#CS10%3A%20The%20Beauty%20and%20Joy%20of%20Computing%2FReadings',
                'optional')
    ],
    lectA: lect(null),
    labA: lab('Build Your Own Blocks', 'berkeley_bjc/intro_new/2-loops-variables.topic', 1),
    lectB: lect('Welcome and Abstraction'),
    labB: lab('Conditionals', 'berkeley_bjc/intro_new/3-conditionals.topic'),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1')
};

// Sept 8 - 12
cs10.week3 = {
    readings: [
        reading('The Story of Alan Turing &amp; His Machine',
                'http://youtu.be/CQhrMmbiaM0'),
        reading('Designing Games with a Purpose (GWAP)',
                'http://doi.acm.org/10.1145/1378704.1378719'),
        reading('Justices Split on Violent Games',
                'http://www.nytimes.com/2011/06/28/us/28scotus.html'),
        reading('Video Games Lecture',
                'https://coursesharing.org/courses/6/lectures/11'),
        reading('(Slides)',
                '../sp12/lec/03/'),
        reading('More readings on video games',
                '../fa10/readings/videogames/extra/',
                'optional'),
        reading('Kinect\'s Future a Game Controller in Everything',
                'http://www.msnbc.msn.com/id/40077373/ns/technology_and_science-games/',
                'optional')
    ],
    lectA: lect('Functions'),
    labA: lab('Functions', 'berkeley_bjc/intro_new/4-abstraction-testing.topic', 2),
    lectB: lect('Creativity and Abstraction'),
    labB: lab('Lists 1', 'berkeley_bjc/lists/lists-I.topic'),
    disc: disc('All about lists'),
    hw: hw('HW1')
};

// Sept 15 - 19
cs10.week4 = {
    readings: [
        reading('How Algorithms Shape Our World',
                'http://www.ted.com/talks/kevin_slavin_how_algorithms_shape_our_world.html'),
        reading('BtB Chapter 1',
                'http://www.bitsbook.com/wp-content/uploads/2008/12/chapter1.pdf'),
        reading('Program or Be Programmed',
                'http://tedxtalks.ted.com/video/Douglas-Rushkoff-at-TEDxNYED'),
        reading('Program or Be Programmed: A Guide',
                'http://dtc-wsuv.org/hashnextchapter/wp-content/uploads/2013/03/Rushkoff-Study-Guide.pdf',
                'optional'),
        reading('Animating a Blockbuster',
                'http://www.wired.com/magazine/2010/05/process_pixar/',
                'optional')
    ],
    lectA: lect('3D Graphics'),
    labA: lab('Lists 1 & HW Help', 'berkeley_bjc/lists/lists-I.topic', 3),
    lectB: lect('Programming Paradigms'),
    labB: lab('Algorithms', 'berkeley_bjc/areas/algorithms.topic'),
    disc: disc('Lists'),
    hw: hw('Start on HW2')
};

cs10.week5 = {
    exam: {
        
    },
    readings: 'No Readings',
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1')
};

cs10.week6 = {
    readings: [
        reading('BtB Chapter 2',
                'http://www.bitsbook.com/wp-content/uploads/2008/12/chapter2.pdf'),
        reading('BtB Chapter 4 Reading Segment 1',
                '../sp12/readings/BtB4-pt1.pdf'),
        reading('BtB Chapter 4 Reading Segment 2',
                '../sp12/readings/BtB4-pt2.pdf'),
        reading('Living in a Digital World',
                'http://cacm.acm.org/magazines/2011/10/131393-living-in-a-digital-world/pdf',
                'optional'),
        reading('BtB Chapter 3',
                'http://www.bitsbook.com/wp-content/uploads/2008/12/chapter3.pdf',
                'optional')
    ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1')
};

cs10.week7 = {
    readings: [
        reading('How Moore\'s Law Works',
                'http://computer.howstuffworks.com/moores-law.htm'),
        reading('Free Lunch is Over',
                'http://www.gotw.ca/publications/concurrency-ddj.htm',
                'hard'),
        reading('What is IBM\'s Watson?',
                'http://www.nytimes.com/2010/06/20/magazine/20Computer-t.html'),
        reading('Brian Harvey\'s AI notes',
                'http://inst.eecs.berkeley.edu/~cs10/fa10/lec/21/ai.txt'),
        reading('The First Church of Robotics',
                'http://www.nytimes.com/2010/08/09/opinion/09lanier.html',
                'optional'),
        reading('The Thinking Machine (Video)',
                'http://www.youtube.com/watch?v=4gzpd0irP58',
                'optional'),
        reading('Spending Moore\'s dividend (CACM)',
                'http://doi.acm.org/10.1145/1506409.1506425',
                'optional')
        
    ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect(null),
    labB: lab(null),
    disc: disc('Welcome to CS10!'),
    hw: hw('HW0')
};

cs10.week8 = {
    readings: [
        reading('BtB Chapter 5 Reading Segment 1',
                '../sp12/readings/BtB5-pt1.pdf'),
        reading('BtB Chapter 5 Reading Segment 2',
                '../sp12/readings/BtB5-pt2.pdf'),
        reading('BtB Chapter 5 Reading Segment 3',
                '../sp12/readings/BtB5-pt3.pdf'),
        reading('BtB Chapter 6 (27-37)',
                'http://www.bitsbook.com/wp-content/uploads/2008/12/chapter6.pdf')
    ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1')
};

// MIDTERM WEEK
cs10.week9 = {
    exam: {
        
    },
    readings: 'No Readings',
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1')
};

// Spring Break
cs10.week10 = {
    special: 'Spring Break'
};

cs10.week11 = {
    readings: [
        reading('BtB Chapter 7',
                'http://www.bitsbook.com/wp-content/uploads/2008/12/chapter7.pdf'),
        reading('BtB Appendix',
                '../fa13/readings/Btb_Appendix.pdf'),
        reading('BtB Chapter 8',
                'http://www.bitsbook.com/wp-content/uploads/2008/12/chapter8.pdf',
                'optional')
    ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1')
};

cs10.week12 = {
    readings: [
        reading('Data explosion creates revolution',
                'http://www.sfgate.com/cgi-bin/article.cgi?f=/c/a/2011/10/19/BU5K1LJ4R3.DTL'),
        reading('Data Mining',
                'http://webdocs.cs.ualberta.ca/~zaiane/courses/cmput690/notes/Chapter1/ch1.pdf'),
        reading('Data Pitfalls',
                'http://searchenginewatch.com/article/2289574/Big-Data-Big-Trouble-How-to-Avoid-5-Data-Analysis-Pitfalls'),
        reading('Computing as Social Science',
                'http://cacm.acm.org/magazines/2009/4/22953-computing-as-social-science/fulltext',
                'optional'),
        reading('Data Visualization',
                'http://datavisualization.ch/',
                'optional'),
        reading('Basic Statistics (Helpful for Project)',
                'http://www.cimt.plymouth.ac.uk/projects/mepres/stats/handlg_data_ch3.pdf',
                'optional')
    ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1')
};

cs10.week13 = {
    readings: [
        reading('The Heartbleed Bug',
                'http://blog.agilebits.com/2014/04/08/imagine-no-ssl-encryption-its-scary-if-you-try/'),
        reading('What Servers Bleed',
                'https://medium.com/p/804cdf4b48c1',
                'hard')
    ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect(null),
    labB: lab(null),
    disc: disc('Welcome to CS10!'),
    hw: hw('HW0')
};

cs10.week14 = {
    readings: [
        reading('The Great Robot Race (Video)',
                'https://www.youtube.com/watch?v=uoiJeIb0wBA'),
        reading('Halting Problem Poem',
                'http://introcs.cs.princeton.edu/java/76computability/halting-poem.html',
                'optional')
    ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1')
};

cs10.week15 = {
    readings: [
        reading('Why is Quantum Different?',
                'http://www.scientificamerican.com/article.cfm?id=what-makes-a-quantum-comp'),
        reading('DNA Storage',
                'http://radar.oreilly.com/2012/08/dna-storage.html',
                'hard'),
        reading('Quantum Leap',
                'http://money.cnn.com/2006/07/26/magazines/fortune/futureoftech_quantum.fortune/index.htm',
                'optional'),
        reading('Twenty Top Predictions for life 100 years from now',
                'http://www.bbc.co.uk/news/magazine-16536598',
                'optional'),
        reading('BtB: Conclusion',
                'http://www.bitsbook.com/wp-content/uploads/2008/12/chapter9.pdf',
                'optional')
    ],
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1')
};


// DEAD WEEK
cs10.week16 = {
    lectA: lect(null),
    labA: lab(null),
    lectB: lect(null),
    labB: lab(null),
    disc: disc('Welcome to CS10!'),
    hw: hw('HW0')
};

// Dec 15 - 19
cs10.week17 = {
    lectA: lect(null),
    labA: lab(null),
    lectB: lect('Welcome and Abstraction'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Getting Started With <span class=“snap”>snap</span>'),
    hw: hw('Start on HW1')
};

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
