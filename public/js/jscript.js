$(document).ready(function () {
    $('#copy').on('click', function () {
         $('#image-url input').select();
         document.execCommand("copy");
         
    });
   
    $('#image').bind('change', function () {
        $('form').submit();
        $('.file-path-wrapper').hide();
        $('#img-text').text('SUBIENDO..');

    });

    $('#submit').on('click', function () {
        $('form').submit();
        
    });

});