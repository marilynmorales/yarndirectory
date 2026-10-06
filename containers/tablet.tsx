import type { FilterSelected, FilterSlugContents } from "@containers/types"
import { XMarkIcon } from '@heroicons/react/24/solid';

type TabletProps = {
  selected: FilterSelected
}

type TabletKeysProps = {
  selected: Exclude<FilterSlugContents, string>
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

function TabletKeys({selected}: TabletKeysProps) {
  return Object.keys(selected).map((select) => {
    const _select = selected[select]
    let name = _select.label;
    if("value" in _select && _select.value instanceof Set) {

      return [..._select.value].map((v) => {
        return (<a key={v} tabIndex={0} className="tablet">{name + ": " + v}<XMarkIcon/></a>);
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
      <a key={select} tabIndex={0} className="tablet">{name}<XMarkIcon/></a>
    )
  })
}

export default function Tablets({selected}: TabletProps) {
  console.log(selected)
  return (<div className="tablets">
    {Object.keys(selected).map((slug) => {
      if(typeof selected[slug] === "string") return null;
      return (<div key={slug} className="tablet-group">
        <TabletHeader name={slug}/>        
        <TabletKeys selected={selected[slug]} />
      </div>)
    })}
  </div>)
}

