//--v 전역 상수/변수 -----------------------------------------------------------------
var _LOADING_RATE_FIXED = 0; // 로딩율 출력할 소수점 자리수
var _MY_DOMAIN = "*"; // postMessage() 파라미터용

var _MODAL_CONFIRM_PARAM = null; // modalConfirm()에서 '예'버튼 클릭시 처리에 필요한 파라미터 전달용 변수
//--^ 전역 상수/변수 -----------------------------------------------------------------

$(document).ready(function () {
	//--v Event Listener -------------------------------------------------------

	// LNB 하위메뉴 slide
	$('#lnb .menu-list > li > a').on("click", function(){
		var $this = $(this).parent();
		if($this.hasClass('on')){
			$this.removeClass('on').find('.sub-menu').slideUp('fast');
		}else{
			$this.siblings().removeClass('on').find('.sub-menu').slideUp('fast');
			$this.addClass('on').find('.sub-menu').slideDown('fast');
		}
	});
	$('#lnb .menu-list > li.on').find('.sub-menu').slideDown('fast');

	//---- select2
	$(".select2").each(function (i, select2) {
		let placeholderText = $(select2).attr("data-placeholder"); // console.log(placeholderText);
		let required = $(select2).attr("required"); // console.log(required);
		$(select2).select2({
			minimumResultsForSearch: Infinity, // 검색창 제거
			placeholder: placeholderText,
			allowClear: !required, // clear 버튼[X] 노출
		});
	});
	$(".select2_school").each(function (i, select2) {
		$(select2).select2({
			// placeholder: placeholderText,
			// allowClear: required, // clear 버튼[X] 노출
			matcher: matchCustom
		});
	});
	
	// select에 입력검색기능 추가
	function matchCustom(params, data) {
		// If there are no search terms, return all of the data
		if ($.trim(params.term) === '') {
		  return data;
		}
	
		// Do not display the item if there is no 'text' property
		if (typeof data.text === 'undefined') {
		  return null;
		}
	
		// `params.term` should be the term that is used for searching
		// `data.text` is the text that is displayed for the data object
		if (data.text.indexOf(params.term) > -1) {
		  var modifiedData = $.extend({}, data, true);
		//   modifiedData.text += ' (matched)';
	
		  // You can return modified objects from here
		  // This includes matching the `children` how you want in nested data sets
		  return modifiedData;
		}
	
		// Return `null` if the term should not be displayed
		return null;
	}

	// .form-select에 placeholder 기능 구현
	$(".form-select")
		.on("change", function () {
			let optionColor = $(this).find("option:selected").css("color"); // console.log(optionColor);
			$(this).css("color", optionColor);
		})
		.trigger("change");

	// input에 hover & focus 되었을때 테두리 색상
	$(".input-wrap input").on("focus", function () {
		if(!$(this).attr("readonly")){
			$(this).parent().addClass("on");
		}
	});
	$(".input-wrap input").on("blur", function () {
		$(this).parent().removeClass("on");
	});

	// input.input_count textarea.input_count 등 입력 글자수 확인
	$(".input_count").on("keyup", calcInputLetters);
	$(".input_count").each(calcInputLetters); // 화면 로드시 input, textarea 초기값 글자수 계산 출력

	// input 입력값 초기화 버튼
	var btnClear = document.querySelectorAll(".btn-clear");
	btnClear.forEach(function (btn) {
		btn.addEventListener("click", function () {
			var inputContainer = btn.parentNode;
			var inputs = inputContainer.querySelectorAll("input");
			inputs.forEach(function (input) {
				if (!input.disabled) { // Check if input is not disabled
					input.value = "";
				}
			});
		});
	});

	
	// 전체메뉴 + 즐겨찾기 화면
	$('header .btn-allmenu').click(function(){
		$(this).addClass('on');
		$('#allMenu .layerPopup').show();
	});
	$('#allMenu.layerPopup .btn_close').click(function(){
		$('header .btn-allmenu').removeClass('on');
	});

	$('.favorite-list li').on('click', function() {
		var icon = $(this).find('button i');
  
		if (icon.hasClass('icon-favorite')) {
			icon.removeClass('icon-favorite');
			icon.addClass('icon-favorite_on');
		} else if (icon.hasClass('icon-favorite_on')) {
			icon.removeClass('icon-favorite_on');
			icon.addClass('icon-favorite');
		}
	});


	//--^ Event Listener -------------------------------------------------------

});

