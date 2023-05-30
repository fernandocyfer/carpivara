$(document).ready(function() {
    var $navItems = $('.nav-items');
    var $menuItems = $('.menu li');
    var $faqItems = $('.faq-item');
    var menuWidth = 300; // Largura fixa de cada menu
  
    var totalItems = $menuItems.length;
    var visibleItems = calculateVisibleItems(); // Exibir 4 menus por vez
    var containerWidth = visibleItems * menuWidth;
  
    var currentPosition = 0;
    var maxPosition = (totalItems - visibleItems) * menuWidth * -1;
  
    // Definir a largura do contêiner
    $navItems.width(containerWidth);
  
    updateNavigation();
  
    $('.next').click(function() {
      if (currentPosition > maxPosition) {
        currentPosition -= menuWidth;
        updateNavigation();
      }
    });
  
    $('.prev').click(function() {
      if (currentPosition < 0) {
        currentPosition += menuWidth;
        updateNavigation();
      }
    });
  
    $menuItems.click(function() {
      var target = $(this).data('target');
      $menuItems.removeClass('active');
      $(this).addClass('active');
      $faqItems.removeClass('active');
      $('#' + target).addClass('active');
    });
  
    $(window).resize(function() {
      visibleItems = calculateVisibleItems();
      containerWidth = visibleItems * menuWidth;
      $navItems.width(containerWidth);
      maxPosition = (totalItems - visibleItems) * menuWidth * -1;
      currentPosition = Math.max(currentPosition, maxPosition);
      updateNavigation();
    });
  
    function calculateVisibleItems() {
      if ($(window).width() <= 767) {
        return 1;
      } else{
        return 4;
      }
    }
  
    function updateNavigation() {
      maxPosition = (totalItems - visibleItems) * menuWidth * -1;
      currentPosition = Math.min(currentPosition, 0);
      currentPosition = Math.max(currentPosition, maxPosition);
      // $navItems.css('transform', 'translateX(' + currentPosition + 'px)');
      $('.prev').toggleClass('disabled', currentPosition >= 0);
      $('.next').toggleClass('disabled', currentPosition <= maxPosition);
      // $menuItems.show();
  
      $menuItems.each(function(index) {
        if (index >= -currentPosition / menuWidth && index < (-currentPosition / menuWidth) + visibleItems) {
          $(this).show();
        } else {
          $(this).hide();
        }
  
      });
    }
  });
      