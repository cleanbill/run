"use client"

import { useEffect, useState } from "react";
import { Lap } from '../types';
import TeamLap from "./components/teamLap";
import NameInput from "./components/nameInput";
import { useLocalStorage } from "usehooks-ts";
import { getTeamLaps, getMinutesDifference, updateStartTimes, z } from "./utils";

const LAP_QTY = 25;


export default function Home() {
  const [laps, setLaps] = useLocalStorage("LAPS", new Array<Lap>());
  const [team, setTeam] = useLocalStorage("TEAM", ["Jim", "Al", "Steve", "Andrew", "Mick", "Dan", "Pete"]);
  const [teamLaps, setTeamLaps] = useState(new Array<Array<Lap>>());

  useEffect(() => {
    setup(team, laps);
  }, [])

  const setup = (team: Array<string>, laps: Array<Lap>) => {
    if (laps.length == LAP_QTY - 1) {
      setTeamLaps(getTeamLaps(laps, team.length));
      return;
    }
    let teamNo = -1;
    let time = 11;
    const newLaps = new Array<Lap>();
    for (let lap = 1; lap < LAP_QTY; lap++) {
      teamNo = teamNo > team.length - 2 ? 0 : teamNo + 1;
      const name = team[teamNo];
      time = time > 22 ? 0 : time + 1;
      const start = z(time) + ":00";
      const end = "";//addMinutesToTime(start, LAP_TIME);
      newLaps.push({ index: (lap - 1), name, start, end, time: "00:00" });
    }
    setLaps([...newLaps]);
    setTeamLaps(getTeamLaps(newLaps, team.length));
  }

  const start = (i: number, startTime: string) => {
    laps[i].start = startTime;
    laps[i].time = "" + getMinutesDifference(laps[i].start, laps[i].end);
    setLaps([...laps]);
    setTeamLaps(getTeamLaps(laps, team.length));

  }

  const finished = (i: number, finishedTime: string) => {
    laps[i].end = finishedTime;
    const diff = getMinutesDifference(laps[i].start, laps[i].end);
    laps[i].time = Number.isNaN(diff) ? "----" : "" + diff;
    const newLaps = updateStartTimes(i + 1, finishedTime, laps, team);
    setLaps([...newLaps]);
    setTeamLaps(getTeamLaps(newLaps, team.length));
  }


  const nameChange = (name: string, i: number) => {
    const oldName = team[i] + "";
    team[i] = name;
    setTeam([...team]);
    const newLaps = laps.map((lap: Lap) => {
      const newName = lap.name == oldName ? name : lap.name;
      lap.name = newName;
      return lap;
    })
    setLaps(newLaps);
  }

  const reset = () => {
    setup(team, []);
  }

  const addRunner = () => {
    team.push("");
    setTeam([...team]);
    setup(team, []);
  }

  const takeRunner = (i: number) => {
    team.splice(i, 1);
    setTeam([...team]);
    setup(team, []);
  }

  return (
    <>
      <h1 className="text-4xl font-bold mt-2 text-center">Running out of time</h1>
      <main className="mb-30">
        <div className="lg:grid grid-cols-12">

          <div className=" col-span-8">
            {teamLaps.map((subLaps: Array<Lap>, teamLapNo: number) => (
              <TeamLap key={"teamLap-" + teamLapNo} teamLapNo={teamLapNo} start={start} finished={finished} laps={subLaps}></TeamLap>
            ))}
          </div>
          <div className="border-2 rounded col-span-4">
            <h2 className="text-2xl font-bold mt-2 text-center">Team</h2>
            <div className="grid grid-cols-3">
              {team.map((name: string, i: number) => (
                <NameInput takeRunner={takeRunner} nameChange={nameChange} i={i} name={name} key={"name-change-" + i}></NameInput>
              ))}
              <button onClick={() => addRunner()} className="bg-blue-100 col-span-3 rounded-xl hover:bg-blue-200 mr-10 ml-10 mt-5 mb-5 p-5">Add</button>
              <button onClick={() => reset()} className="bg-blue-100 col-span-3 rounded-xl hover:bg-blue-200 mr-10 ml-10 mt-5 mb-5 p-5">Reset</button>
            </div>
          </div>
        </div>
      </main >
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Alien poo
      </footer>
    </>
  );
}
