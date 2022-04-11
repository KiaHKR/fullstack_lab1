function load_user(my_object) {
    fetch(`/api/users/` + $(my_object).attr("data-id"))
        .then(async function (response) {
            if (response.status != 200) {
                console.log("oh no")
            } else {
                const data = await response.json();
                $("#update_id").val(data[0]._id)
                $("#update_name").val(data[0].name)
                $("#update_age").val(data[0].age)



            }
        });

}

function update_user() {
    const id_query = document.getElementById('update_id').value;
    const name_query = document.getElementById('update_name').value;
    const age_query = document.getElementById('update_age').value;
    fetch(`/api/users/` + id_query, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name_query,
                age: age_query
            })

        })
        .then(async response => {
            const data = await response.json();
            console.log(data)
            if (response.status != 200) {
                alert("oh no");
            } else {
                body
            }
        });
}