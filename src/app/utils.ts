import { Lap } from "@/types";


export const getMinutesDifference = (time1: string, time2: string): number => {
    const totalMinutes1 = timeToMinutes(time1);
    const totalMinutes2 = timeToMinutes(time2);
    return Math.abs(totalMinutes2 - totalMinutes1);
}


export const updateStartTimes = (i: number, finishedTime: string, newLaps: Array<Lap>, team: Array<string>): Array<Lap> => {
    const max = newLaps.length;
    while (i < max) {
        newLaps[i].start = addMinutesToTime(finishedTime, getTransistionTime(i));
        finishedTime = addMinutesToTime(newLaps[i].start, getLapTime(i, newLaps));
        i++;
    }

    // add needed laps to hit 24 hours
    i--;
    while (timeToMinutes(finishedTime) < 720) {
        const name = getNextName(i, newLaps, team);
        const lap = { index: (i + 1), name, start: "", end: "", time: "00:00" };
        newLaps.push(lap);
        i++;
        newLaps[i].start = addMinutesToTime(finishedTime, getTransistionTime(i));
        finishedTime = addMinutesToTime(newLaps[i].start, getLapTime(i, newLaps));
    }

    // remove extra over 24 hours
    i == newLaps.length - 1;
    while (timeToMinutes(newLaps[i].start) >= 720) {
        newLaps.splice(i, 1);
        i--;
    }

    return newLaps;
}

export const getTeamLaps = (laps: Array<Lap>, teamSize: number) => {
    const teamLaps = Array<Array<Lap>>();
    for (let i = 0; i < laps.length; i += teamSize) {
        const teamLap = laps.slice(i, i + teamSize);
        teamLaps.push(teamLap);
    }
    return teamLaps;
}


export const z = (n: number) => n > 9 ? "" + n : "0" + n;






const addMinutesToTime = (timeStr: string, minutes: number) => {
    // Create a new Date object (the date part doesn't matter, we only care about the time)
    const [hours, mins] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(mins + minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    // Get the new hours and minutes
    const newHours = date.getHours().toString().padStart(2, '0');
    const newMins = date.getMinutes().toString().padStart(2, '0');

    // Return the new formatted time string
    return `${newHours}:${newMins}`;
}

const timeToMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}


const LAP_TIME = 60;

const getLapTime = (i: number, laps: Array<Lap>) => {
    const name = laps[i].name;
    const times = laps.filter((lap: Lap) => lap.name == name)
        .map((lap: Lap) => parseInt(lap.time) || 0)
        .filter((time: number) => time > 0);
    if (times.length == 0) {
        return LAP_TIME
    }

    const sum = times.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const av = sum / times.length;
    return av;
};


const TRANSISTION_TIME = 2;

const getTransistionTime = (i: number) => TRANSISTION_TIME; // @TODO needs to be a dynamic avarage.

const getNextName = (i: number, laps: Array<Lap>, team: Array<string>) => {
    const runner = laps[i];
    const place = team.indexOf(runner.name);
    const index = place + 1 == laps.length ? 0 : place + 1;
    return team[index];
}