$(function(){
	// .tab-menu 제어
	$(".tab-menu li").click(function () {
		var tabM = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		var targetId = $(this).parent().attr("data-target");
		tabCon(targetId,tabM);
	});
	
	function tabCon(targetId,tabM) {
		$("#" + targetId).find(".tab-section").eq(tabM).addClass("on").siblings().removeClass("on");
		rMateGridH5.resize();
	}
});

	
/**
 * document에 select2 element가 동적으로 추가되면 이 함수를 호출해 줘야 함 
 */
function refreshBody() {
	//---- select2 초기화
	$(".select2").each(function(i, select2) {
		$(select2).select2({
			minimumResultsForSearch: Infinity,	// 검색창 제거
		});
	});
}


//--v datepicker -----------------------------------------------------
$(document).ready(function () {
	let today = new Date();
	var changeYearButtons = function() {
		setTimeout(function() {
			var widget = $(this).datepicker("widget");
			var widgetHeader = widget.find(".ui-datepicker-header");
			var inputDate = $(this);
			
			var prevYrBtn = $('<button class="PrevYr"></button>');
			prevYrBtn.bind("click", function() {
				var currentDate = inputDate.datepicker("getDate");
				var currentYear = currentDate ? currentDate.getFullYear() : new Date().getFullYear();
				var newDate = new Date(currentYear - 1, currentDate ? currentDate.getMonth() : new Date().getMonth(), currentDate ? currentDate.getDate() : new Date().getDate());
				inputDate.datepicker("setDate", newDate);

			});
			
			var nextYrBtn = $('<button class="NextYr"></button>');
			nextYrBtn.bind("click", function() {
				var currentDate = inputDate.datepicker("getDate");
				var currentYear = currentDate ? currentDate.getFullYear() : new Date().getFullYear();
				var newDate = new Date(currentYear + 1, currentDate ? currentDate.getMonth() : new Date().getMonth(), currentDate ? currentDate.getDate() : new Date().getDate());
				inputDate.datepicker("setDate", newDate);
			});
			
			prevYrBtn.prependTo(widgetHeader);
			nextYrBtn.appendTo(widgetHeader);
		}.bind(this), 1);
	};

	//--v Default -----------------------------------------------------
	$(".datepicker").datepicker({
		todayHighlight: true,
		dateFormat: "yy.mm.dd",
		monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
		changeMonth: false, // 연도 셀렉트 선택 미사용
		beforeShow: function(input, inst) {
			changeYearButtons.call(input); // 현재 캘린더에 대한 changeYearButtons 호출
			// console.log(inst.selectedMonth);
			// console.log(inst.drawMonth);
		},
		onChangeMonthYear: function(year, month, inst) {
			changeYearButtons.call(inst.input); // 현재 캘린더에 대한 changeYearButtons 호출
		}
	});
	//--^ Default -----------------------------------------------------

	//--v 기간입력 -----------------------------------------------------
	var dateFormat = "mm/dd/yy",
		from = $(".from")
			.datepicker({
				defaultDate: "+1w",
				changeMonth: true,
				numberOfMonths: 1, //보여지는 달력 갯수
				dateFormat: "yy.mm.dd",
				monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
				dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
				// minDate: -20, maxDate: "+1M +10D", // 최소날짜, 최대날짜 설정시
				changeMonth: false, // 연도 셀렉트 선택 미사용
				beforeShow: function(input, inst) {
					changeYearButtons.call(input); // 현재 캘린더에 대한 changeYearButtons 호출
					// console.log(inst.selectedMonth);
					// console.log(inst.drawMonth);
				},
				onChangeMonthYear: function(year, month, inst) {
					changeYearButtons.call(inst.input); // 현재 캘린더에 대한 changeYearButtons 호출
				}
			}),
		to = $(".to")
			.datepicker({
				defaultDate: "+1w",
				changeMonth: true,
				numberOfMonths: 1, //보여지는 달력 갯수
				dateFormat: "yy.mm.dd",
				monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
				dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
				// minDate: -20, maxDate: "+1M +10D", // 최소날짜, 최대날짜 설정시
				changeMonth: false, // 연도 셀렉트 선택 미사용
				beforeShow: function(input, inst) {
					changeYearButtons.call(input); // 현재 캘린더에 대한 changeYearButtons 호출
					// console.log(inst.selectedMonth);
					// console.log(inst.drawMonth);
				},
				onChangeMonthYear: function(year, month, inst) {
					changeYearButtons.call(inst.input); // 현재 캘린더에 대한 changeYearButtons 호출
				}
			});

		//초기값 설정
		// 시작일은 당월 1일, 종료일은 당일로 설정 
		// 2023. 08.16 JWS
		var now=new Date();
		var year= now.getFullYear();
		var month=now.getMonth();
		$(".from").datepicker('setDate', new Date(year, month, 1 ));
		$(".to").datepicker('setDate', 'today');
		$(".minDateLimited").datepicker({minDate : 0});
        
	function getDate(element) {
		var date;
		try {
			date = $.datepicker.parseDate(dateFormat, element.value);
		} catch (error) {
			date = null;
		}
		return date;
	}
	//--^ 기간입력 -----------------------------------------------------
});

