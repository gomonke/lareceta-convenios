document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>');
document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>');
document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />');
document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');

var modal = '<div id="covenant-modal" class="modal" style="display: none;padding: 10px;">';
modal += '  <nav class="cart_totals note" aria-label="breadcrumbs" style="padding-top: 10px;padding-top: 10px;margin-bottom: 10px;">';
modal += '        <table style="border: hidden;width:100%;margin-bottom: 60px;">';
modal += '  <thead>';
modal += '      <tr>';
modal += '          <th colspan="3" style="text-align: center!important;"><h1 id="title" style="margin-bottom: 20px !important;font-size: 22px;"></h1></th>';
modal += '      </tr>';
modal += '      <tr>';
modal += '          <th colspan="3" style=""><p id="description" style="margin-bottom: 50px !important;margin-left: 10px;"></p></th>';
modal += '      </tr>';
modal += '  </thead>';
modal += '  <tbody id="covenantList" style="border: hidden">';
modal += '      <tr>';
modal += '          <td style="text-align: right !important;">';
modal += '              <input id="documentNumber" type="text" placeholder="" >';
modal += '          </td>';
modal += '          <td style="text-align: left !important;">';
modal += '              <input id="validate" type="button" name="" class="" value="Ingresar" >';
modal += '<button id="loading"  disabled="" style="display:none;">';
modal += '    <i class="fa fa-spinner fa-spin"></i>&nbsp;Cargando...';
modal += '</button>';
modal += '          </td>';
modal += '      </tr>';
modal += '  </tbody>';
modal += '</table>';
modal += '    </nav><a id="closeModal" href="#" rel="modal:close" class="button" style="display:none;">Cerrar</a>';
modal += '  </div>';

document.write(modal);

window.addEventListener("load", function (event) {
    qs = $("#shopiConvenio").attr("src").split("?")[1];
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    var origin = params.shop;

    $("#title").text(params.title);
    $("#description").text(params.description);
    $("#documentNumber").addClass(params.inputClass);
    $("#validate").addClass(params.btnClass);
    $("#loading").addClass(params.btnClass);
    $("#documentNumber").attr('placeholder',params.placeholder);

    var covenantModal = $("#covenant-modal").modal({
        escapeClose: false,
        clickClose: false,
        showClose: false
    });

    $("#validate").click(function (e) {
        var documentNumber = $("#documentNumber").val();

        if (documentNumber != null || documentNumber != "") {
            $("#loading").show();           
            $("#validate").hide();    
            //request
            $.ajax({
                url: ("https://convenios-lareceta.azurewebsites.net/api/Covenant/GetCovenantsByBeneficiary/" + origin + "/" + documentNumber),
                type: "GET",
                contentType: 'application/json;charset=utf-8',
                success: function (data) {
                    if (data != null && data.length > 0) {
                        $("#closeModal").click();
                    }
                    $("#loading").hide();
                    $("#validate").show();    
                },
                error: function (msg) {
                    $("#loading").hide();
                    $("#validate").show();
                    console.log(msg);                    
                }
            });
        }
        else {
            openModal();
        }

    });


});            