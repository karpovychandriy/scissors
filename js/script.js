(function ($) {
    'use strict'

    $(document).ready(function () {
        

        /* меню бургер */
        $('.header-mobille__button').click(function(event) {
            $('.header-mobille__button,.mobille-menu').toggleClass('active');
            $('body').toggleClass('lock');
            $('.sidebar').removeClass('active');
            $('body').removeClass('lock-filter');
            $('.catalog__tab-item_sort').removeClass('active');
            $('.catalog__tab-item_sort').addClass('collapsed');
            $('.catalog__tab-item_sort').attr("aria-expanded", false);
            $('.catalog__tab-item_sort-list').removeClass('show');
        });

        $('.header__link-item').click(function (event) {
            $('.header__link-item').removeClass('active');
            $(this).addClass('active');
        });

       

        $('.catalog__tab-item_sort').click(function (event) {
            $(this).toggleClass('active');
        });
        
        /* меню фільтр */
        $('.catalog__tab-item_filter').click(function (event) {
            $('.sidebar').addClass('active');
            $('body').addClass('lock-filter');
            $('.catalog__tab-item_sort').removeClass('active');
            $('.catalog__tab-item_sort').addClass('collapsed');
            $('.catalog__tab-item_sort').attr("aria-expanded", false);
            $('.catalog__tab-item_sort-list').removeClass('show');
        });

        /* меню сорутування */
        $('.catalog__tab-item_sort-item').click(function (event) {
            $('.catalog__tab-item_sort').removeClass('active');
            $('.catalog__tab-item_sort').addClass('collapsed');
            $('.catalog__tab-item_sort').attr("aria-expanded", false);
            $('.catalog__tab-item_sort-list').removeClass('show');
        });
        

        $('.sidebar__title-close').click(function (event) {
            $('.sidebar').removeClass('active');
            $('body').removeClass('lock-filter');
        });
        

        //select2
        $('#firstSelect2').select2({ 
            language: "uk",
            width: '80%',
            //minimumResultsForSearch: Infinity,
            tags: true,
            maximumInputLength: 4
        });

        $('.mask-phone').mask("+7(999) 999-99-99");
        
        
        
        
        svg4everybody({})

    })
})(jQuery)

;(function($) {
    var request;
    $('.send-ajax').on('submit', function(e) {
        e.preventDefault()
        e.stopPropagation()

        if (request) {
            request.abort();
        }

        var $form = $(this);
        var $inputs = $form.find("input, select, button, textarea");
        var serializedData = $form.serialize();

        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "/smtp/send.php",
            type: "post",
            data: serializedData
        });

        request.done(function (response, textStatus, jqXHR){
            // alert(response.data);
            $(this).trigger('formSendSuccess', response);
        });

        request.fail(function (jqXHR, textStatus, errorThrown){
            $(this).trigger('formSendFailed', errorThrown);
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
        });

        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });
    });
})(jQuery);
