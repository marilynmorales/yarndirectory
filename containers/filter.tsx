'use client'

import { useState, useEffect } from "react"
import FilterYarnName from "./filter_yarn-name"
import FilterYarnWeight from "./filter_yarn-weight"
import FilterYarnFiber from "./filter_yarn-fiber"
import type {SelectedSubs} from "./types"

type Props = {
  onChange: Function
}

type Selected = {
  [filter_slug:string]: string | SelectedSubs
}
export default function Filter({onChange}:Props) {
  const [ selected, setSelected ] = useState<Selected>({})

  useEffect(() => {
    onChange(selected)
  }, [])
  
  useEffect(() => {
    onChange(selected)
  }, [selected])

  console.log(selected)

  return (
    <form>
      <FilterYarnName 
        onChange={((_name:string,value:string) => {
          let _selected = structuredClone(selected)
          _selected[_name]=value;
          setSelected(_selected)
        })}
      />
      <FilterYarnWeight 
        onChange={(_selected:SelectedSubs) => {
          let uselected = structuredClone(selected);
          uselected["weight"] = _selected;
          setSelected(uselected)
        }}
      />
      <FilterYarnFiber 
        onChange={() => {
        
        }}
      />
    </form>
  )
}