//--^ datepicker -----------------------------------------------------

//--v 날짜 관련 함수 -----------------------------------------------------------------
/**
 * Date.dateAdd() 멤버함수 추가.
 * 초/분/시간/일 +/- 연산 제공. 월/년은 추가 개발 필요
 * @param {String} interval - s/n/h/d
 * @param {Number} value - +/- 할 값
 * @returns {Date}
 */
Date.prototype.dateAdd = function (interval, value) {
	let dateReturn = new Date(this);
	switch (interval) {
		case "d": // 일
			dateReturn.setTime(dateReturn.getTime() + value * 1000 * 60 * 60 * 24);
			break;
			break;
		case "ww": // 주
			dateReturn.setTime(dateReturn.getTime() + value * 1000 * 60 * 60 * 24 * 7);
			break;
			break;
	}
	return dateReturn;
};
/**
 * periodCode에 따른 기간 입력창 set
 * @param periodCode {String} periodCode
 * @param $inputS {} 시작일 입력창
 * @param $inputE {} 종료일 입력창
 */
function setInputPeriod(button, periodCode, $inputS, $inputE) {
	let periodResult = calcDates(periodCode);

	if (typeof $inputS === "undefined" && typeof $inputE === "undefined") {
		let $inputS = $(button).parents(".input_period_wrap").find(".from");
		let $inputE = $(button).parents(".input_period_wrap").find(".to");

		if ($.fn.datepicker) {
			$inputS.datepicker("setDate", periodResult.dateS); //console.log( $inputS.val() );
			$inputE.datepicker("setDate", periodResult.dateE); //console.log( $inputE.val() );
		}
	} else {
		if ($.fn.datepicker) {
			$inputS.datepicker("setDate", periodResult.dateS); //console.log( $inputS.val() );
			$inputE.datepicker("setDate", periodResult.dateE); //console.log( $inputE.val() );
		}
	}
}

/**
 * 기간 코드에 따라 시작일, 종료일 계산
 * @param periodCode {String} 기간 코드
 * @returns { dateS, dateE } : 시작일, 종료일
 */
