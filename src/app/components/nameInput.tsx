type Prop = {
    takeRunner: Function
    nameChange: Function
    i: number,
    name: string
}

const NameInput = ({ takeRunner, nameChange, i, name }: Prop) => {
    return (
        <>
            <button key={"delete-" + i} onClick={(e) => takeRunner(i)} className="bg-blue-100 rounded-xl hover:bg-blue-200 mr-10 ml-10 mt-5 mb-5 dark:text-black">-</button>
            <input key={"name-input-" + i} onChange={(e) => nameChange(e.target.value, i)} className="bg-blue-100 mb-5 p-2 mt-5 mr-10 rounded-xl col-span-2 dark:text-black" defaultValue={name}></input>
        </>
    )
}

export default NameInput;