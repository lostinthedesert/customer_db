function handleClickEvent(e){
    e.preventDefault();
    $(".selected").removeClass("selected");
    const newClass= $(this).data("id");
    $(`.${newClass}`).addClass("selected");
};

function wireUpClickEvent(){
    $(".add_customerLink").click(handleClickEvent);
    $(".find_customerLink").click(handleClickEvent);
};

function handleFormSubmit(e){
    e.preventDefault();
    const newClass = $(this).data("id");
    $(`.${newClass}`).addClass("selected");
    console.log($(this).data("name"));

    if ($(this).data("name")=="search-form"){
        const last_name = $("#search_last_name").val().trim();
        document.getElementById("customer_search_form").reset();
        console.log(newClass);
        $.ajax(`/find_customer/${last_name}`,{
            type: 'GET',
            dataType: 'json',
            success: function(data){
                $("#response").html(`Results - name: ${data.first_name} ${data.last_name} ph: ${data.phone} email: ${data.email}`);
            },
            error: function(xhr){
                if(xhr.status==404){
                    $("#response").html(`Customer ${last_name} not found.`);
                }}        
        })
    }
    else{
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
                $("#response").html(`Customer ${data.customer_first} ${data.customer_last} has been added`);
            }
        })
    };
};

function wireUpFormSubmit(){
    $("#add_form").submit(handleFormSubmit);
    $("#customer_search_form").submit(handleFormSubmit);
}

$(document).ready(function() {
    
    $("#phone").keyup(function() {
        $(this).val($(this).val().replace(/^(\d{3})(\d{3})(\d+)$/, "($1)$2-$3"));
    });

// NAV BAR
    wireUpClickEvent();

// SUBMIT FORM
    wireUpFormSubmit();
});

