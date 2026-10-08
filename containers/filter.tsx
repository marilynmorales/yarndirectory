'use client'

import FilterInput from "./filter-input"
import FilterSub from "./filter-sub"
import FilterSelectionRange from "./filter-selection-range"
import type { SelectedSubs, SubInput, SelectionRange, RangeSelections, FilterSelected } from "./types"

type Props = {
  onChange: Function,
  selected: FilterSelected
}

const types:SubInput = {
  lace: {
    index: 0,
    label: "Lace",
    options: ["Crochet Thread", "Fingering"]
  },
  super_fine: {
    index: 1,
    label: "Super Fine",
    options: ["Sock", "Fingering", "Baby"]
  },
  fine: {
    index: 2,
    label: "Fine",
    options: ["Baby", "Sport"]             
  },
  light: {
    index: 3,
    label: "Light",
    options: ["DK", "Light Worsted"]
  },
  medium: {
    index: 4,
    label: "Medium",
    options: ["Worsted", "Afghan", "Aran"]
  },
  bulky: {
    index: 5,
    label: "Bulky",
    options: ["Chunky", "Craft", "Rug"]
  },
  super_bulky: {
    index: 6,
    label: "Super Bulky",
    options: ["Super Bulky", "Roving"]
  },
  jumbo: {
    index: 7,
    label: "Jumbo",
    options: ["Jumbo", "Roving"]
  }
}

const fibers:RangeSelections = {
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

export default function Filter({onChange, selected}:Props) {

  function setSelectedHelper(name:string, selections: SelectedSubs | SelectionRange) {
    let uselected = structuredClone(selected);
    uselected[name] = selections;
    if(uselected[name] && Object.keys(uselected[name]).length === 0) {
      delete uselected[name]
    }
    onChange(uselected)
  } 

  return (
    <form autoComplete="off">
      <FilterInput
        onChange={((_name:string,value:string) => {
          let _selected = structuredClone(selected)
          _selected[_name]=value;
          onChange(_selected)
        })}
      />
      <FilterSub 
        selected={selected["weight"] as SelectedSubs}
        name="weight"
        options={types}
        onChange={setSelectedHelper.bind(this, "weight")}
      />
      <FilterSelectionRange 
        selections={fibers}
        selected={selected["fibers"] as SelectionRange}
        label="Fibers"
        placeholder="Choose a fiber"
        name="fibers"
        min={0}
        max={100}
        onChange={setSelectedHelper.bind(this, "fibers")}
      />
    </form>
  )
}
