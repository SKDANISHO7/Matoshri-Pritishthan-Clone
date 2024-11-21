jQuery(document).ready(function ($) {
	jQuery(document).on("click", ".iconInner", function (e) {
		jQuery(this).parents(".botIcon").addClass("showBotSubject");
		$("[name='msg']").focus();
	});

	jQuery(document).on("click", ".closeBtn, .chat_close_icon", function (e) {
		jQuery(this).parents(".botIcon").removeClass("showBotSubject");
		jQuery(this).parents(".botIcon").removeClass("showMessenger");
	});

	jQuery(document).on("submit", "#botSubject", function (e) {
		e.preventDefault();
		jQuery(this).parents(".botIcon").removeClass("showBotSubject");
		jQuery(this).parents(".botIcon").addClass("showMessenger");
	});

	/* Chatboat Code */
	$(document).on("submit", "#messenger", function (e) {
		e.preventDefault();

		var val = $("[name=msg]").val().toLowerCase();
		var mainval = $("[name=msg]").val();
		name = "";
		nowtime = new Date();
		nowhoue = nowtime.getHours();

		function userMsg(msg) {
			$(".Messages_list").append(
				'<div class="msg user"><span class="avtr"><figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure></span><span class="responsText">' +
					mainval +
					"</span></div>"
			);
		}
		function appendMsg(msg) {
			$(".Messages_list").append(
				'<div class="msg"><span class="avtr"><figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure></span><span class="responsText">' +
					msg +
					"</span></div>"
			);
			$("[name='msg']").val("");
		}

		userMsg(mainval);
		if (
			val.indexOf("hello") > -1 ||
			val.indexOf("hi") > -1 ||
			val.indexOf("good morning") > -1 ||
			val.indexOf("good afternoon") > -1 ||
			val.indexOf("good evening") > -1 ||
			val.indexOf("good night") > -1
		) {
			if (nowhoue >= 12 && nowhoue <= 16) {
				appendMsg("good afternoon");
			} else if (nowhoue >= 10 && nowhoue <= 12) {
				appendMsg("hi");
			} else if (nowhoue >= 0 && nowhoue <= 10) {
				appendMsg("good morning");
			} else {
				appendMsg("good evening");
			}

			appendMsg("what's you name?");
		} else if (val.indexOf("yes") > -1) {
			var nowtime = new Date();
			var nowhoue = nowtime.getHours();
			appendMsg("it's my pleaser that i can help you");

			saybye();
		} else if (val.indexOf("no") > -1) {
			var nowtime = new Date();
			var nowhoue = nowtime.getHours();
			appendMsg("it's my bad that i can't able to help you. please try letter");

			saybye();
		} else if (
			val.indexOf("my name is ") > -1 ||
			val.indexOf("i am ") > -1 ||
			val.indexOf("i'm ") > -1 ||
			val.split(" ").length < 2
		) {
			/*|| mainval != ""*/
			if (val.indexOf("my name is") > -1) {
				name = val.replace("my name is", "");
			} else if (val.indexOf("i am") > -1) {
				name = val.replace("i am", "");
			} else if (val.indexOf("i'm") > -1) {
				name = val.replace("i'm", "");
			} else {
				name = mainval;
			}

			appendMsg("hi " + name + ", how can i help you?");
		} else {
			appendMsg("sorry i'm not able to understand what do you want to say");
		}

		function saybye() {
			if (nowhoue <= 10) {
				appendMsg(" have nice day! :)");
			} else if (nowhoue >= 11 || nowhoue <= 20) {
				appendMsg(" bye!");
			} else {
				appendMsg(" good night!");
			}
		}

		// setTimeout(() => {
		// 	var lastMsg = $('.Messages_list').find('.msg').last().offset().top;
		// 	$('.Messages').animate({ scrollTop: lastMsg }, 'slow');
		// }, 1000)
		$(".Messages").animate(
			{ scrollTop: $(".Messages_list")[0].scrollHeight },
			"slow"
		);
	});
	/* Chatboat Code */
});

