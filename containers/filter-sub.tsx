import type { SelectedSubs, SubInput } from "./types"
import { useState, useEffect } from "react"
type Props = {
  options: SubInput
  onChange: Function
  name: string
}
export default function({
  onChange: _onChanged,
  options,
  name
}:Props) {
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
      {Object.keys(options).map((type, index) => {
        const { label, options:_options } = options[type];
        return (
          <div key={type} className="search--field-sub">
            <strong>{index} - {label}</strong>
            {_options.map(opt => {
              const slug = opt.split(" ").join("_").toLowerCase();
              const id = `search-${name}--${index}-${slug}`;
              return (
                <div key={(label + slug)}>
                <input 
                  id={id} 
                  name={`${name}[${index}][${slug}]`} 
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
