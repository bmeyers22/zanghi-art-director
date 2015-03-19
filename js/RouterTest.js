var AppRouter = Backbone.Router.extend({
    routes: {
        "contact(/:touch)": "contactRoute",
    	"about(/:touch)": "aboutRoute",
        "work/:project_id(/:touch)": "workIdRoute",
        "work": "workRoute",
        "touch/:touch_id": "touchRedirect",
        "*actions": "defaultRoute" // matches http://example.com/#anything-here
    },
    defaultRoute: function() {
        appRouter.navigate('/work', {trigger: true, replace: true});
    },
    touchRedirect: function(touch_id) {
        if (touch_id == 0) {
            appRouter.navigate('/work/true', {trigger: true, replace: false});
        } else if (touch_id >= 1 && touch_id <= NUM_PROJECTS) {
            appRouter.navigate('/work/'+touch_id+'/true', {trigger: true, replace: false});
        }
        //appRouter.navigate('/work', {trigger: true, replace: true});
    },
    workRoute: function (touch) {
        if (INITIALIZED) {
            if (touch == 'true') {
                slideProjects(0, true);
            } else {
                slideProjects(0);
            }
        } else {
            initializeWork(0);
        }
        initTopNavLinks('work');
        CURRENT_ROUTE = 'work';
    },
    workIdRoute: function (project_id, touch) {
        console.log(touch);
        if (project_id >= 1 && project_id <= NUM_PROJECTS) {
            if (INITIALIZED) {
                if (touch == 'true') {
                    slideProjects(project_id, true);
                    appRouter.navigate('/work/'+project_id, {trigger: false, replace: true});
                } else {
                    slideProjects(project_id);
                }
            } else {
                initializeWork(project_id);
            }
            initTopNavLinks('work');
        } else if (project_id == 'true') {
            slideProjects(0, true);
            appRouter.navigate('/work', {trigger: false, replace: true});
        } else {
            appRouter.navigate('/work', {trigger: true, replace: true});
        }
        CURRENT_ROUTE = 'work';
    },
    aboutRoute: function (touch) {
        if (INITIALIZED) {
            slideProjects(NUM_PROJECTS + 1);
        } else {
            initializeWork(NUM_PROJECTS + 1);
        }
        initTopNavLinks('about');
        CURRENT_ROUTE = 'about';
    },
    contactRoute: function (touch) {
        if (INITIALIZED) {
            slideProjects(NUM_PROJECTS + 2);
        } else {
            initializeWork(NUM_PROJECTS + 2);
        }
        initTopNavLinks('contact');
        CURRENT_ROUTE = 'contact';
    }
   
});	
// Initiate the router
var appRouter;
function loadProjectImages(id) {

    var img = 0;
    if (!PROJECT_IMG_LOADED[id-1]) {
        $('.activeSlide .projectContentWrapper img').each(function () {
            if (img != 0) {
                $(this).attr('src', $(this).attr('rel'));
            }
            img++;
        });
        
    }
    PROJECT_IMG_LOADED[id-1] = true;
}

function letImagesLoad(images) {
    fixHeight();
    images.each( function () {
        $(this).load(function () {
            fixHeight();
        });
    });
}

function fixHeight() {
    var wrapper = $('#wrapper');
    wrapper.animate({'height': $('.activeSlide').outerHeight() + 'px'}, {queue: false, duration: 600});
    console.log("Fixing height!!!");
}

