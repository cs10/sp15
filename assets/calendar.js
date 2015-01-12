var cs10 = cs10 || {};

// Sunday at the start of the semester
cs10.startDate = '2015-01-18'; // Date strings
cs10.endDate   = '2015-05-16';

cs10.bCoursesID = '';
cs10.gradingScheme = {
    'A+': 480
};

// Return the week of the course in range [1, 17] else -1
function getWeekOfDate(date) {
    var now = new Date();
    var from = date;
    if (typeof from === 'string') {
        from = new Date(date);
    }

    var dist = from - now;

    if (dist < 0) {
        return -1;
    }

    var weeks = Math.floor(dist / (MS_DAY * 7));

    return weeks <= 17 ? weeks : -1;
}


cs10.newLabObject = function(title, url, rq, video) {
    // FIXME -- better handle the URL via config
    // TODO  -- How does "Project Work" or no lab fit into this?
    var baseURL = '../labs/llab/html/topic.html?topic=';
    var labObj = { type: 'Lab' };
    labObj.title = title;

    // Global Counter for lecture
    cs10.rqCounter = cs10.rqCounter || 0;

    if (!title) {
        labObj.title = 'No Lab';
    }
    if (url) {
        labObj.url = baseURL + url;
    }

    if (rq) {
        cs10.rqCounter += 1;
        rq = cs10.rqCounter;
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

cs10.newLectureObject = function(title, videoURL, guest) {
    var obj = { type: 'Lecture' };

    if (!title) {
        obj.title = 'No Lecture';
        return obj;
    }
    // Global Counter for lecture
    cs10.lectureCounter = cs10.lectureCounter || 0;
    cs10.lectureCounter += 1;
    var count = cs10.lectureCounter;
    var lectureURL = 'lectures/' + (count < 10 ? '0' : '' ) + count + ' ' + title + '/';
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
cs10.newHomeworkObject = function(title, spec, bCoursesID, notes) {
    var obj = { type: 'Homework' };

    // TODO: Consider refactoring this....
    if (!title) {
        obj.title = 'No Homework!<br />But you might want to check next week\'s';
        return obj;
    }

    obj.title = title;
    obj.classes = 'assignmentDue';
    if (spec) {
        obj.url = spec;
    }
    // Set Submission URL
    // Set the due Date from bCourses
    return obj;
};

var lab      = cs10.newLabObject,
    reading = cs10.newReadingsObject,
    lect     = cs10.newLectureObject,
    disc     = cs10.newDiscussionObject,
    hw       = cs10.newHomeworkObject;

// ==================================================
// ==========     SCHEDULE ITEMS           ==========
// ==================================================

// JAN 19 - 23
cs10.week1 = {
    readings: 'No Readings',
    lectM: 'No Lecture Monday',
    labA: 'No Labs Monday, Tuesday, or Wednesday morning',
    lectW: lect('Welcome and Abstraction', 'https://coursesharing.org/courses/6/lectures/7'),
    labB: lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc: disc('Welcome to CS10!'),
    hw: hw('HW0')
};

// JAN 26 - 30
cs10.week2 = {
    readings: [
        reading('Prof. Harvey\'s Intro to Abstraction',
                '../sp11/lec/01/2010-08-30-CS10-L01-BH-Abstraction.txt'),
        reading('Why Software is Eating the World',
                'https://bcourses.berkeley.edu/courses/1246916/files#CS10%3A%20The%20Beauty%20and%20Joy%20of%20Computing%2FReadings%2FMarc_Andreessen_on_Why_Software_Is_Eating_the_World__WSJ.com.pdf'),
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
    lectM: lect('Functions'),
    labA: lab('Build Your Own Blocks', 'berkeley_bjc/intro_new/2-loops-variables.topic'),
    lectW: lect('Creativity and Abstraction'),
    labB: lab('Conditionals', 'berkeley_bjc/intro_new/3-conditionals.topic', true),
    disc: disc('Anatomy of a Computer and the Power of Binary'),
    hw: hw('HW1')
};

// FEB 2 - 6
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
    lectM: lect('3D Graphics'),
    labA: lab('Functions', 'berkeley_bjc/intro_new/4-abstraction-testing.topic', true),
    lectW: lect('Programming Paradigms'),
    labB: lab('Lists I', 'berkeley_bjc/lists/lists-I.topic'),
    disc: disc('All about lists'),
    hw: hw('HW2')
};

// FEB 9 - 13
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
    lectM: lect('Algorithms'),
    labA: lab('Algorithms', 'berkeley_bjc/areas/algorithms.topic', true),
    lectW: lect('Algorithmic Complexity'),
    labB: lab('Algorithmic Complexity', "berkeley_bjc/areas/algorithm-complexity.topic"),
    disc: disc('Algorithmic Complexity and Quest Review'),
    hw: hw('HW2')
};

// FEB 16 - 20
cs10.week5 = {
    exam: {

    },
    readings: 'No Readings',
    lectM: 'No Lecture (Holiday)',
    labA: 'No Labs Monday<br>Quest Help and Review',
    lectW: lect('No Lecture; Quest In Class'),
    labB: lab('berkeley_bjc/robots/robots.topic', 'Finch Robots'),
    disc: disc('Quest Debrief and HW3 Help'),
    hw: 'Start HW 3'
};

// FEB 23 - 24
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
    lectM: lect('Recursion I'),
    labA: lab('berkeley_bjc/recur/recursion-trees-fractals.topic', 'Trees and Fractals using Recursion', true),
    lectW: lect('Concurrency'),
    labB: lab('berkeley_bjc/areas/concurrency.topic', 'Concurrency'),
    disc: disc('<span style="font-size: 150%">R<sup>e<sup>c<sup>u<sup>r<sup>s<sup>i<sup>o<sup>n</sup></sup></sup></sup></sup></sup></sup></sup>'),
    hw: hw('HW3')
};

// MARCH 2 - 6 (Lauren, Dan, Michael out -- mostly)
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
    lectM: lect('Recursion II'),
    labA: lab('berkeley_bjc/recur/recursive-reporters-part1.topic', 'Recursive Reporters I', true),
    lectW: lect('Artificial Intelligence', '', 'A Guest'),
    labB: lab('Project Work'),
    disc: disc('Concurrency and Midterm Intro'),
    hw: hw('Start Midterm Project')
};

