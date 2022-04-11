function addUser() {
    var name_query = document.getElementById('name').value;
    var age_query = document.getElementById('age').value;


    fetch(`/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name_query,
            age: age_query
        })

    }).then(result => {
        build_user()
    })
}