document.addEventListener("DOMContentLoaded", () => {
	// create horizontal tabs
	new VanillaTabs({
		selector: "#tabs-h", // default is ".tabs"
		type: "horizontal", // can be horizontal / vertical / accordion
		responsiveBreak: 840, // tabs become accordion on this device width
		activeIndex: 0, // active tab index (starts from 0 ). Can be -1 for accordions.
	});

	// create vertical tabs
	new VanillaTabs({
		selector: "#tabs-v", // default is ".tabs"
		type: "vertical", // can be horizontal / vertical / accordion
		responsiveBreak: 840, // tabs become accordion on this device width
		activeIndex: 1, // active tab index (starts from 0 ). Can be -1 for accordions.
	});

	// createaccordion
	new VanillaTabs({
		selector: "#tabs-a", // default is ".tabs"
		type: "accordion", // can be horizontal / vertical / accordion
		responsiveBreak: 840, // tabs become accordion on this device width
		activeIndex: -1, // active tab index (starts from 0 ). Can be -1 for accordions.
	});
});


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function checkIsValidForm() {
	var response = grecaptcha.getResponse();

	if (response.length == 0) {
		alert("Captch is required");
		return false;
	} else {
		alert("Form Submitted successfully........");
	}
}
jQuery(document).ready(function ($) {
	$(document).ready(function () {
		// $(".breadcrumb").load("./breadcrumb.php");
		$(".quickL-one").load("./quickL-one.php");
		$(".quickL-two").load("./quickL-two.php");

		$(".iqac-quickL").load("./iqac-quickL.php");
		$(".aqar-21-22").load("./aqar-21-22.php");

		setInterval(() => {
			new bootnavbar();
			new bootnavbar2();
		}, 500);

		// $(document).on("click", 'ul li', function(){
		// 	$('ul li').removeClass('active');
		// 	$(this).addClass('active');
		// });

		$(document).ready(function () {
			$(".navbar-nav li a").click(function () {
				$(".navbar-nav li a.active").removeClass("active");
				$(this).addClass("active");
			});
		});

		$(document).on("click", "#submit ", function recaptcha() {
			if ($("#my-contact-form").valid()) {
				return true;
			} else {
				return false;
			}
			var response = grecaptcha.getResponse();

			if (response.length == 0) {
				alert("Captch is required");
				return;
			}
		});
		setTimeout(() => {
			$('.owl-carousel-gallery').owlCarousel({
				loop: true,
				margin: 10,
				autoplay: true,
				autoplayTimeout: 3000,
				navigation: true,
				nav: true,
				dots: false,
				navText: ['<span aria-label="Previous">‹</span>', '<span aria-label="Next">›</span>'],

				responsive: {
					0: {
						items: 1
					},
					600: {
						items: 2
					},
					1000: {
						
						items: 4
					}
				}
			});
		}, 500);

		setTimeout(() => {
			$(".owl-carousel-placements").owlCarousel({
				loop: true,
				margin: 10,
				autoplay: true,
				autoplayTimeout: 3000,
				navigation: true,
				nav: true,
				dots: false,
				navText: [
					'<span aria-label="Previous">‹</span>',
					'<span aria-label="Next">›</span>',
				],

				responsive: {
					0: {
						items: 1,
					},
					600: {
						items: 2,
					},
					1000: {
						items: 5,
					},
				},
			});
		}, 500);
		setTimeout(() => {
			$(".owl-carousel-our-dept").owlCarousel({
				loop: true,
				margin: 10,
				autoplay: true,
				autoplayTimeout: 3000,
				navigation: true,
				nav: true,
				dots: false,
				navText: [
					'<span aria-label="Previous">‹</span>',
					'<span aria-label="Next">›</span>',
				],

				responsive: {
					0: {
						items: 1,
					},

					1000: {
						items: 1,
					},
				},
			});
		}, 500);
		setTimeout(() => {
			$(".owl-carousel-alumini").owlCarousel({
				loop: true,
				margin: 0,
				autoplay: true,
				autoplayTimeout: 3000,
				navigation: true,
				nav: true,
				dots: false,
				navText: [
					'<span aria-label="Previous">‹</span>',
					'<span aria-label="Next">›</span>',
				],

				responsive: {
					0: {
						items: 1,
					},
					600: {
						items: 2,
					},
					1000: {
						items: 4,
					},
				},
			});
		}, 500);
	});
});

function setBreadcrumbTitle(title) {
	$(document).ready(() => {
		setTimeout(() => {
			$(".breadcrumbTitle").html(title);
			$(".breadcrumbPageTitle").html(title);
			topFunction();
		}, 500);
	});
}

// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function () {
		this.classList.toggle("active");

		var content = this.nextElementSibling;

		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
}