// MARCH 9 - 13 (Lauren, Dan, Michael partially out)
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
    lectM: lect('Social Implications I'),
    labA: lab('Project Work and Lab Review', '', true),
    lectW: lect('Social Implications II', '', 'Gerald Friedland'),
    labB: lab('Project Work'),
    disc: disc('Midterm Review'),
    hw: 'Work on midterm Project'
};

// MIDTERM WEEK
// MARCH 16 - 20
cs10.week9 = {
    exam: {

    },
    readings: 'No Readings',
    lectM: lect('Social Implications III', '', 'Brian Harvey'),
    labA: lab('Online <span class="snap">snap</span> Midterm'),
    lectW: lect('The Internet'),
    labB: lab('berkeley_bjc/areas/internet.topic', 'The Internet'),
    disc: disc('Midterm Debrief'),
    hw: hw('Midterm Project')
};

// Spring Break
// MARCH 23 - 27
cs10.week10 = {
    special: 'Spring Break'
};

// MARCH 30 - APRIL 3
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
    lectM: lect('HCI', '', 'Eric Paulos'),
    labA: lab('berkeley_bjc/lists/tic-tac-toe.topic', 'Tic Tac Toe', true),
    lectW: lect('The Internet II'),
    labB: lab('Project Work'),
    disc: disc('The Intenet'),
    hw: hw('Impact Writing Assignment')
};

// APRIL 6 - 10
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
    lectM: lect('Lambda and HOFs'),
    labA: lab('berkeley_bjc/hofs/hofs-practice.topic', 'Practice with HOFs and Functions as Data', true),
    lectW: lect('Besides Blocks I'), // THOUGHT: Move this up a weekx
    labB: lab('berkeley_bjc/python/besides-blocks-welcome.topic', 'Besides Blocks: Welcome to Python'),
    disc: disc('Data and HOFs'),
    hw: hw('Impact Post Comments')
};

// APRIL 13 - 17
cs10.week13 = {
    readings: [
        reading('The Heartbleed Bug',
                'http://blog.agilebits.com/2014/04/08/imagine-no-ssl-encryption-its-scary-if-you-try/'),
        reading('What Servers Bleed',
                'https://medium.com/p/804cdf4b48c1',
                'hard')
    ],
    lectM: lect('Besides Blocks II'),
    labA: lab('berkeley_bjc/python/besides-blocks-data-struct.topic', 'Besides Blocks: Data Structures in Python', true),
    lectW: lect('Data'),
    labB: lab('berkeley_bjc/python/besides-blocks-data.topic', 'Besides Blocks: Data in Python'),
    disc: disc('Practical Privacy Implications'),
    hw: [ hw('Data Project'),
          hw('Final Project Proposal') ]
};

