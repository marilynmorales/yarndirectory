import { FilterSelected, SelectionValue, SelectedSubsInput, OptionSelectors } from "@containers/types"
import { XMarkIcon } from '@heroicons/react/24/solid';

type TabletProps = {
  selected: FilterSelected
  onChange: Function
}

type TabletKeysProps = {
  selected: OptionSelectors
  onChange: Function
}

type TabletHeaderProps = {
  name: string
}

function TabletHeader({name}: TabletHeaderProps) {
  const _name = (name[0].toUpperCase() + name.substring(1))
    .split("_")
    .join(" ")
  return <>{_name}</>
}

function TabletKeys({selected, onChange}: TabletKeysProps) {

  function isSubFilter(select: SelectionValue): select is SelectedSubsInput {
    return "value" in select && select.value instanceof Set;
  }
  function onClick(slug: string, select: SelectionValue, value: string | null) {
    onChange(slug, select, value)
  }

  return Object.keys(selected).map((select) => {
    const _select = selected[select]
    let name = _select.label;
    if(isSubFilter(_select)) {
      return [..._select.value].map((v) => {
        return (
          <a 
            key={v} 
            tabIndex={0} 
            className="tablet"
            onClick={onClick.bind(this, select, v)}
          >
            {name + ": " + v}<XMarkIcon/>
          </a>
        );
      })
    }
    if("percentage" in _select) {
      if(_select.hasRange) {
        if(_select.percentage === 0) {
          name = "No " + _select.label;
        } else {
          name = _select.percentage + "% " + _select.label; 
        }
      } else {
        name = "Has " + _select.label;
      }
    }
    return (
      <a 
        key={select} 
        tabIndex={0} 
        className="tablet"
        onClick={onClick.bind(this, select, null)}
      >
        {name}<XMarkIcon/>
      </a>
    )
  })
}

export default function Tablets({selected, onChange}: TabletProps) {
  return (<div className="tablets">
    {Object.keys(selected).map((slug) => {
      if(typeof selected[slug] === "string") return null;
      return (<div key={slug} className="tablet-group">
        <TabletHeader name={slug}/>        
        <TabletKeys 
          selected={selected[slug]}
          onChange={((slug: string, select_slug: string, value: string | null) => {
            let _selection = structuredClone(selected);
            if(value) {
              _selection[slug][select_slug].value.delete(value);
            } else {
              delete _selection[slug][select_slug];
            }
            onChange(_selection);
          }).bind(this, slug)}
        />
      </div>)
    })}
  </div>)
}