function calcDates(periodCode) {
	let today = new Date(); // 오늘
	let weekday; // 계산용
	let dateS = new Date();
	let dateE = new Date(); // return용 - 시작일, 종료일

	switch (periodCode) {
		case "d0": //오늘
			// dateS = today;
			break;
		case "d-1": //어제
			dateS = today.dateAdd("d", -1); // 어제부터
			break;
		case "d+1": //내일까지
			dateE = today.dateAdd("d", 1);
			break;
		case "d-3": //최근 3일
			dateS = today.dateAdd("d", -2);
			break;
		case "d-7": //최근 7일
			dateS = today.dateAdd("d", -6);
			break;
		case "d-14": //최근 14일
			dateS = today.dateAdd("d", -14);
			break;
		case "d-15": //최근 15일
			dateS = today.dateAdd("d", -15);
			break;
		case "d-30": //최근 30일
			dateS = today.dateAdd("d", -30);
			break;

		case "w0": //금주
			weekday = today.getDay();
			dateS = today.dateAdd("d", -weekday);
			dateE = dateS.dateAdd("d", 6); // 오늘까지로 하고자하면 이 줄을 remarking
			break;
		case "w-1": //전주
			weekday = today.getDay();
			dateS = dateS.dateAdd("d", -(weekday + 7));
			dateE = dateS.dateAdd("d", 6);
			break;
		case "w+1": //다음주
			weekday = today.getDay();
			dateS = dateS.dateAdd("d", 7 - weekday);
			dateE = dateS.dateAdd("d", 6);
			break;

		case "m0": //금월
		case "M0":
			dateS.setDate(1);
			//			dateE = new Date(today.getFullYear(), today.getMonth()+1, 0);	// 이번달 말일까지로 하고자하면 해당 줄 주석 해제
			break;
		case "m-1": //전월
			dateS = new Date(today.getFullYear(), today.getMonth() - 1, 1);
			dateE = new Date(today.getFullYear(), today.getMonth(), 0);
			break;

		case "lm-1": //최근1개월
			dateS = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() + 1);
			break;
		case "lm-3": //최근1개월
			dateS = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
			break;

		case "y0": //금년
			dateS.setMonth(0);
			dateS.setDate(1);
			dateE = new Date(today.getFullYear(), 11, 31); // 오늘까지로 하고자하면 이 줄을 remarking
			break;
		case "y-1": //작년
			dateS.setYear(dateS.getFullYear() - 1);
			dateS.setMonth(0);
			dateS.setDate(1);
			dateE = new Date(dateS.getFullYear(), 11, 31);
			break;

		case "M-1": //전월 ~금월
			dateS = new Date(today.getFullYear(), today.getMonth() - 1, 1);
			break;
		case "M-3": //3개월(금월 포함)
			dateS = new Date(today.getFullYear(), today.getMonth() - 2, 1);
			break;
		case "M-6": // 6개월(금월 포함)
			dateS = new Date(today.getFullYear(), today.getMonth() - 5, 1);
			break;
		case "M-12": // 6개월(금월 포함)
			dateS = new Date(today.getFullYear(), today.getMonth() - 11, 1);
			break;
	}
	//	console.log( dateS, dateE );
	return { dateS: dateS, dateE: dateE };
}
//--^ 날짜 관련 함수 -----------------------------------------------------------------

//--v 숫자 관련 함수 -----------------------------------------------------------------
/*
 * 숫자를 문자열로 변환하기
 */
function numberLocaleString(input, fractionDigits) {
	let val = String(input.value).replace(/[^0-9.\-]/g, ""); // 숫자/./- 문자만 남기고 제거

	input.addEventListener("keyup", function (e) {
		let value = e.target.value;
		value = Number(value.replaceAll(",", ""));
		if (isNaN(value)) {
			input.value = 0;
		} else {
			var formatValue = value.toLocaleString("ko-KR");
			input.value = formatValue;
		}
	});
}

//--^ 숫자 관련 함수 -----------------------------------------------------------------

//--v GRID 메세지 함수 -----------------------------------------------------------------
/**
 * GRID에 메시지용 box element를 추가함.
 */
function Grid_appendMessageBox() {
	$("#ib-container").append(`
<div class="grid-message-wrap">
	<div class="message-body">
		<div class="msgText"></div>
		<i class="icon-warning"></i>
	</div>
</div>
`);
}
function Grid_showMessage(msg) {
	$msgBox = $("#ib-container").find(".grid-message-wrap");
	$msgBox.addClass("show");
	$msgBox.find(".msgText").html(msg);
}
function Grid_hideMessage() {
	$msgBox = $("#ib-container").find(".grid-message-wrap");
	$msgBox.removeClass("show");
}
//--^ GRID 메세지 함수 -----------------------------------------------------------------

