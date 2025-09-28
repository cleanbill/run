import { Lap } from "@/types";
import SingleLap from "./singleLap";

type Props = {
    laps: Array<Lap>
    teamLapNo: number
    start: Function
    finished: Function
}

const TeamLap = ({ laps, teamLapNo, start, finished }: Props) => {
    return (
        <fieldset className="bg-blue-100 border-4 border-black dark:border-white m-2 p-2 rounded dark:rounded-2xl">
            <legend className="px-2 text-lg font-semibold text-gray-700 dark:bg-gray-200 dark:font-black dark:rounded-2xl">
                Team Lap {teamLapNo + 1}
            </legend>
            <section className="mt-2 text-lg text-gray-500 grid grid-cols-4 gap-2 mb-2 ">
                <h3 className="text-gray-700 font-bold">Name</h3>
                <h3 className="text-gray-700 font-bold">Start</h3>
                <h3 className="text-gray-700 font-bold">End</h3>
                <h3 className="text-gray-700 font-bold mb-1 text-right">Laptime</h3>
                {laps.map((lap: Lap) => (
                    <SingleLap key={lap.index} lap={lap} start={start} finished={finished}></SingleLap>
                ))}
            </section>
        </fieldset >
    )
}

export default TeamLap;