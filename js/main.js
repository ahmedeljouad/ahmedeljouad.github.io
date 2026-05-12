$(function () {
  $(window).on('scroll.navbar', function () {
    if ($(this).scrollTop() > 60) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }
    highlightNavLink();
  });
  $('#hamburger').on('click', function () {
    $('.nav-links').toggleClass('open');
    $(this).find('i').toggleClass('fa-bars fa-times');
  });
  $('.nav-links a').on('click', function () {
    $('.nav-links').removeClass('open');
    $('#hamburger i').addClass('fa-bars').removeClass('fa-times');
  });
  function highlightNavLink() {
    let current = '';
    $('section[id], header[id]').each(function () {
      const sectionTop = $(this).offset().top - 100;
      if ($(window).scrollTop() >= sectionTop) {
        current = $(this).attr('id');
      }
    });
    $('.nav-links a').removeClass('active');
    $('.nav-links a[href="#' + current + '"]').addClass('active');
  }
  $('.section, .section-title, .about-content, .accordion-item, .project-card')
    .addClass('reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            $(entry.target).addClass('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $('.reveal').each(function () { revealObserver.observe(this); });
  } else {
    function revealOnScroll() {
      var scrollBottom = $(window).scrollTop() + $(window).height();
      $('.reveal:not(.visible)').each(function () {
        if ($(this).offset().top < scrollBottom - 60) {
          $(this).addClass('visible');
        }
      });
    }
    $(window).on('scroll.reveal', revealOnScroll);
    revealOnScroll();
  }
  var skillsAnimated = false;
  function animateSkills() {
    if (skillsAnimated) return;
    var $skillsSection = $('#skills');
    if ($skillsSection.length === 0) return;
    var sectionTop  = $skillsSection.offset().top;
    var windowBottom = $(window).scrollTop() + $(window).height();
    if (windowBottom > sectionTop + 100) {
      skillsAnimated = true;
      $('.skill-fill').each(function (index) {
        var $el    = $(this);
        var target = $el.css('--target') || '0%';
        setTimeout(function () {
          $el.animate(
            { width: target },
            { duration: 1200, easing: 'swing' }
          );
        }, index * 150);
      });
    }
  }

  $(window).on('scroll.skills', animateSkills);
  animateSkills();
  $('.tab-btn').on('click', function () {
    var tab = $(this).data('tab');
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active').hide();
    $('#tab-' + tab).addClass('active').hide().fadeIn(300);
    if (tab === 'tech') {
      skillsAnimated = false;
      animateSkills();
    }
  });
  $('.accordion-header').on('click', function () {
    var $item = $(this).closest('.accordion-item');
    var $body = $item.find('.accordion-body');
    $('.accordion-item').not($item).each(function () {
      $(this).removeClass('open');
      $(this).find('.accordion-body').slideUp(300);
    });
    $item.toggleClass('open');
    $body.slideToggle(300);
  });
  $('.filter-btn').on('click', function () {
    var filter = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    if (typeof window.__renderProjects === 'function') {
      window.__renderProjects(filter);
    }
  });
  $(document).on('mouseenter', '.tag', function () {
    $(this).stop(true).animate({ paddingLeft: '20px', paddingRight: '20px' }, 200);
  }).on('mouseleave', '.tag', function () {
    $(this).stop(true).animate({ paddingLeft: '16px', paddingRight: '16px' }, 200);
  });
  $('a[href^="#"]').on('click', function (e) {
    var $target = $($(this).attr('href'));
    if ($target.length) {
      e.preventDefault();
      $('html, body').animate(
        { scrollTop: $target.offset().top - 70 },
        600,
        'swing'
      );
    }
  });
  $('body').append(
    '<button id="back-to-top" title="Retour en haut">' +
    '<i class="fas fa-arrow-up"></i></button>'
  );
  $('<style>').text(
    '#back-to-top {' +
    '  position: fixed; bottom: 2rem; right: 2rem;' +
    '  width: 44px; height: 44px;' +
    '  border-radius: 50%;' +
    '  background: var(--primary);' +
    '  color: #fff;' +
    '  border: none;' +
    '  font-size: 1rem;' +
    '  cursor: pointer;' +
    '  display: none;' +
    '  z-index: 999;' +
    '  box-shadow: 0 4px 12px rgba(79,70,229,.4);' +
    '  transition: opacity .3s;' +
    '}' +
    '#back-to-top:hover { background: var(--primary-dk); }'
  ).appendTo('head');

  $(window).on('scroll.backtop', function () {
    if ($(this).scrollTop() > 400) {
      $('#back-to-top').fadeIn(300);
    } else {
      $('#back-to-top').fadeOut(300);
    }
  });

  $('#back-to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
  $('.profile-img-wrapper').attr('title', '👋 Salut ! Je suis Ahmed');

});
$('#contact-form').on('submit', function(e) {
  e.preventDefault();
  let isValid = true;
  $('.field-error').text('');
  const name = $('#name').val().trim();
  const email = $('#email').val().trim();
  const message = $('#message').val().trim();
  if (name === '') {
    $('#name-error').text('Le nom est obligatoire');
    isValid = false;
  }
  if (email === '') {
    $('#email-error').text('L\'email est obligatoire');
    isValid = false;
  } else if (!isValidEmail(email)) {
    $('#email-error').text('Veuillez entrer un email valide');
    isValid = false;
  }
  if (message === '') {
    $('#message-error').text('Le message ne peut pas être vide');
    isValid = false;
  } else if (message.length < 10) {
    $('#message-error').text('Le message doit contenir au moins 10 caractères');
    isValid = false;
  }
  if (isValid) {
    $('#contact-form').hide();
    $('#success-message').fadeIn();
    setTimeout(() => {
      $('#contact-form')[0].reset();
      $('#contact-form').show();
      $('#success-message').hide();
    }, 4000);
  }
});
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
$('#name, #email, #message').on('input', function() {
  $(this).next('.field-error').text('');
});