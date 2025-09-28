import { Lap } from "@/types"

type Props = {
    start: Function
    finished: Function
    lap: Lap
}

const SingleLap = ({ start, finished, lap }: Props) => {

    return (
        <>
            <label key={"name" + lap.index} className="w-100">{lap.name}</label>
            <input onChange={(e) => start(lap.index, e.target.value)} width="100" type="time" key={"start" + lap.index} className="w-20" value={lap.start}></input>
            <input onChange={(e) => finished(lap.index, e.target.value)} width="100" type="time" key={"end" + lap.index} className="w-20" value={lap.end}></input>
            <label key={"time" + lap.index} className="text-right">{lap.time}</label>
        </>);

}


export default SingleLap;