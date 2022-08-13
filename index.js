function search(){
    const last_name = $("#search_last_name").val().trim();
    $.ajax(`/find_customer/${last_name}`,{
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $("#find_customer_response").css("display","block");
            $("#customer_id").html(`${data.first_name} ${data.last_name} Ph: ${data.phone} Email: ${data.email}`);
            $("#find_customer_div").css("display", "none");

    }});};

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
            $("#add_customer_response").css("display","block");
            $("#add_customer_response").html(`Customer ${data.first_name} ${data.last_name} has been added.`);
            $("#add_customer_div").css("display", "none");

}})};

$(document).ready(function() {
    $("#phone").keyup(function() {
        $(this).val($(this).val().replace(/^(\d{3})(\d{3})(\d+)$/, "($1)$2-$3"));
    });
    $("#customer_form").submit(function(e){
        e.preventDefault();
        addCustomer();})
            
    $("#customer_search_form").submit(function(e){
        e.preventDefault();  
        search();});

// NAV BAR
    $("#find_customer").click(function(e){
        e.preventDefault();
        $("#server_response").remove();
        $("#add_customer_div").css("display", "none");
        $("#find_customer_div").css("display", "block");
    });
    $("#add_customer").click(function(e){
        e.preventDefault();
        $("#server_response").remove();
        $("#add_customer_div").css("display", "block");
        $("#find_customer_div").css("display", "none");});});