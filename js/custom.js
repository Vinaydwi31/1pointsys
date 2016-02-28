$(document).ready(function () {
    $('.learn-more').click(function (e) {
        if ($(this).html() == 'Learn more')
        {
            $('#hiddenAboutUsP').show();
            $(this).html('Hide More');
        }
        else
        {
            $('#hiddenAboutUsP').hide();
            $(this).html('Learn more');
        }
        e.preventDefault();        
    });

    $('.learn-more-sd').click(function (e) {
        if ($(this).html() == 'Learn more') {
            $('#hiddenSoftDev').show();
            $(this).html('Hide More');
        }
        else {
            $('#hiddenSoftDev').hide();
            $(this).html('Learn more');
        }
        e.preventDefault();
    });

    $("#contactUSPhoneNumber").focusout(function () {
        $('.custom-validation.pn').remove();
        $("#contactUSPhoneNumber").css('background-color', '#1B1F25');
        if ($("#contactUSPhoneNumber").val() != null && $("#contactUSPhoneNumber").val() != '' && $("#contactUSPhoneNumber").val() != ' ')
        {
            var regexPhoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (regexPhoneNumber.test($("#contactUSPhoneNumber").val())) {
                var formattedPhoneNumber = $("#contactUSPhoneNumber").val().replace(regexPhoneNumber, "($1) $2-$3");
                $("#contactUSPhoneNumber").val(formattedPhoneNumber);
            }
            else {
                $("#contactUSPhoneNumber").css('background-color', '#008080').after("<div style='font-color:red;color: red;font-size: small;' class='custom-validation'>Phone number is not valid.</div>");
            }
        }        
    });
    $('#btnContactUs').click(function(){
        // Validate the Controls
        $('#btnContactUs').attr('disabled', 'disabled');
        $('.custom-validation').remove();
        $('.form-control').css('background-color', '#1B1F25');
        var regexPhoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var regexEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        var isValid = true;
        
        if (regexPhoneNumber.test($("#contactUSPhoneNumber").val()))
        {
            var formattedPhoneNumber = $("#contactUSPhoneNumber").val().replace(regexPhoneNumber, "($1) $2-$3");
            $("#contactUSPhoneNumber").val(formattedPhoneNumber);
        }
        else
        {
            $("#contactUSPhoneNumber").css('background-color', '#008080').after("<div style='font-color:red;color: red;font-size: small;' class='custom-validation pn'>Phone number is not valid.</div>");
            isValid = false;
        }

        if (!regexEmail.test($("#contactUSEmail").val())) {
            $("#contactUSEmail").css('background-color', '#008080').after("<div style='font-color:red;color: red;font-size: small;' class='custom-validation'>Email is not valid.</div>");
            isValid = false;
        }
        if ($("#contactUSName").val() == null || $("#contactUSName").val() == '' || $("#contactUSName").val() == ' ')
        {
            $("#contactUSName").css('background-color', '#008080').after("<div style='font-color:red;color: red;font-size: small;' class='custom-validation'>Full Name cannot be empty.</div>");
            isValid = false;
        }

        if ($("#contactUSComments").val() == null || $("#contactUSComments").val() == '' || $("#contactUSComments").val() == ' ') {
            $("#contactUSComments").css('background-color', '#008080').after("<div style='font-color:red;color: red;font-size: small;' class='custom-validation'>Comments cannot be empty.</div>");
            isValid = false;
        }
        if (!isValid)
            return;


        var url = '/sendEmail.php';
        $.ajax({
            url: '../sendEmail.php',
            data: { name: $('#contactUSName').val(), email: $('#contactUSEmail').val(), phonenumber: $('#contactUSPhoneNumber').val(), comments: $('#contactUSComments').val() },
            type: 'post',
            success: function (output) {
                $('#contactUSResponse').html(output);
                if (output.toLowerCase().indexOf("error") >= 0)
                {
                    $('#contactUSResponse').css('color', '#E62117');
                }
                else
                {
                    $('#contactUSResponse').css('color', '#92B751');
                    $('#contactUSName').val('');
                    $('#contactUSEmail').val('');
                    $('#contactUSPhoneNumber').val('');
                    $('#contactUSComments').val('')
                    $('#contactUSName').focus();
                }
               
            }
        });
        $('#btnContactUs').removeAttr('disabled');
    });
    
});