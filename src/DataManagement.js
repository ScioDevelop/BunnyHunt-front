import { atom } from "jotai";

export const Attempts = atom(0);
export const AttemptsColor = atom({red: 0, green: 0, blue: 0});
export const timeLeft = atom(30)

export const isRunning = atom(false)

export const matchNumber = atom(1) // Use for counting mateches


export const GameSettings = atom([]);
export let NumberOfRounds = atom(0); // use for gameSettings array walktrought
export const Cards = atom([]);
export const User = atom("");