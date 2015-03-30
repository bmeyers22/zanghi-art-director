<?php

include 'bin/Mobile_Detect.php';
$detect = new Mobile_Detect;

$MINI = false;

$mobile = 0;
$tablet = 0;
if ($detect->isMobile()) {
	$mobile = 1;
}
if ($detect->isTablet()) {
	$tablet = 1;
}
$ogImgs = array(
		'breathe_right' => "breathe_right_trombone_print.png",
		'universal_studios' => "universal_spider_man_print.png",
		'omaha_steaks' => "omahasteaks_mailman_print.png",
		'words_w_friends' => "words_w_friends_sticker_sheet.png",
		'the_list' => "thelist_slide_1.png",
		'train_better' => "train_better_ad_lob.png",
		'burp_castle' => "burp_castle_outdoor_interactive_1.png",
		'pringles_fire' => "pringles_fire_ship.png"
	);
$p = '';
if (isset($_REQUEST['p'])) {
	$p = $_REQUEST['p'];
	$ogUrl = 'http://www.markzanghi.com/?p='.$p.'#/work/'.$p;
	$ogImgUrl = 'http://www.markzanghi.com/img/og/'.$ogImgs[$p];
} else {
	$ogUrl = 'http://www.markzanghi.com';
	$ogImgUrl = 'http://www.markzanghi.com/img/og/mark_zanghi_portfolio.png';
}


?>

<!DOCTYPE html>
<!-- <html manifest="/cache.manifest"> -->
<html>
<head>
	<title>Mark Zanghi Portfolio - Art Director</title>
	<!-- Iphone stuff -->
	<?php if($mobile && !$tablet) { ?>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" /> 
	<?php } else { ?>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /> 
	<?php } ?>	
	<meta name="apple-mobile-web-app-status-bar-style" content="black" /> 
 	<meta name="apple-mobile-web-app-capable" content="yes" />
 	<link rel="apple-touch-icon" href="/img/iphone_icon.png"/>  
	<meta name="description" content="Mark Zanghi is an ambitious Art Director based out of New York City and will be the hardest working hire you've ever made." />
	<meta name="keywords" content="design, portfolio, mark, zanghi, breathe right, universal, art director" /> 
 	<!-- Facebook stuff -->
	<meta property="og:title" content="Mark Zanghi Portfolio - Art Director" />
 	<meta property="og:url" content="<?php echo $ogUrl; ?>" />
 	<meta property="og:image" content="<?php echo $ogImgUrl; ?>" />
 	<meta property="og:description" content="Mark Zanghi Portfolio - Art Director" />
 	<link rel="icon" href="/img/favicon.png" type="image/png" />
	<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="/css/main<?php if ($MINI) { echo ".min"; } ?>.css" />
	<script type="text/javascript" src="/js/libs/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="/js/libs/jquery-ui-1.10.2.custom.min.js"></script>
	<script type="text/javascript" src="/js/libs/underscore-min.js" ></script>
	<script type="text/javascript" src="/js/libs/backbone-min.js" ></script>
	<script type="text/javascript" src="/js/libs/bootstrap.min.js" ></script>
	<script type="text/javascript">
		var TABLET = <?php if ($tablet == 1) { echo 'true'; } else { echo 'false'; } ?>;	
		var MOBILE = <?php if ($mobile == 1) { echo 'true'; } else { echo 'false'; } ?>;	
	</script>
	<script type="text/javascript" src="/js/globals<?php if ($MINI) { echo ".min"; } ?>.js" ></script>
	<script type="text/javascript" src="/js/Router<?php if ($MINI) { echo ".min"; } ?>.js" ></script>
	<script type="text/javascript" src="/js/app<?php if ($MINI) { echo ".min"; } ?>.js" ></script>
</head>
<body>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-41118305-1', 'markzanghi.com');
  ga('send', 'pageview');

