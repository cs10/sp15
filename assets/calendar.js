var cs10 = cs10 || {};

// Sunday at the start of the semester
cs10.startDate = '{{ site.startDate }}';
cs10.endDate   = '{{ site.endDate }}';

cs10.bCoursesID = '{{ site.bCourses }}';
cs10.gradingScheme = {
    'A+': 485,
    'A' : 470,
    'A-': 460,
    'B+': 450
};

// Full Calendar Modifications
// Notes: http://fullcalendar.io/docs/event_data/Event_Object/
// TODO: Move this location
// Addition to modify links for CS10 calendar.
function getRoomURL(loc) {
    var base = "http://www.berkeley.edu/map/3dmap/3dmap.shtml?",
        url  = { SD: 'sutardja',
                 SDH: 'sutardja',
                 LKS: 'likashing',
                 Soda: 'soda',
                 VLSB: 'valleylifesciences' },
        room = loc ? loc.split(' ')[1] : '';

    if (url[room]) {
        room = url[room];
    }

    return base + room;
}

function editTitle(t) {
    return t.replace(/CS10\s*/gi, '');
}

cs10.fullCalTransorm = function(event) {
    console.log(event.title);
    event.url = getRoomURL(event.title);
    event.title = editTitle(event.title);
    console.log(event);
    return event;
}

// ==================================================
// ==========     OBJECT CREATION          ==========
// ==================================================
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
    var baseURL = 'http://beautyjoy.github.io/bjc-r/llab/html/topic.html?topic=';
    var urlEnd  = '&novideo&noreading&noassingment&course=cs10_sp15.html';
    var lab = { type: 'Lab' };
    lab.title = title;

    // Global Counter for lecture
    cs10.rqCounter = cs10.rqCounter || 0;

    if (!title) {
        lab.title = 'No Lab';
    }

    if (url) {
        lab.url = baseURL + url + urlEnd;
    }

    if (rq) {
        cs10.rqCounter += 1;
        rq = cs10.rqCounter;
    }

    if (title.indexOf('Project Work') !== -1) {
        lab.classes = 'project';
    }

    if (title.indexOf('No Lab') !== -1 || title.indexOf('No Class') !== -1) {
        lab.classes = 'noClass';
    }

    lab.RQ = rq;

    lab.video = video;
    return lab;
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

cs10.newLectureObject = function(title, path, videoURL, guest) {
    var lect = { type: 'Lecture' };

    lect.title = title;
    if (!title) {
        lect.title = 'No Lecture';
        return lect;
    }

    if (title.indexOf('No Lecture') !== -1 || title.indexOf('No Class') !== -1) {
        lect.classes = 'noClass';
    }
    if (path) {
        lect.url = 'lecture/' + path + '/';
    }

    lect.guest = guest;
    lect.video = videoURL;
    return lect;
};