//--v 모달 관련 함수 -----------------------------------------------------------------
$(function(){
	// 레이어 활성화
	$(".btn_layer").on("click", function (event) {
		let $button = $(event.currentTarget);
		let $popupName = $(event.currentTarget.dataset.target);
		$popupName.fadeIn("fast");
		$("body").addClass("scroll_lock");
	});
	// 레이어 비활성화
	$(".layerPopup .btn_close").on("click", function () {
		$(this).parents(".layerPopup").fadeOut("fast");
		$("body").removeClass("scroll_lock");
	});
});
//--^ 모달 관련 함수 -----------------------------------------------------------------

//--v Preloader 관련 함수 ----------------------------------------------------------
function preloader(show, text, isTest) {
	if (show === "show") {
		$(".preloader_backdrop").fadeIn();
		$(".preloader_text").html(text).addClass("ON");
		$("body").addClass("scroll_lock");

		if (isTest) {
			setTimeout(function () {
				preloader("hide");
			}, 2000);
		}
	} else {
		$(".preloader_backdrop").fadeOut();
		$(".preloader_text").removeClass("ON");
		$("body").removeClass("scroll_lock");
	}
}

function preloader_progress(show, isTest) {
	if (show === "show") {
		$(".preloader_backdrop").fadeIn();
		$(".preloader_rate").addClass("ON");
		$("body").addClass("scroll_lock");

		if (isTest) GUIDE_loadingProgress();
	} else {
		$("body").removeClass("scroll_lock");
		$(".preloader_rate").removeClass("ON");
		$(".preloader_backdrop").fadeOut();
	}
}

/**
 * Progress rate에 표시를 함.
 * @param {Number} loadingRate - 페이지 로딩율
 */
function setPreloaderProgress(loadingRate) {
	$(".preloader_rate").find(".value").text(parseFloat(loadingRate).toFixed(_LOADING_RATE_FIXED));
	if (loadingRate >= 99.999999) {
		preloader_progress("hide");
	}
}
//--^ Preloader 관련 함수 ----------------------------------------------------------

//--v 기타 함수 --------------------------------------------------------------------

/**
 * [.input_count keyup 이벤트 리스너] .input_count 입력글자수 계산.
 */
function calcInputLetters() {
    if ($(this).parent().find(" + .text_len > .cur_len").length === 0) return;

    let text = $(this).val();
    let bytes = countBytes(text); // Calculate byte count
    let maxlength = $(this).attr("maxlength");

    $(this).parent().find(" + .text_len > .cur_len").html(bytes);
    if (bytes >= maxlength) {
        // alert(`최대 입력글자수(${maxlength}자)를 초과하였습니다.`);
        let truncatedText = truncateTextByBytes(text, maxlength);
        let truncatedBytes = countBytes(truncatedText);

        $(this).val(truncatedText);
        $(this).parent().find(" + .text_len > .cur_len").html(truncatedBytes);
    }
}

function countBytes(text) {
    let byteCount = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);

        // Check if character is a Korean character (Hangul)
        if (isKoreanCharacter(char)) {
            byteCount += 2; // 2 bytes for Korean characters
        } else {
            byteCount += 1; // 1 byte for other characters
        }
    }

    return byteCount;
}

function isKoreanCharacter(char) {
    // Range of Korean Unicode characters (U+AC00 to U+D7AF)
    return /[\uAC00-\uD7AF]/.test(char);
}

function truncateTextByBytes(text, maxLength) {
    let truncatedText = '';
    let byteCount = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);

        if (isKoreanCharacter(char)) {
            byteCount += 2;
        } else {
            byteCount += 1;
        }

        if (byteCount > maxLength) {
            break;
        }

        truncatedText += char;
    }

    return truncatedText;
}

/**
 * input[type=text] oninput 이벤트에서 호출하여 패턴 문자만 입력가능하게 함.
 * @param {Object} input element
 * @param {String} pattern 입력가능한 문자 pattern
 */
function checkInputPattern(input, pattern) {
	let regex = new RegExp("[^" + pattern + "]", "g"); //console.log( regex );
	input.value = input.value.replace(regex, "").replace(/(\.)\./g, "$1");
}
