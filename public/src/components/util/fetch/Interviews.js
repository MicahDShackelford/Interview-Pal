const Interviews = (userId) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/interview/${userId}`)
            .then((res) => {
                return res.json();
            }).then((res) => {
                resolve(res.payload);
            });
    });
}

export default Interviews;