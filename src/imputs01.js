const PrvniKolo = [{
    NazevHry: "<b>Hledání kačenky<b>",
    TextZaCislem: ".kolo",
    ZpravaNaKonciKola: "Kačenka nalezena!",
    ZpravaPriOdpoctu: "Další kolo za",
    ProstorProPokyn: "Najdi Kačenku",
    Goal: {
        src: "/img/hippo.png",
        time: 2000, // 2sek
        type: "animal",
        color: "blue",
    },
    HraciPlocha: "5x4",
    Karticky: [
        {
            data: "text", //5 kartiček modrých s daty z text1, s náhodným časem 1sek,2sek,3sek a 6sek.
            color: "blue",
            count: 5,
            time: [1,2,3,6]
        },
        {
            data: "image", //5 kartiček červených s daty z image2, s náhodným časem 2sek a 6sek.
            color: "red",
            count: 5,
            time: [6,2]
        },
        {
            data: "animal", //5 kartiček zelených s daty z animal, s časem 6sek.
            color: "green",
            count: 5,
            time: [6]
        },
        {
            "data": "gif", //5 kartiček zelených s daty z animal, s časem 5sek.
            "color": "blue",
            "count": 5,
            "time": [1]
        }
    ],
    KonecKola: "afterTime", //find, afterTime, afterAttempts, afterSpecificColorAttempts
    KonecKolaTime: 30000, // 30sek
}]