</script>

	<div id="fb-root"></div>
	<header>
		<div class="topbar navbar navbar-inverse navbar-fixed-top" >
			<div class="headerWrapper">
				<div class="logo">
					<a href="#/work"><img src="/img/homeLogo.png" /></a>
				</div>
				<div id="fullTopBarLinks">
					<div class="topbarLinks">
						<a id="workLink" href="#/work"><img src="/img/workLink.png" /></a>
						<a id="aboutLink" href="#/about"><img src="/img/aboutLink.png" /></a>
						<a id="contactLink" href="#/contact"><img src="/img/contactLink.png" /></a>
					</div>
					<div class="clearfix"></div>
				</div>
				<a class="btn btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			      </a>
				<div class="clearfix"></div>
			</div>
			<div id="bottomWrap">
				
				<div id="bottomHeaderWrap" class="bottomHeader">
					<div id="leftBottomHeader" class="bottomFiller">
					</div>
					<div class="headerArrowImg">
						<div id="arrowImgWrapper">
							<img src="/img/headerArrowImg.png" />
						</div>
					</div>
					<div id="rightBottomHeader" class="bottomFiller">
					</div>
				</div>
				
			</div>
		</div>
		<div id="smallTopBarLinks" class="nav-collapse collapse">
			<ul class="nav">
              <li class="active"><a href="#/work">THE WORK</a></li>
              <li><a href="#/about">ABOUT</a></li>
              <li><a href="#/contact">CONTACT</a></li>
            </ul>
        </div>
	</header>
	<div class="superWrapper">
		<div id="wrapper">
		</div>
	</div>
	<footer>
		<div class="footerWrapper">
			<img id="footerLogo" src="/img/footerLogo.png" />
		</div>
	</footer>

	<!-- BEGIN: Underscore Template Definition. -->
    <script type="text/template" class="work_template">
	<div class="slideWrapper workSlide">
		<div id="narrowWrapper">
			<% _.each(work, function (proj){ %>
				<% if (proj.id % 3 == 1) { %> 
					<div class="row workGridRow">
				<% } %>
				<div class="span3 workGridItem" >
					<div class="workGridImages">
						<a href="#/work/<%- proj.title %>">
							<img class="workLightBox" src="/img/project_<%- proj.title %>/preview.png" />
							<% if (!TABLET) { %>
							<img class="workLightBoxGray" src="img/project_<%- proj.title %>/preview_bw.png" />
							<% } %>
						</a>
					</div>
				</div>
				<% if (proj.id % 3 == 0) { %> 
					</div>
				<% } %>
			<% }); %>
		</div>
	</div>
	</script>
	<!-- BEGIN: Underscore Template Definition. -->
    <script type="text/template" class="project_template">
 
	<div class="slideWrapper <%- proj.slideTitle %>">
		<div class="projectWrapper">
			<div class="projectHeaderWrapper">
				<div class="projectHeader">
					<div class="header-column navArrow navArrowLeft projectHeaderNavLeft">
						<img src="/img/projectArrowLeft.png" />
					</div>
					<div class="header-column navArrow navArrowRight projectHeaderNavRight">
						<img src="/img/projectArrowRight.png" />
					</div>
					<div class="header-column-info header-column">
						<div class="ideaWrap header-column">
							<div class="ideaHeader headingText">
								<span>IDEA:</span>
							</div>
							<div class="ideaContent">
								<span class="headingText ideaHeadingText"><%- proj.idea.title %></span><br/>
								<span class="ideaText"><%- proj.idea.content %></span>
							</div>
						</div>
						<div class="projectInfoWrap header-column">
							<div class="clientWrap">
								<div class="clientHeader headingText">
									<span>CLIENT:</span>
								</div>
								<div class="clientLogo">
									<img src="<%- proj.clientLogo %>" />
								</div>
							</div>
							<div class="creditWrap">
								<div class="creditHeader headingText">
									<span>CREDIT:</span>
								</div>
								<div class="creditContent">
									<% _.each(proj.credit, function (credit){ %>
										<div>
											<span class="creditTitle"><%- credit.title %> 
											<% if (credit.title != ' ') { %>-
												<% } else { %> <span style="visibility:hidden">-</span> 
												<% } %> </span><span class="creditName"><%- credit.name %></span>
										</div>
									<% }); %>
								</div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
			<div class="projectContentWrapper">
				<div class="projectContent">
					<% var first = true; %>
					<% _.each(proj.sections, function (section){ %>
						<div class="projectSection">
							<div class="sectionHeaderBorder"></div>
							<div class="sectionHeader">
								<span class="headingText"><%- section.title %></span>
							</div>
							<div class="sectionImages">
							<% _.each( section.imgs, function (img){ %>
								<% if (first) { %>
								<div class="sectionImg"><img src="<%- proj.imgFolder+img %>" /></div>
								<% first = false; } else { %>
									<div class="sectionImg"><img rel="<%- proj.imgFolder+img %>" src="/img/loading.gif" /></div>
								<% } %>
							<% }); %>
							</div>
						</div>
					<% }); %>
				</div>
			</div>
			<% if (proj.title != 'train_better') { %>
			<div class="socialFooter">

				<div class="promoteWrap">
					<span class="headingText">PROMOTE THIS PAGE</span>
				</div>
				<div class="projectSocialWrap">
					<div class="fbWrap">
						<div class="fb-like" data-href="http://www.markzanghi.com/?p=<%- proj.title %>#/work/<%- proj.title %>" data-send="false" data-layout="button_count" data-show-faces="false" data-font="verdana"></div>
					</div>
					<div class="twitterWrap">
						<a href="http://twitter.com/share" class="twitter-share-button" data-url="http://www.markzanghi.com/#/work/<%- proj.title %>" data-count="http://www.markzanghi.com/#/work/<%- proj.id %>" data-text="<%- proj.twitterText %>">Tweet</a>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
			<% } %>
			<div class="projectFooterWrapper">
				<div class="projectFooterNav">
					<div class="topArrowWrap">
						<img class="navArrow" src="/img/arrowUp.png" />
					</div>
					<div class="bottomArrowWrap">
						<div class="bottomNavArrowContainer textLeft"><img class="navArrow navArrowLeft" src="/img/arrowLeft.png" /></div>
						<a href="#/work"><div class="projectSelectImg"></div></a>
						<div class="bottomNavArrowContainer textRight"><img class="navArrow navArrowRight" src="/img/arrowRight.png" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
 
    </script>
    <!-- END: Underscore Template Definition. -->
	<script id="blankHtml" type="text/x-tmpl">
    <div class="slideWrapper blankSlide">
		<div class="aboutWrapper">
			<div class="aboutPhotoWrapper">
				<img src="/img/contactPhoto.png" style="visibility:hidden;"/>
			</div>
			<div class="aboutNarrowWrapper">
				<div id="blankMe">
					<div class="aboutPHeading">CONTACT ME</div>
					<div class="aboutPar">
						LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIT, SED DO EIUSMOD
						TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM,
						QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO
						CONSEQUAT. DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE
						CILLUM DOLORE EU FUGIAT NULLA PARIATUR. EXCEPTEUR SINT OCCAECAT CUPIDATAT NON
						PROIDENT, SUNT IN CULPA QUI OFFICIA DESERUNT MOLLIT ANIM ID EST LABORUM.
					</div>
				</div>
				<div id="blankIcons">
					<div class="contactIcon" id="phoneIcon">
						<a href="tel:8606204633"><img src="/img/callIcon.png" /></a>
					</div>
					<div class="iconSeperator" style="margin-left:15px;">
						<img src="/img/iconSeperator.png" />
					</div>
					<div class="contactIcon" id="linkedInIcon">
						<a href="http://www.linkedin.com/pub/mark-zanghi/1a/711/6a9" target="_blank"><img src="/img/linkedInIcon.png" /></a>
					</div>
					<div class="contactIcon" id="fbIcon">
						<a href="https://www.facebook.com/mark.zanghi.14" target="_blank"><img src="/img/fbIcon.png" /></a>
					</div>
					<div class="contactIcon" id="twitterIcon">
						<a href="https://twitter.com/MJZanghi" target="_blank"><img src="/img/twitterIcon.png" /></a>
					</div>
					<div class="contactIcon" id="behanceIcon">
						<a href="http://www.behance.net/markzanghi" target="_blank"><img src="/img/behanceIcon.png" /></a>
					</div>
					<div class="iconSeperator" style="margin-left:25px;">
						<img src="/img/iconSeperator.png" />
					</div>
					<div class="contactIcon" id="emailIcon">
						<a href="mailto:zanghi.mark@gmail.com"><img src="/img/emailIcon.png" /></a>
					</div>
				</div>
				
			</div>
			
		</div>
	</div>
	</script>
</body>
</html>
