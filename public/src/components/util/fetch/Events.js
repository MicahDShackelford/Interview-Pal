const Events = (userId) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/calendar/${userId}`)
            .then((res) => {
                return res.json();
            }).then((res) => {
                resolve(res.payload);
            });
    });
}

export default Events;