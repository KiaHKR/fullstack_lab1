function build_user() {
    fetch(`/api/users`)
        .then(async function (response) {
            if (response.status != 200) {
                console.log("oh no")
            } else {
                const data = await response.json();
                console.log(data)
                document.getElementById("user_list").innerHTML = "";
                data.forEach(element => {
                    document.getElementById("user_list").innerHTML += (`\
                    <div class='row' id="${element._id}">
                    <div class='col-md-3'>
                    <p class='id'><b>ID:</b>${element._id}</p>
                    </div><div class='col-md-3'>
                    <p class='name'><b>NAME:</b> <span class="field">******</span></p>
                    </div><div class='col-md-3'>
                    <p class='age'><b>AGE:</b> <span class="field">**</span></p>
                    </div><div class='col-md-3'>
                    <button onclick="load_user(this)"class='btn' data-id='${element._id}'><i class='fa-solid fa-pencil'></i></button>\
                    <button onclick="delete_user(this) "class='btn' data-id='${element._id}'><i class='fa-solid fa-trash'></i></button>
                    <button onclick="load_info(this)"class='btn' data-id='${element._id}'><i class='fa-solid fa-info'></i></button>
                    </div></div>`)
                });


            }
        });

}

build_user()