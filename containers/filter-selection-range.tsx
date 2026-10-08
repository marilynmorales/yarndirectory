import { useState, useEffect } from "react"
import type { RangeSelections, SelectionRange } from "./types"

type Props = {
  onChange: Function
  selections: RangeSelections
  selected: SelectionRange
  min: number
  max: number
  name: string
  label: string
  placeholder: string
}

export default function({
  onChange: _onChange, 
  selections,
  selected: activeSelection,
  min, 
  max,
  label,
  name,
  placeholder
}:Props) { 
  const MIN_RANGE = min;
  const MAX_RANGE = max;
  const [ selected, setSelected ] = useState<string>("") 
  const [ acc, setAcc ] = useState<number>(0);

  useEffect(() => {
    let _acc = 0;
    for(const active in activeSelection) {
      const selection = activeSelection[active]
      if(selection.hasRange) {
        _acc += selection.percentage;
      }
    }
    setAcc(_acc)
    _onChange(activeSelection)
  }, [activeSelection])

  function onChange(name: string, e: React.ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const updatedSelection = structuredClone(activeSelection)
    updatedSelection[name].percentage = target.valueAsNumber;
    _onChange(updatedSelection);
  }
  function onRangeChange(name: string, e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    const updatedSelection = structuredClone(activeSelection)
    updatedSelection[name].hasRange = checked;
    _onChange(updatedSelection);
  }

  function onRemove(name: string, _e: React.MouseEvent<HTMLButtonElement>) {
    const updatedSelection = structuredClone(activeSelection)
    delete updatedSelection[name]
    _onChange(updatedSelection)
  }
  
  return (
    <fieldset>
      <legend>{label}</legend>
      <select 
        value={selected}
        onChange={(e) => {
          const { target } = e;
          setSelected(target.value)
        }}
      >
         <option key="empty" value="">{placeholder}</option>
        {Object.keys(selections).map(selection => {
          const disabled = activeSelection[selection] !== undefined
          return (
           <option key={selection} disabled={disabled} value={selection}>{selections[selection].label}</option>
          )
        })}
      </select>
      <button 
        type="button" 
        disabled={selected === ""} 
        onClick={() => {
          let updatedActiveSelection = structuredClone(activeSelection); 
          updatedActiveSelection[selected] = {
            label: selections[selected].label,
            percentage: 100 - acc,
            hasRange: true
          }
          _onChange(updatedActiveSelection)
          setSelected("")
      }}>Add To List</button>
      {Object.keys(activeSelection).map(selection => {
        const { percentage, hasRange } = activeSelection[selection];
        return (
          <div key={selection} className="search--field-sub">
            <input 
              type="range" 
              id={`${name}[${selection}][percentage]`} 
              onChange={onChange.bind(this, selection)}
              name={`${name}-${selection}-percentage`} 
              value={percentage}
              disabled={!hasRange}
              min={MIN_RANGE}
              max={MAX_RANGE} 
            />
            <input 
              type="number" 
              onChange={onChange.bind(this, selection)} 
              id={`${name}[${selection}][percentage_number]`} 
              name={`${name}-${selection}-percentage_number`} 
              value={percentage}
              disabled={!hasRange}
              min={MIN_RANGE} 
              max={MAX_RANGE} 
            />
            <input 
              type="checkbox" 
              onChange={onRangeChange.bind(this, selection)} 
              id={`${name}[${selection}][has_range]`} 
              name={`${name}-${selection}-has_range`} 
              checked={hasRange}
            />
            <label htmlFor={`${name}[${selection}][percentage]`}>% {selections[selection].label}</label>
            <button 
              type="button"
              onClick={onRemove.bind(this, selection)}
            >Remove</button>
          </div>
        )
      })}
    </fieldset>
  )
}
