import * as charts from "./charts.js?v=2";
var oneTimeLoad = false;
var swipers = [];
export const init = () => {
  swiperInit();
  load();
  $('#mySelect').select2({
    minimumResultsForSearch: Infinity,
  });
};

export const swiperInit = () => {
  if (swipers["orders-info"] !== undefined) swipers["orders-info"].destroy();
  swipers["orders-info"] = $(".swiper").length
    ? new Swiper(".swiper", {
        autoplay: true,
        spaceBetween: 20,
        slidesPerView: 4,
        slidesPerGroup: 4,
        navigation: {
          nextEl: ".next",
          prevEl: ".previous"
        }
      })
    : undefined;

  if (swipers["swiper-juice"] !== undefined) swipers["swiper-juice"].destroy();
  swipers["swiper-juice"] = $(".swiper-juice").length
    ? new Swiper(".swiper-juice", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: {
          nextEl: ".nxt-juice",
          prevEl: ".prv-juice"
        }
      })
    : undefined;
};

export const load = async () => {
  const settings = {
    url: "https://www.masafarms.com/get-dashboard-analytics",
    method: "POST",
    data: { access_key: "9bw;tZuO28A~*=T7zf" }
  };

  await $.ajax(settings).done(function (data) {
    data = JSON.parse(data);

    $("#pending").counter(data.orders.pending);
    $("#waiting").counter(data.orders.waiting);
    $("#confirmed").counter(data.orders.confirmed);
    $("#canceled").counter(data.orders.canceled);
    $("#pick-up").counter(data.orders["picking up"]);
    $("#onway").counter(data.orders["on the way"]);
    $("#delivered").counter(data.orders.delivered);
    $("#paid").counter(data.orders.paid);
    // ......................

    $("#newClients").counter(data.newClients, true);
    $(".perc-edit").counter(data.newClientsPercent, false, "percent");
    $("#monthlyTarget").counter(data.monthlyTarget, true);
    $("#estimatedDailyTarget").counter(data.estimatedDailyTarget, true);
    // ..........................

    $(".progress-text").counter(`${data.targetProgress.box.percentage}%`, false, "%");
    $(".progress-bar").css({
      width: `${data.targetProgress.box.percentage}%`
    });
    $("#business-days").text(`${data.targetProgress.box.estimatedAchievement}`);
    // ............................

    charts.initTargetProgress(data.targetProgress.chart.labels, [data.targetProgress.chart.data[0], data.targetProgress.chart.data[1]]);
    if (!oneTimeLoad) {
      updateAll(data.topAccounts, "accounts");
      updateAll(data.topProducts, "top-juice");

      swiperInit();

      oneTimeLoad = true;
    }

    $(".main-loader").remove();
    setTimeout(load, 1500);
  });
};

function updateAll(data, type) {
  if (document.getElementById(type) === null) return;

  var cartona = ``;
  for (var i = 0; i < data.length; i++) {
    cartona +=
      type == "accounts"
        ? `<tr>
    <td>` +
          (data[i].img ? `<img src="${data[i].img}" alt="" class="acc-img" />` : `<div class="acc-img" style="color:${data[i].color};background-color:${data[i].backgroundColor};"><span>${data[i].initials[0]}</span><span>${data[i].initials[1]}</span></div>`) +
          `</td>
    <td class="account-name">${data[i].name}</td>
    <td id="stat-img"><div class="stat-det" style="color:${data[i].color};background-color:${data[i].backgroundColor};"><p class="number">${data[i].entryType}</p></div></td>
    <td><p class="number">${data[i].phoneNumber}</p></td>
    <td><p class="number text-nowrap">${data[i].totalOrders}</p></td>
    <td><p class="number text-nowrap">${data[i].totalNet}</p></td>
    <td class="account-date number">${data[i].date}</td>
  </tr>`
        : `<div class="swiper-slide">
  <img src="${data[i].img}" alt="Avatar" class="bottom-left" />
  <div class="masa-tag">
    <h6>${data[i].type}</h6>
  </div>
  <div class="overlay">
    <div class="overlay-text">
      <h6><span class="number">#${i + 1}</span> ${data[i].name}</h6>
      <div class="masa-logo">
        <div class="masa-logo">
          <img src="/assets/new-img/masa-logo.png" alt="" />
          <p>MasaFarms</p>
        </div>
        <span class="number">${data[i].total.toLocaleString("en-US")}</span>
      </div>
    </div>
  </div>
</div>`;
  }

  $(type == "accounts" ? ".bottom-sec .number" : ".top-product .number").html(`(${data.length})`);

  document.getElementById(type).innerHTML = cartona;
}

$.fn.counter = function (number, format = false, type = "") {
  $(this)
    .prop("Counter", oneTimeLoad ? parseInt($(this).text().replace(/[,\s]/g, ""), 10) : 0)
    .animate(
      { Counter: number },
      {
        duration: 600,
        easing: "swing",
        step: function (step) {
          const counter = format ? Math.ceil(step).toLocaleString("en-US") : Math.ceil(step);

          if (type == "percent") {
            $(this)
              .removeClass(counter >= 0 ? "num-dec" : "num-inc")
              .addClass(counter >= 0 ? "num-inc" : "num-dec");
            $(this).text((counter >= 0 ? "+ " : "- ") + Math.abs(counter) + "%");
          } else {
            $(this).text(counter + type);
          }
        }
      }
    );
};



$(document).ready(function() {
  // When clicking on the open-menu button
  $('.open-menu').click(function() {
    // Show the menu
    $('.pop-menu').toggle(100);
  });

  // When clicking anywhere on the document
  $(document).click(function(event) {
    // Check if the clicked element is not within .menu
    if (!$(event.target).closest('.pop-menu').length && !$(event.target).hasClass('open-menu')) {
      // Hide the menu
      $('.pop-menu').fadeOut(100);
    }
  });


  $(document).ready(function() {
    // Show lightbox on click
    $('.view-profile').click(function() {
      $('#lightBoxContainer').fadeIn();
    });

    // Hide lightbox on clicking close button or outside the lightbox
    $('.x-close, #lightBoxContainer').click(function(e) {
      if (e.target === this) {
        $('#lightBoxContainer').fadeOut();
      }
    });
  });

  $('.toast-pop').click(function() {
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "0",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    toastr.success('<div class="pop-div"><h6>Updated successfully.</h6><p>Your profile has been successfully updated</p></div>')
  })

  function closeToastr() {
    toastr.clear();
  }


});




$(function() {
  $("#datepicker").datepicker();
});
