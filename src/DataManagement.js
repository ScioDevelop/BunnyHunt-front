import { atom } from 'jotai'
export const BoardSize = atom([5,3])
export const GameSettings = atom(
    {
        "C1": "red",
        "C2": "green",
        "C3": "blue",
        "m": "5",
        "n": "3",
        "FindingObject": "/img/rabbit.png",
        "FindingText": "najdi Kralicka",
        "nextTimmer": "30000",
        "T1": "1000",
        "T2": "2000",
        "T3": "3000"
    }
)
