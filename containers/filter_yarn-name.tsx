import { useState, useEffect } from "react"

type Props = {
  onChange: Function
}
export default function({onChange}:Props) {
  const FIELD_NAME = "name"
  let [ value, setValue ] = useState("");

  useEffect(() => {
    onChange(FIELD_NAME, value)
  }, [])
  useEffect(() => {
    onChange(FIELD_NAME, value)
  }, [value])
  return (
    <fieldset>
      <legend>
        Search by part or whole name
      </legend>
      <label htmlFor="search-name">Name</label>
      <input 
        id="search-name" 
        name={FIELD_NAME} 
        type="text" 
        value={value}
        onChange={(e) => setValue(e.target.value)} 
      />
    </fieldset>
  )
}
