const hotelsMock = [
     {
                id: "1",
                name: "Hotel Aurora Palace",
                stars: 3,
                pricing: {
                    regular: { weekday: 110, weekend: 90 },
                    premium: { weekday: 80, weekend: 80 }
                }
    },
    {
        id: "2",
        name: "Hotel Costa Verde Resort",
        stars: 4,
        pricing: {
            regular: {
                weekday: 160,
                weekend: 60
            },
            premium: {
                weekday: 110,
                weekend: 50
            }
        }
    },
    {
        id: "3",
        name: "Hotel Imperial Prime",
        stars: 5,
        pricing: {
            regular: {
                weekday: 220,
                weekend: 150
            },
            premium: {
                weekday: 100,
                weekend: 40
            }
        }
    },
]

export default hotelsMock;