/*****************************************************************************/
/*
CS10 -- staff.js
This file builds the staff images section from JSON data and makes working with
these images much easier.
Here is a sample object (with all properities):
DanGarcia = {
    name: 'Sr. Lecturer SOE Dan Garcia',
    img: 'http://www.cs.berkeley.edu/~ddgarcia/gifs/DanGarciaUCBFaculty2004.jpg',
    imgSrc: 'DanGarcia.jpg',
    web: 'http://www.cs.berkeley.edu/%7Eddgarcia/',
    bio: 'DanBio.txt',
    email: 'ddgarcia@cs.berkeley.edu',
    office: '777 Soda, (510) 517-4041'
}

OR There is a simplified version for standard names:
BrandonChen = { name: 'Brandon Chen',
    img: 'Sp14/BrandonChen.jpg',
    imgSrc: 'BrandonChen.jpg' }
can be created with simply 'Brandon Chen' as a string in the appropriate lists.
NOTE: All images must be in the proper folders and match the name, w/o spaces.

You can create any objects like this. REQUIRED ARE: name, img, imgSrc
'imgSrc' should be a small image in the directory ~/public_html/resources/images/small/ *

There are a few lists of objects:
instructors, tas, readers, las -- more can be created if necessary:
To add a new section:
1. Add a div with an ID to staff.html
2. Add the same ID name to the 'all' object.
3. Add a call to buildGroup(), with the ID name (string) and the number of
images per row (int)
*/
/*****************************************************************************/

// JSON mappings for staff images / info.
// Instructors
DanGarcia = {
    name: 'Sr. Lecturer SOE Dan Garcia',
    img: 'DanGarciaUCBFaculty2004.jpg',
    imgSrc: 'DanGarcia.jpg',
    web: 'http://www.cs.berkeley.edu/%7Eddgarcia/',
    bio: 'DanBio.txt',
    email: 'ddgarcia@cs.berkeley.edu',
    office: '777 Soda, (510) 517-4041'
};

GeraldF = {
    name: 'Dr. Gerald Friedland',
    img: 'Fa13/Gerald.jpg',
    imgSrc: 'Gerald.jpg',
    web: 'http://www.cs.berkeley.edu/%7Eddgarcia/',
    //bio: 'DanBio.txt',
    email: 'fractor@icsi.berkeley.edu',
    office: '329 Soda' };

// TAs
michaelB = {
    name: 'Head TA Michael Ball',
    img: 'Sp14/MichaelBallTake3.jpg',
    imgSrc: 'MichaelBall.jpg',
    web: 'http://michaelballphoto.com',
    bio: 'MichaelBall.txt',
    email: 'ball@berkeley.edu' };

maxD = {
    name: 'TA Max Dougherty',
    img: 'Sp14/MaxDougherty.jpg',
    imgSrc: 'MaxDougherty.jpg',
    email: 'mdougherty@berkeley.edu' };

jeffreyS = {
    name: 'TA Jeffrey Snowiss',
    img: 'Fa12/JeffreySnowiss.jpg',
    imgSrc: 'JeffreySnowiss.jpg',
    email: 'jasnowiss10@gmail.com' };

victoriaS = {
    name: 'TA Victoria Shi',
    img: 'Fa13/VictoriaShi.jpg',
    imgSrc: 'VictoriaShi.jpg',
    bio: 'VictoriaBio.txt',
    email: 'victoria.shi@berkeley.edu' };

rachelH = {
    name: 'TA Rachel Huang',
    img: 'Fa13/RachelHuang.jpg',
    imgSrc: 'RachelHuang.jpg',
    email: 'rachelhuang072@berkeley.edu'
};

jannaG = {
    name: 'TA Janna Golden',
    img: 'Sp14/JannaGolden.jpg',
    imgSrc: 'JannaGolden.jpg',
    email: 'jannagolden@berkeley.edu'
};

sumerM = {
    name: 'TA Sumer Mohammed',
    img: 'Fa12/SumerMohammed.jpg',
    imgSrc: 'SumerMohammed.jpg',
    email: 'sumermohammed@berkeley.edu' };

josephC = {
    name: 'TA Joseph Cawthorne',
    img: 'Fa13/JosephCawthorne.jpg',
    imgSrc: 'JosephCawthorne.jpg',
    email: 'cs10tajcawth@gmail.com' };

jaclynB = {
    name: 'TA Jaclyn Burge',
    img: 'Fa13/JaclynBurge.jpg',
    imgSrc: 'JaclynBurge.jpg',
    web: 'www.jacburge.me',
    email: 'jacburge.cs10@gmail.com' };

andyS   = {
    name: 'TA Andrew Schmitt',
    img: 'Sp14/AndrewSchmitt.jpg',
    imgSrc: 'AndrewSchmitt.jpg',
    email: 'aschmitt@berkeley.edu'};

LaurenMock = {
    name: 'Head TA Lauren Mock',
    img: 'Sp14/LaurenMock.jpg',
    imgSrc: 'LaurenMock.jpg',
    web: 'http://linkedin.com/in/laurenmock',
    email: 'lmock@berkeley.edu' };