function slideProjects(id, touch) {
    CURRENT_SLIDE = parseInt(id);
    var wrapper = $('#wrapper');
    var percent = id*(-100);
    var percentString = percent+'%';
    var currentPixel = parseFloat(wrapper.css('left'));
    var currentPercent = Math.round(parseFloat(wrapper.css('left'))/parseFloat($('.superWrapper').css('width'))*100);
    var factor = (Math.abs((percent-currentPercent))-100)/1000+1;
    $("body,html,document").scrollTop(0);
    var prevHeight = $('.activeSlide').outerHeight();
    $('.activeSlide').removeClass('activeSlide');
    var activeSlide = $('.slideWrapper')[id];
    $(activeSlide).addClass('activeSlide');
    if (INITIALIZED) {
        if (currentPercent < percent) {
            if(MOBILE) {
                if (touch) {
                    wrapper.animate({left: percentString}, 400, 'easeOutBack');
                } else {
                    wrapper.css('left', percentString);
                }
            } else if (touch) {
                wrapper.animate({left: percentString}, 400, 'easeOutBack');
            } else {
                var percentBefore = percent-Math.abs((percent-currentPercent)*(1/3));
                // wrapper.animate({left: currentPixel - 50 + 'px'}, 250).delay(100).animate({left: percentString}, 1200*factor, 'easeOutBack', function () {
                //    // wrapper.animate({'height': $('.activeSlide').outerHeight() + 'px'}, 'slow');
                // });
                wrapper.animate({left: currentPixel - 50 + 'px'}, 250).delay(100)
                .animate({left: percentBefore+'%'}, 200*factor).delay(1)
                .animate({left: percentString}, 700*factor, 'easeOutBack', function () {
                    //wrapper.animate({'height': $('.activeSlide').outerHeight() + 'px'}, 'slow');
                });
            }
            
        } else if (currentPercent > percent) {
            if(MOBILE) {
                wrapper.css('left', percentString);
            } else if (touch) {
                wrapper.animate({left: percentString}, 400, 'easeOutBack');
            } else {
                var percentBefore = percent+Math.abs((percent-currentPercent)*(1/3));
                // wrapper.animate({left: currentPixel + 50 + 'px'}, 250).delay(100).animate({left: percentString}, 1200*factor, 'easeOutBack', function () {
                //     //wrapper.animate({'height': $('.activeSlide').outerHeight() + 'px'}, 'slow');
                // });            
                wrapper.animate({left: currentPixel + 50 + 'px'}, 250).delay(100)
                .animate({left: percentBefore+'%'}, 200*factor).delay(1)
                .animate({left: percentString}, 700*factor, 'easeOutBack', function () {
                    //wrapper.animate({'height': $('.activeSlide').outerHeight() + 'px'}, 'slow');
                });
            }
        } else {

        }
        if (id > 0 && id <= NUM_PROJECTS) {
            loadProjectImages(id);
        }
        letImagesLoad($('.activeSlide img'));
    } else {
        wrapper.css('left', percentString);
    }
}

function initializeWork(id) {
    START_ID = id;
    var count = 0;
    getProject(count);

}

function getProject(id) {
    var url,
        slide;
    if (id == 0) {
        url = '/work.html';
        slide = '.workSlide';
    } else if (id == NUM_PROJECTS + 1) {
        url = '/about.html';
        slide = '.aboutSlide';
    } else if (id == NUM_PROJECTS + 2) {
        url = '/contact.html';
        slide = '.contactSlide';
    }
    if (id == 0) {
        _.templateSettings.variable = "work";
        var template = _.template(
            $( "script.work_template" ).html()
        );
        HTML_PAGES[id] = template(PROJECT_ARR);
        id++;
        getProject(id);
    } else if (id <= NUM_PROJECTS && id != 0) {
        _.templateSettings.variable = "proj";
        template = _.template(
            $( "script.project_template" ).html()
        );
        var index = id - 1;
        var data = PROJECT_ARR[index];
        var p = new Project(data);
        HTML_PAGES[id] = template(p);
        id++;
        getProject(id);
    } else {
        $.get(url, function(data) {
            HTML_PAGES[id] = data;
            id++;
            if (id <= NUM_PROJECTS+2) {
                getProject(id);
            } else {
                for (var key in HTML_PAGES) {
                    $('#wrapper').append(HTML_PAGES[key]);
                }
                $('#wrapper').append($('#blankHtml').html());
                $('#wrapper').append($('#blankHtml').html());
                $('#wrapper').append('<div style="clear:both;"></div>');
                var navLink;
                if (START_ID == 0) {
                    slide = '.workSlide';
                    navLink = 'work';
                } else if (START_ID == NUM_PROJECTS + 1) {
                    slide = '.aboutSlide';
                    navLink = 'about';
                } else if (START_ID == NUM_PROJECTS + 2) {
                    navLink = 'contact';
                    slide = '.contactSlide';
                } else {
                    slide = '.project_'+PROJECT_ARR[START_ID - 1].title;
                    navLink = 'work';
                }
                $(slide).addClass('activeSlide');
                $('#wrapper').css('width', WRAPPER_WIDTH);
                slideProjects(START_ID);
                setupWork();     
                initTopNavLinks(navLink);
                if (START_ID > 0 && START_ID <= NUM_PROJECTS) {
                    loadProjectImages(START_ID);
                }
                INITIALIZED = true;
                letImagesLoad($('.activeSlide img'));
                setTimeout(responsiveHeader, 100);
                setTimeout(resizeSlides, 200);
            }
            
        });
    }
}

function resizeSlidesAbs() {
    return;
    var absolute = $('#wrapper').outerWidth()/(NUM_PROJECTS+4);
    $('.slideWrapper').each( function () {
        $(this).css('width', absolute + 'px');
    }); 
}
function resizeSlides() {
    $('.slideWrapper').each( function () {
        $(this).css('width', SLIDE_DIV_WIDTH);
    }); 
}
function initSocialButtons() {
    (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

}
function setupWork() {
    resizeSlidesAbs();
    setupWorkLightBox();
    initProjectNav();
    initContactIcons();
    initDLResume();
    initSocialButtons();
    if ($(window).width() < 505) {
        changeRows505();
    } else if ($(window).width() < 980) {
        changeRows980();
    } else {
        changeRowsDefault();
    }     
}