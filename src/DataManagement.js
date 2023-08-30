import { atom } from "jotai";
export let NumberOfRounds = atom(0);

export const Attempts = atom(0);
export const AttemptsColor = atom({red: 0, green: 0, blue: 0});
export const timeLeft = atom(30)

export const GameSettings = atom([
    {
        NazevHry: "<b>Hledání papouška<b>",
        TextZaCislem: ".hra",
        ZpravaNaKonciKola: "papouška nalezena!",
        ZpravaPriOdpoctu: "Další kolo za",
        ProstorProPokyn: "Najdi papuška",
        Goal: {
          src: "/img/parrot.png",
          time: 1000, // 2sek
          type: "animal",
          color: "red",
        },
        HraciPlocha: "3x4",
        Karticky: [
          {
            data: "text", //5 kartiček modrých s daty z text1, s náhodným časem 1sek,2sek,3sek a 6sek.
            color: "red",
            count: 3,
            time: [2],
          },
          {
            data: "image", //5 kartiček červených s daty z image2, s náhodným časem 2sek a 6sek.
            color: "red",
            count: 3,
            time: [2],
          },
          {
            data: "animal", //5 kartiček zelených s daty z animal, s časem 6sek.
            color: "red",
            count: 3,
            time: [2],
          },
          {
            data: "gif", //5 kartiček zelených s daty z animal, s časem 5sek.
            color: "red",
            count: 3,
            time: [2],
          },
        ],
        KonecKola: "find", //find, afterTime, afterAttempts, afterSpecificColorAttempts
      },
    
    {
    NazevHry: "<b>Hledání kde člověk vždy najde<b>",
    TextZaCislem: ".hra",
    ZpravaNaKonciKola: "Pět karet otočeno!",
    ZpravaPriOdpoctu: "Další kolo za",
    ProstorProPokyn: "po pěti otočení ukončíš kolo",
    Goal: {
      src: "/img/parrot.png",
      time: 2000, // 2sek
      type: "animal",
      color: "blue",
    },
    HraciPlocha: "3x3",
    Karticky: [
      {
        data: "text", //5 kartiček modrých s daty z text1, s náhodným časem 1sek,2sek,3sek a 6sek.
        color: "blue",
        count: 3,
        time: [1],
      },
      {
        data: "image", //5 kartiček červených s daty z image2, s náhodným časem 2sek a 6sek.
        color: "red",
        count: 3,
        time: [1],
      },
      {
        data: "animal", //5 kartiček zelených s daty z animal, s časem 6sek.
        color: "green",
        count: 3,
        time: [1],
      },
    ],
    KonecKola: "afterAttempts", //find, afterTime, afterAttempts, afterSpecificColorAttempts
    afterAttemptsCount: 5,
  },
  {
    NazevHry: "<b>Hledání kačenky<b>",
    TextZaCislem: ".hra",
    ZpravaNaKonciKola: "Tři červené kartičky otočené!",
    ZpravaPriOdpoctu: "Další kolo za",
    ProstorProPokyn: "po otočení tří kartiček červené barvy ukončíš kolo",
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
        time: [1],
      },
      {
        data: "image", //5 kartiček červených s daty z image2, s náhodným časem 2sek a 6sek.
        color: "red",
        count: 5,
        time: [1],
      },
      {
        data: "animal", //5 kartiček zelených s daty z animal, s časem 6sek.
        color: "green",
        count: 5,
        time: [1],
      },
      {
        data: "gif", //5 kartiček zelených s daty z animal, s časem 5sek.
        color: "blue",
        count: 5,
        time: [1],
      },
    ],
    KonecKola: "afterSpecificColorAttempts", //find, afterTime, afterAttempts, afterSpecificColorAttempts
    afterAttemptsCount: 3,
    afterSpecificColorAttemptsColor: "red",
  },
  {
    NazevHry: "<b>Hledání králíčka<b>",
    TextZaCislem: ".hra",
    ZpravaNaKonciKola: "Králíček nalezen!",
    ZpravaPriOdpoctu: "Další kolo za",
    ProstorProPokyn: "po nalezení králíčka se kolo ukončí za 30 sek",
    Goal: {
      src: "/img/rabbit.png",
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
        time: [1],
      },
      {
        data: "image", //5 kartiček červených s daty z image2, s náhodným časem 2sek a 6sek.
        color: "red",
        count: 5,
        time: [1],
      },
      {
        data: "animal", //5 kartiček zelených s daty z animal, s časem 6sek.
        color: "green",
        count: 5,
        time: [1],
      },
      {
        data: "gif", //5 kartiček zelených s daty z animal, s časem 5sek.
        color: "blue",
        count: 5,
        time: [1],
      },
    ],
    KonecKola: "afterTime", //find, afterTime, afterAttempts, afterSpecificColorAttempts
    KonecKolaTime: 30, // 30sek
  }
]);

// {
//     "C1": "red",
//     "C2": "green",
//     "C3": "blue",
//     "m": "5",
//     "n": "3",
//     "FindingObject": "/img/rabbit.png",
//     "FindingText": "najdi Kralicka",
//     "nextTimmer": "60",
//     "T1": "1000",
//     "T2": "2000",
//     "T3": "3000"
// }
