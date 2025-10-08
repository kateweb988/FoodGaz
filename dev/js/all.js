window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  for (var i = 0; i < accordeonButtons.length; i++) {
    accordeonButtons[i].addEventListener("click", toggleItems, false);
  }

  function toggleItems() {
    const isActive = this.classList.contains("active");

    // Сначала сбрасываем все кнопки и рамки
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
      accordeonButtons[i].closest(".accordeon__item").style.border = "none";
    }

    // Закрываем все панели
    var panels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < panels.length; z++) {
      panels[z].style.maxHeight = 0;
    }

    // Если текущая кнопка была неактивной — открываем её
    if (!isActive) {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";

      // Добавляем бордер активному элементу
      var item = this.closest(".accordeon__item");
      item.style.border = "1px solid rgba(224, 224, 224, 1)";
      item.style.borderRadius = "24px"; // опционально
    }
    // Если была активна — просто закрываем (всё уже сброшено выше)
  }
});
document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
  $('a.btn').click(function (e) {
    e.preventDefault();
    $('#popup-call').arcticmodal({
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле',
          },
          text: {
            required: 'Заполните поле',
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  setTimeout(function () {
                    $.arcticmodal('close');
                    $('#popup-thank').arcticmodal({});
                    $form.trigger('reset');
                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                  }, 1100);

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 12,
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 12,
        slidesPerView: 4
      }
    }
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn5 = document.querySelector('.menu-btn');
  const menu5 = document.querySelector('.menu');
  const menuClose = document.querySelector('.menu__close');

  function updateBodyBackground() {
    if (menu5.classList.contains('active')) {
      document.body.classList.add('menu-active');
    } else {
      document.body.classList.remove('menu-active');
    }
  }

  // Открытие меню
  menuBtn5.addEventListener('click', () => {
    menuBtn5.classList.toggle('active');
    menu5.classList.toggle('active');
    updateBodyBackground();
  });

  // Закрытие по кнопке
  menuClose.addEventListener('click', (e) => {
    e.stopPropagation();
    menu5.classList.remove('active');
    menuBtn5.classList.remove('active');
    updateBodyBackground();
  });

  // Закрытие по фону
  menu5.addEventListener('click', (e) => {
    if (e.target === menu5) {
      menu5.classList.remove('active');
      menuBtn5.classList.remove('active');
      updateBodyBackground();
    }
  });

  // Закрытие при клике по ссылкам меню
  document.querySelectorAll('.menu li a.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      menuBtn5.classList.remove('active');
      menu5.classList.remove('active');
      updateBodyBackground(); // 🔹 вот эта строка решает проблему
    });
  });

  // Скролл по якорям
  document.querySelectorAll('.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetSelector = link.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

