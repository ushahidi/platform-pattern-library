$('.searchbar').each(function(){
    var searchbar = $(this),
        input = $(this).find('.searchbar-input input[type="search"]'),
        ghost = $(this).find('.searchbar-input .input-ghost'),
        dropdownMenu = $(this).find('.dropdown-menu');

    function searchbarUpdate() {
        if (input.val() && (dropdownMenu.hasClass('active') || input.is(':focus'))) {
            searchbar.addClass('active');
            searchbar.siblings('.button-group').hide();

            searchbar.oneClickOutside({
                callback:function(){
                    searchbarUpdate();
                }, calledFromClickInsideHandler: true
            });
        } else {
            searchbar.removeClass('active').oneClickOutside('off');
            setTimeout(function() {
                searchbar.siblings('.button-group').fadeIn(300);
            }, 300);
        }
    }

    function dropdownUpdate() {
        if (input.is(':focus') && input.val()) {
            dropdownMenu.addClass('active');
        } else {
            dropdownMenu.removeClass('active');
        }

        $('[search-string] em').text(input.val()); // demonstrate dynamic button
    }

    function inputGhostUpdate(str) {
        ghost.scrollLeft(input.scrollLeft());
        // console.log('ghost: ' + ghost.scrollLeft() + '; input: ' + input.scrollLeft());

        if (str.includes(':')) {
            var ghostVal = "";

            $.each(str.split(' '), function(key, value){
                if (key != 0) {
                    ghostVal += " ";
                }

                if (value.includes(':')) {
                    ghostVal += '<mark class="modifier">' + value + '</mark>';
                } else {
                    ghostVal += value;
                }
            });
            ghost.html(ghostVal).addClass('active');
            input.addClass('active');
        } else {
            ghost.html('').removeClass('active');
            input.removeClass('active');
        }
    }

    inputGhostUpdate(input.val());

    input.on('keyup change search', function(){
        searchbarUpdate();
        dropdownUpdate();
        inputGhostUpdate(input.val());
    });

    input.on('focusin', function(){
        searchbarUpdate();
        inputGhostUpdate(input.val());
    });

    input.on('focusout', function(){
        setTimeout(function() {
            inputGhostUpdate(input.val());
        }, 100);
    });

    searchbar.find('.searchbar-options .button').on('click', function(){
        searchbarUpdate();
    });
});
