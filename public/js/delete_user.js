function delete_user(my_object) {

    fetch(`/api/users/` + $(my_object).attr("data-id"), {
            method: 'DELETE'
        })
        .then(result => {
            build_user()
        })
}