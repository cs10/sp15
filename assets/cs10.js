var cs10 = cs10 || {};
cs10.startDate = '2015-01-19';
cs10.endData   = '2015-05-15';

cs10.bCoursesID = '';
cs10.gradingScheme = {
    
};






// Maps days since **saturday** to the appropriate cell numbers
// Its value is the cell numbers to deal with.
// The file dynamically calculates days for the semester and doesn't read
// dates from specific cells.
var since = [
    [2],       // 0 days -- Sun: readings
    [3, 4],    // 1 day  -- Mon: lec lab 1
    [4],       // 2 days -- Tues: lab 1
    [5],       // 3 days -- Wed: lab 1, lec2, lab 2
    [6],       // 4 days -- thurs: lab 2
    [6, 7],    // 5 days -- fri: lab 2, disc, hw
    [2],       // 6 days -- Sat: readings
];

var STYLE  = "8px solid Gold";
var MS_DAY = 1000*60*60*24;
// Function used to highlight the current day.
function updateCalendar(date) {
    // The SATURDAY before the first week of the calendar.
    var start = new Date(2014, 7, 18),
        today = date || new Date(),
        highlight = since[ today.getDay() ],
        weeks = Math.floor(((today - start) / MS_DAY) / 7); // Weeks SINCE start
    // if (highlight[0] === 2) {
    //     weeks += 1; // really shitty hack for weekends....
    // }

    var rows = document.getElementsByClassName("cal"),
        temp = rows[weeks],
        cells;

    // Date is out of range of calendar
    if (typeof temp === 'undefined') {
        return;
    }

    cells = temp.cells;

    if (today.getDay() === 3) { // HIGHLIGHT LAB ON WEDS BASED ON TIME OF DAY
        var n = (today.getHours() < 12) ? 4 : 6;
        highlight.push(n);
    }

    // Hack for weeks like spring break, deadweek
    // Not a robust hack, but it should work OK.
    c = (cells.length == 5) ? 3 : highlight[0];

    cells[c].style.border = STYLE;
    if (c === 2 & weeks >= 2) { // HW, in the row before
        // CANT USE 8 BECAUSE ALL WEEKS ARENT THE SAME DARNIT.
        prev = rows[weeks].cells;
        rows[weeks].cells[prev.length - 1].style.border = STYLE;
    }
    if (highlight[1] && cells.length > highlight[1]) {
        cells[highlight[1]].style.border = STYLE;
    }

    // Grey out cells that have past
    for(i = 1; i < rows.length; i += 1) {
        cells = rows[i].cells;
        for(j = 2; j < cells.length; j += 1) {
            if (cells[j].style.border) { return; }
            cells[j].style.background = "#BBB";
            // Go 1 level deep to change the background on inner divs.
            // FIXME: Banish the jQuery? or make this recursive... or
            // not because I would ever need it? But it might be fun...
            if (typeof $ !== 'undefined') {
                if ($(cells[j]).has('div')) {
                    $(cells[j]).children().css('background', '#BBB');
                }
            }
        }
    }
}

function displaySpeech(img_name, img_src) {
    document[img_name].src = img_src;
}

function updateReadings() {
    var readings = document.getElementsByClassName("reading"), i = 0;
    for(; i < readings.length; i++) {
        readings[i].target = "_blank";
    }
}

function updateLabs() {
    var urlEnd = "&novideo&noreading&noassingment&course=cs10_sp15.html",
        links = document.getElementsByClassName("lablink"), i = 0,
        // We are not being served from an inst server
        // (indentified as many domains, cs10.b.e, inst.eecs.b.e, the IP, etc)
        replace = location.pathname.indexOf('/~cs10/') === -1,
        // Find the labs/ url to replace
        // +4 because idexOf returns the position of the l
        idx = links[0] ? links[0].href.indexOf('labs/') + 4 : 0,
        backupURL = 'http://beautyjoy.github.io/bjc-r/',
        url = '';

    for(; i < links.length; i++) {
        url = links[i].href;
        if (replace && idx !== 0) {
            url = backupURL + url.slice(idx);
        }
        links[i].href = url + urlEnd;
        links[i].style.fontWeight = 700;
        links[i].target = "_blank";
    }
}
