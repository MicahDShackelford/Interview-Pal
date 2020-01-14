const Notes = (userId) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/notes/${userId}`)
            .then((res) => {
                return res.json();
            }).then((res) => {
                resolve(res.payload);
            });
    });
}

export default Notes;