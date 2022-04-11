//start burger-menu
const iconMenu = document.querySelector('.header__menu-btn');
const menuBody = document.querySelector('.menu__list');
if (iconMenu){
   iconMenu.addEventListener("click", function (){
      document.body.classList.toggle('lock');
      iconMenu.classList.toggle('active');
      menuBody.classList.toggle('active');
   });
};
document.addEventListener("click", function (e) {
   if (e.target !== iconMenu && e.target !== menuBody) {
      document.body.classList.remove('lock');
      iconMenu.classList.remove('active');
      menuBody.classList.remove('active');
   }
 });

// end burger-menu

$(".slider").slick({
  arrows: false,
  asNavFor: ".thumbs",
  arrows: false,
  slidesToShow: 1,
  fade: true,
  swipe: false,
});
$(".thumbs").slick({
  slidesToShow: 5,
  arrows: false,
  focusOnSelect: true,
  asNavFor: ".slider",
  vertical: true,
});

// start select

// Полифилл для метода forEach для NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

document.querySelectorAll(".dropdown").forEach(function (dropDownWrapper) {
  const dropDownBtn = dropDownWrapper.querySelector(".dropdown__button");
  const dropDownList = dropDownWrapper.querySelector(".dropdown__list");
  const dropDownListItems = dropDownList.querySelectorAll(
    ".dropdown__list-item"
  );
  const dropDownInput = dropDownWrapper.querySelector(
    ".dropdown__input-hidden"
  );

  // Клик по кнопке. Открыть/Закрыть select
  dropDownBtn.addEventListener("click", function (e) {
    dropDownList.classList.toggle("dropdown__list--visible");
    this.classList.add("dropdown__button--active");
  });

  // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
  dropDownListItems.forEach(function (listItem) {
    listItem.addEventListener("click", function (e) {
      e.stopPropagation();
      dropDownBtn.innerText = this.innerText;
      dropDownBtn.focus();
      dropDownInput.value = this.dataset.value;
      dropDownList.classList.remove("dropdown__list--visible");
    });
  });

  // Клик снаружи дропдауна. Закрыть дропдаун
  document.addEventListener("click", function (e) {
    if (e.target !== dropDownBtn) {
      dropDownBtn.classList.remove("dropdown__button--active");
      dropDownList.classList.remove("dropdown__list--visible");
    }
  });

  // Нажатие на Tab или Escape. Закрыть дропдаун
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab" || e.key === "Escape") {
      dropDownBtn.classList.remove("dropdown__button--active");
      dropDownList.classList.remove("dropdown__list--visible");
    }
  });
});

// end select

// start raiting
const ratings = document.querySelectorAll(".rating");
if (ratings.length > 0) {
  initRatings();
}
// основная ф-я
function initRatings() {
  let ratingActive, ratingValue;
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }
  // инициализируем конкретный рейтинг
  function initRating(raiting) {
    initRatingVars(raiting);
    setRatingActiveWidth();
  }
  // иницфлизация переменных
  function initRatingVars(raiting) {
    ratingActive = raiting.querySelector(".rating__active");
    ratingValue = raiting.querySelector(".rating__value");
  }
  // изменяет ширину активных звезд
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }
}
// end raiting

// basket + -
const counter = function () {
  const btns = document.querySelectorAll(".counter__btn");

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const direction = this.dataset.direction;
      const inp = this.parentElement.querySelector(".counter__value");
      const currentValue = +inp.value;
      let newValue;

      if (direction === "plus") {
        newValue = currentValue + 1;
      } else {
        newValue = currentValue - 1 > 0 ? currentValue - 1 : 1;
      }

      inp.value = newValue;
    });
  });
};

counter();
//  end basket

// like
$(".counter__btn-like").on("click", function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(this).addClass("active");
  }
});
// end like

// scroll header
let lastScroll = 0;
const defaultOffset = 100;
const header = document.querySelector(".header");

const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains("hide");

window.addEventListener("scroll", () => {
  if (
    scrollPosition() > lastScroll &&
    !containHide() &&
    scrollPosition() > defaultOffset
  ) {
    //scroll down
    header.classList.add("hide");
  } else if (scrollPosition() < lastScroll && containHide()) {
    //scroll up
    header.classList.remove("hide");
  }

  lastScroll = scrollPosition();
});

// end scroll header

// valid form mail
$(function () {
  $(".mail-btn").on("click", validate);

  // Validate email
  function validateEmail(mail) {
    var re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(mail).toLowerCase());
  }

  // send form
  function sendForm() {
    $(".error").text("Подписка оформлена").fadeIn();
  }

  // validate email and send form after success validation
  function validate() {
    var mail = $(".mail").val();
    var $error = $(".error");
    $error.text("");

    if (validateEmail(mail)) {
      $error.fadeOut();
      sendForm();
    } else {
      $error.fadeIn();
      $error.text(" Неправильно введена электронная почта");
    }
    return false;
  }
});
//  end valid form mail

//start clear input
const clearInput = document.querySelector('.input_clear');
document.addEventListener("click", function (e) {
   document.querySelector('.mail').value = '';
});
//end clear input
