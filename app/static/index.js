function addCustomer(){
    const first_name = $("#first_name").val().trim();
    const last_name = $("#last_name").val().trim();
    const phone = $("#phone").val().trim();
    const email = $("#email").val().trim();
    const customer= JSON.stringify({"first_name":first_name, "last_name": last_name, "phone": phone, "email": email});
    $.ajax("/customer",{
        type: 'POST',
        contentType: 'application/json',
        data: customer,
        dataType: 'json',
        success: function(data){
            document.getElementById("add_form").reset(); 
            $(".customer_response").css("display", "block");
            $("#add_response").html(`Customer ${data.customer_first} ${data.customer_last} has been added`);
            $("#add_response").css("display","block");
            $("#find_customer_response").css("display", "none");
}})};

function search(){
    const last_name = $("#search_last_name").val().trim();
    $.ajax(`/find_customer/${last_name}`,{
        type: 'GET',
        dataType: 'json',
        success: function(data){
            document.getElementById("customer_search_form").reset();
            $("#add_response").css("display", "none");
            $("#find_customer_response").css("display","block");
            $(".customer_response").css("display", "block");           
            $("#customer_id").html(`${data.first_name} ${data.last_name} Ph: ${data.phone} Email: ${data.email}`);
        },
        error: function(xhr){
            if(xhr.status==404){
                $(".customer_response").css("display", "block");
                $("#find_customer_response").css("display","block");
                $("#customer_id").html(`Customer ${last_name} not found.`);
            }
        }
    });};

$(document).ready(function() {
    
    $("#phone").keyup(function() {
        $(this).val($(this).val().replace(/^(\d{3})(\d{3})(\d+)$/, "($1)$2-$3"));
    
    });
    $("#add_form").submit(function(e){
        e.preventDefault();
        addCustomer();
    })

    $("#customer_search_form").submit(function(e){
        e.preventDefault();  
        search();
    });

// NAV BAR
    $("#add_customer").click(function(e){
        e.preventDefault();
        $(".customer_response").css("display", "none")
        $(".add_customer").css("display", "block");
        $(".find_customer").css("display", "none");
    });

    $("#find_customer").click(function(e){
        e.preventDefault();
        $(".customer_response").css("display", "none")
        $(".add_customer").css("display", "none");
        $(".find_customer").css("display", "block");
    });});
    