adamK = {
    name: 'TA Adam Kuphaldt',
    img: 'Sp14/AdamKuphaldt.jpg',
    imgSrc: 'AdamKuphaldt.jpg',
    email: 'akuphaldt@berkeley.edu' };

AranyU = {
    name: 'TA Arany Uthayakumar',
    img: 'Sp14/AranyUthayakumar.jpg',
    imgSrc: 'AranyUthayakumar.jpg',
    bio: 'AranyBio.txt',
    email: 'arany@berkeley.edu' };

StevenT = {
    name: 'TA Steven Traversi',
    img: 'Sp14/StevenTraversi.jpg',
    imgSrc: 'StevenTraversi.jpg',
    email: 'straversi@berkeley.edu'
};


// Readers
songS   = {
    name: 'Reader Song Sok',
    img: 'Fa13/SongSok.jpg',
    imgSrc: 'SongSok.jpg' };

claireW = {
    name: 'Reader Claire Watanabe',
    img: 'Fa13/ClaireWatanabe.jpg',
    imgSrc: 'ClaireWatanabe.jpg' };

brandonC = {
    name: 'Reader Brandon Chen',
    img: 'Sp14/BrandonChen.jpg',
    imgSrc: 'BrandonChen.jpg' };

carlosF = {
    name: 'Reader Carlos Flores',
    img: 'Fa13/CarlosFlores.jpg',
    imgSrc: 'CarlosFlores.jpg' };

alexM = {
    name: 'Reader Alex McKinney',
    img: 'Sp14/AlexMcKinney.jpg',
    imgSrc: 'AlexMcKinney.jpg' };

jobelV = {
    name: 'Reader Jobel Vecino',
    img: 'Fa13/JobelVecino.jpg',
    imgSrc: 'JobelVecino.jpg' };


/*****************************************************************************/
/** LIST DEFINITIONS **/
/*****************************************************************************/

instructors = [ GeraldF ];

tas = [ michaelB, LaurenMock, adamK, andyS, AranyU, jaclynB, jannaG, josephC, jeffreyS, maxD,
        rachelH, sumerM, StevenT, victoriaS];

readers = [ alexM, brandonC, carlosF, claireW, jobelV ];

// If you need to add a new SECTION add it to this object.
// Follow the same format.
all = {
    instructors: instructors,
    readers: readers,
    tas: tas
};

/*****************************************************************************/
/* DATA POPULATION FUNCTIONS  */
/*****************************************************************************/

function imgError(image) {
    image.src = 'resources/images/NPY3D.jpg';
}

// Build a basic object for a person from the current semester.
function baseObj(name) {
    src = name.replace(/ /g , '');
    return { name: name,
             img: 'Sp14/' + src + '.jpg',
             imgSrc: src + '.jpg' };
}

function buildPerson(data, width) {
    // Given a JSON object build a div that contains all the person's info
    // width is used to control how many are on a row on the page.

    // Build data objects for very simple cases with nothing special.
    if (data.constructor === String) {
        data = baseObj(data);
    }

    // Create a table element with this person's data, setting a class for width
    var cls = 'col-md-' + (width === 5 ? '20' : Math.floor(12/width));
    elm = '<div class="'+ cls + '">';
    if (!!data.img) {
        elm += '<a href="resources/images/' + data.img + '">';
    }

    elm += '<img onerror="imgError(this)" class="staff" align="center" ';
    elm += 'alt="' + data.name + '" title="' + data.name + '" src="resources/images/small/';
    elm += data.imgSrc + '" />';
    if (!!data.img) {
        elm += '</a>';
    }
    elm += '<br /><strong>';
    if (!!data.web) {
        elm += '<a href="' + data.web + '">' + data.name + '</a>';
    } else {
        elm += data.name;
    }
    elm += '</strong> ';
    if (!!data.bio) {
        elm += '(<a href="bios/' + data.bio + '">bio</a>)';
    }
    if (!!data.email) {
        elm += '<br /><a href="mailto:' + data.email +
        '?subject=[CS10] SUBJECT"><code>' + data.email + '</code></a>';
    }
    if (!!data.office) {
        elm +=  '<br />' + data.office;
    }
    elm += '</div>';
    return elm;
}

function buildGroup(group, w) {
    // Build a set of table rows, with W items per row
    // based on the people in the GROUP
    // Add them to the appropriate HTML table element
    ppl = all[group];
    doc = document.getElementById(group);
    content = '';
    for (var i = 0; i < ppl.length; i += w) {
        content += '<div class="row staffimgrow">';
        for (var j = i; j < (i + w) && j < ppl.length; j += 1) {
            if (i + w > ppl.length) {
                 w = ppl.length - i;
             }
            content += buildPerson(ppl[j], w);
        }
        content += '</div>';
        content += '<div class="clearfix"></div>';
    }
    doc.innerHTML += content;
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    };
  }
}

/* more code to run on page load */
// Parameters: a section (HTML 'id') and num of images per row.
buildGroup('instructors', 1);
buildGroup('tas', 5);
buildGroup('readers', 5);
