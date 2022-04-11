function load_info(my_object) {
    fetch(`/api/users/` + $(my_object).attr("data-id"))
        .then(async function (response) {
            if (response.status != 200) {
                console.log("oh no")
            } else {
                const data = await response.json();
                const row = document.getElementById($(my_object).attr("data-id")).getElementsByClassName("field")
                row[0].innerHTML = data[0].name
                row[1].innerHTML = data[0].age



            }
        });

}