cs10.newDiscussionObject = function(title, files) {
    var disc = { type: 'Discussion' };

    disc.title = title;
    if (!title) {
        disc.title = 'No Discussion';
    }

    if (title.indexOf('No Discussion') !== -1 || title.indexOf('No Class') !== -1) {
        disc.classes = 'noClass';
    }

    // Global Counter for discussions
    cs10.discussionCounter = cs10.discussionCounter || 0;
    cs10.discussionCounter += 1;

    if (files) {
        var count = cs10.discussionCounter;
        disc.url = 'discussion/' + (count < 10 ? '0' : '') + count + '/';
    }

    return disc;
};
cs10.newHomeworkObject = function(title, spec, bCoursesID, notes) {
    var obj = { type: 'Homework' };

    // TODO: Consider refactoring this....
    if (!title) {
        obj.title = 'No Homework!<br />But you might want to check next week\'s';
        return obj;
    }

    obj.title = title;
    obj.classes = 'due';
    if (spec) {
        obj.url = spec;
    }
    // Set Submission URL
    // Set the due Date from bCourses
    return obj;
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

cs10.renderTableCalendar = function() {
    var result = $('<tbody>');
    var table = $('.calendar.table');
    if (table.length === 0) { return; }
    for(var i = 1; i < 18; i += 1) {
        result.append(cs10.renderTableRow(i, cs10['week' + i]));
    }
    table.append(result);
};

// This renders a single week in the large semester calendar.
cs10.renderTableRow = function(week, data) {
    var result = $('<tr>').addClass('cal');

    // TODO: Special Case For data.special
    // TODO: Handle Exams (data.exams)

    result.append($('<td>').html(week))                     // Week Number
          .append($('<td>').html(cs10.getDateString(week))) // Dates
          .append(cs10.renderTableReading(data.readings))   // Readings
          .append(cs10.renderTableLecture(data.lectM))      // Mon Lecture
          .append(cs10.renderTableLab(data.labA))           // 1st Lab
          .append(cs10.renderTableLecture(data.lectW))      // Wed Lecture
          .append(cs10.renderTableLab(data.labB))           // 2nd Lab
          .append(cs10.renderTableDiscussion(data.disc))    // Discussion
          .append(cs10.renderTableHW(data.hw));             // Assignments

    return result;
};

cs10.getDateString = function(week) {
    var start = cs10.getWeekStartDate(week);
    var end   = moment(start).add(5, 'd');
    return (start.month() + 1) + '-' + start.date() + ' to ' +
            (end.month() + 1) + '-' + end.date();
};

cs10.renderTableReading = function(readings) {
    var result = $('<td>');
    if (!readings) {
        result.append('No Reading');
    } else if (typeof readings === 'string') {
        result.append(readings);
    } else {
        for (var i = 0; i < readings.length; i += 1) {
            var rd = readings[i];
            var a = $('<a>').html(rd.title).attr(
                {'class': rd.classes, 'href': rd.url, 'target': '_blank'} );
            result.append(a);
            result.append('<br>');
        }
    }
    return result;
};

cs10.renderTableLecture = function(lect) {
    var result = $('<td>');
    if (!lect) {
        result.append('No Lecture');
        result.attr({'class': 'noClass'});
    } else if (typeof lect === 'string') {
        result.append(lect);
    } else {
        if (lect.geust) {
            result.append($('<strong>').html('Guest Lecturer: ' + lect.guest));
            result.append($('<br>'));
        }
        var tag = lect.url ? '<a>' : '<span>';
        var title = $(tag).attr({'href': lect.url}).html(lect.title);
        result.append(title);
        result.append('<br>');
        if (lect.video) {
            result.append('<br>');
            result.append($('<a>').html('(Sp12 HD video with Qs)').attr(
                {'href' : lect.video, 'target' : '_blank'} ));
        }
        result.attr({ 'class' : lect.classes });
    }
    return result;
};

cs10.renderTableLab = function(lab) {
    var result = $('<td>');
    if (!lab) {
        result.append('No Lab');
        result.attr({'class': 'noClass'});
    } else if (typeof lab === 'string') {
        result.append(lab);
    } else {
        var tag = lab.url ? '<a>' : '<span>';
        var title = $(tag).html(lab.title).attr({
            'href': lab.url, 'target': '_blank'});
        result.append(title);
        result.append('<br>');
        if (lab.RQ) {
            result.append($('<br>'));
            result.append($('<strong>').html('Reading Quiz ' + lab.RQ +' (in lab)'));
        }
        result.attr({ 'class' : lab.classes });
        if (lab.video) {
            result.append($('<br>'));
            result.append($('<a>').html('(Video Review)').attr({
                'href' : lab.video, 'target' : '_blank'
            }));
        }
    }
    return result;
};

cs10.renderTableDiscussion = function(disc) {
    var result = $('<td>');
    if (!disc) {
        result.append('No Discussion');
        result.attr({'class': 'noClass'});
    } else if (typeof disc === 'string') {
        result.append(disc);
    } else {
        result.append(disc.title);
        result.append('<br>');
        result.attr({ 'class' : disc.classes });
        if (disc.url) {
            result.append($('<br>'));
            result.append($('<strong>').html(
                $('<a>').html('(Resources)').attr({'href' : disc.url})
            ));
        }
    }
    return result;
};

cs10.renderTableHW = function(hw) {
    var result = $('<td>');
    if (!hw) {
        result.append('No Homework');
    } else if (typeof hw === 'string') {
        result.append(hw);
    } else { // HW is a list.
        result.append(hw.title);
        result.append('<br>');
        result.attr({ 'class' : hw.classes });
        if (hw.url) {
            result.append($('<br>'));
            result.append($('<a>').html('(Spec)').attr({'href' : hw.url}));
        }
    }
    return result;
};