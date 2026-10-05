import type { SelectedSubs } from "./types"
import { useState, useEffect } from "react"
type YarnWeightInput = {
  [slug: string]: {
    index: number,
    label: string,
    options: string[]
  }
}
const types:YarnWeightInput = {
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

type Props = {
  onChange: Function
}
export default function({onChange: _onChanged}:Props) {
  const [selected, setSelected] = useState<SelectedSubs>({})

  useEffect(() => {
    _onChanged(selected);
  }, [selected])
  function onChange(
    slug_type:string,
    label: string,
    value: string,
    _e:React.ChangeEvent<HTMLInputElement>
  ) {
    let _selected = structuredClone(selected);
    if(_selected.hasOwnProperty(slug_type)) {
      if(_selected[slug_type].value.has(value)) {
        _selected[slug_type].value.delete(value)
      } else {
        _selected[slug_type].value.add(value)
      }

      if(_selected[slug_type].value.size === 0) {
        delete _selected[slug_type];
      }
    } else {
      _selected[slug_type] = {
        label,
        value: new Set([value])
      }
    }
    setSelected(_selected)
  }
  
  return (
    <fieldset>
      <legend>
        Yarn Weight
      </legend>
      {Object.keys(types).map((type, index) => {
        const { label, options } = types[type];
        return (
          <div key={type} className="search--field-sub">
            <strong>{index} - {label}</strong>
            {options.map(opt => {
              const slug = opt.split(" ").join("_").toLowerCase();
              const id = `search-weight--${index}-${slug}`;
              return (
                <div key={(label + slug)}>
                <input 
                  id={id} 
                  name={`weight[${index}][${slug}]`} 
                  type="checkbox"
                  checked={selected[type]?.value.has(opt) ?? false}
                  onChange={onChange.bind(this, type, label, opt)}
                />
                <label htmlFor={id}>{opt}</label>
                </div>
              );
            })}
          </div>
        );
      })}
    </fieldset>
  )
}
