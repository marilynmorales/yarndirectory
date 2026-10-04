import { useState, useEffect } from "react"

type FibersInput = {
  [value: string] : {
    label: string
  }
}


const fibers:FibersInput = {
  wool: {
    label: "Wool",
  },
  alpaca: {
    label: "Alpaca",
  },
  camel: {
    label: "Camel",
  }
}

type ActiveFibers = {
  [value: string]: {
    percentage: number,
    hasRange: boolean
  }
}

export default function() { 
  const MIN_RANGE = 0;
  const MAX_RANGE = 100;
  const [ selected, setSelected ] = useState<string>("") 
  const [ acc, setAcc ] = useState<number>(0);
  const [ activeFibers, setActiveFibers ] = useState<ActiveFibers>({});

  useEffect(() => {
    let _acc = 0;
    for(const af in activeFibers) {
      const fiber = activeFibers[af]
      if(fiber.hasRange) {
        _acc += fiber.percentage;
      }
    }
    setAcc(_acc)
  }, [activeFibers])

  function onChange(name: string, e: React.ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const updatedFibers = structuredClone(activeFibers)
    updatedFibers[name].percentage = target.valueAsNumber;
    setActiveFibers(updatedFibers);
  }
  return (
    <fieldset>
      <select 
        value={selected}
        onChange={(e) => {
          const { target } = e;
          setSelected(target.value)
        }}
      >
         <option key="empty" value="">Choose a fiber</option>
        {Object.keys(fibers).map(fiber => {
          const disabled = activeFibers[fiber] !== undefined
          return (
           <option key={fiber} disabled={disabled} value={fiber}>{fibers[fiber].label}</option>
          )
        })}
      </select>
      <button type="button" disabled={selected === ""} onClick={() => {
        let updatedActiveFibers = structuredClone(activeFibers); 
        updatedActiveFibers[selected] = {
          percentage: 100 - acc,
          hasRange: true
        }
        setActiveFibers(updatedActiveFibers)
        setSelected("")
      console.log(selected)
      }}>Add To List</button>
      <legend>Fibers</legend>
      {Object.keys(activeFibers).map(fiber => {
        const { percentage } = activeFibers[fiber];
        return (
          <div key={fiber} className="search--field-sub">
            <input 
              type="range" 
              id={`fibers[${fiber}][percentage]`} 
              onChange={onChange.bind(this, fiber)}
              name={`fibers-${fiber}-percetage`} 
              value={percentage}
              min={MIN_RANGE}
              max={MAX_RANGE} 
            />
            <input 
              type="number" 
              onChange={onChange.bind(this, fiber)} 
              id="age" 
              name="age" 
              value={percentage}
              min={MIN_RANGE} 
              max={MAX_RANGE} 
            />
            <label htmlFor={`fibers[${fiber}][percentage]`}>% {fibers[fiber].label}</label>
          </div>
        )
      })}
    </fieldset>
  )
}