// APRIL 20 - 24
cs10.week14 = {
    readings: [
        reading('The Great Robot Race (Video)',
                'https://www.youtube.com/watch?v=uoiJeIb0wBA'),
        reading('Halting Problem Poem',
                'http://introcs.cs.princeton.edu/java/76computability/halting-poem.html',
                'optional')
    ],
    lectM: lect('Future of Computing'),
    labA: lab('Project Work', '', true),
    lectW: lect('Limits of Computing'),
    labB: lab('Project Work'),
    disc: disc('CS @ Cal and Beyond'),
    hw: 'Start on the Final Project'
};

// APRIL 27 - MAY 1
cs10.week15 = {
    exam: {

    },
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
    lectM: lect('Saving the World with Computing', '', 'Kathy Yelick'),
    labA: lab('Project Work Lab', '', true),
    lectW: lect('Summary and Farewell'),
    labB: 'Online Exam',
    disc: disc('Summary and Farewell'),
    hw: hw('Final Project')
};


// DEAD WEEK
// MAY 4 - 7
cs10.week16 = {
    special: 'RRR Week -- No Class'
};

// MAY 11 - 15
cs10.week17 = {
    exam: {

    }
};


// ==================================================
// ==========     RENDERING CODE           ==========
// ==================================================

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


// REQUIRES MOMENTJS
cs10.getWeekStartDate = function(week) {
    var start = moment(cs10.startDate);

    return start.add((week - 1) * 7 + 1, 'd');
}

/*
<tr class="cal">
  <td>5</td>
  <td>9-22 to 9-26</td>
  <td>
      <a class="reading required" href="http://www.bitsbook.com/wp-content/uploads/2008/12/chapter2.pdf">BtB Chapter 2</a>
      <br>
  </td>
  <td>
      <strong>Guest Lecturer: Jon Kotker</strong>
      <br>
      <a href="lecture/L06 - Algorithms I/">Algorithms</a>
      <br>
      <a target="_blank" href="https://coursesharing.org/courses/6/lectures/14">(Sp12 HD video with Qs)</a>
  </td>
  <td>
      <a class="lablink" href="../labs/topic/topic.html?topic=berkeley_bjc/areas/algorithms.topic">Algorithms</a>
      &amp;
      Homework Help
      <br>
      <br>
      <strong>Reading Quiz 4 (in-lab)</strong>
  </td>
  <td>
      [Lecture...]
  </td>
  <td>
      [Lab...]
  </td>
  <td>
      Algorithmic Complexity &amp;
      <br>
      Quest Review
      <br>
      <strong>(<a href="disc/05/">Resources</a>)</strong>
  </td>
  <td class="due">
      <a href="assign.html?https://docs.google.com/document/d/18RPHqtdohWA6rAEYGkLcthGVS32RK7GB7zL3OP_y--Q/pub">Homework 2</a>
      <br>
      <a href="assign.html?https://docs.google.com/document/d/17Bb1Pwp1407bBbqUOJ6VFOUDQSsgSG5lxtRoBUl793E/pub">(Rubric)</a>
      <br>
      <em>due 9/26 @ 11:59PM on bCourses</em>
  </td>
</tr>
*/

cs10.renderTableCalendar = function() {
    var result = $('');
    var table = $('.calendar.table tbody');
    for(var i = 1; i < 18; i += 1) {
        result.apped(cs10.renderTableRow(i, cs10['week' + i]));
    }
    table.append(result);
};

cs10.renderTableRow = function(weekNum, data) {
    var result = $('<tr>').addClass('cal');
    var dateStr, start, end, readings, lectM, labA, lectW, labB, disc, hw;

    // Cell 1 Week Number
    result.append($('<td>').html(weekNum));

    // Cell 2 Dates, uses MomentJS
    start = cs10.getWeekStartDate(weekNum);
    end   = moment(start).add(5, 'd');
    dateStr = (start.month() + 1) + '-' + start.date() + ' to ' + (end.month() +
        1) + '-' + end.date();
    result.append($('<td>').html(dateStr));

    // Cell 3 Readings -- Review Sessions
    readings = $('<td>');
    if (!data.readings) {
        readings.append('No Reading');
    } else if (typeof data.readings === 'string') {
        readings.append(data.readings);
    } else {
        console.log(data.readings);
        for (var i = 0; i < data.readings.length; i += 1) {
            var rd = data.readings[i];
            var a = $('<a>').attr(
                {'class': rd.classes, 'href': rd.url, 'target': '_blank'} );
            readings.append(a);
            readings.append('<br>');
        }
    }
    result.append(readings);

    return result;
};