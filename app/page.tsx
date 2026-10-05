'use client'
import { useState } from "react"
import Filter from "@containers/filter";
import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/react/24/solid';

function Tablets(selected) {
  console.log("ENTER TABLETS", selected)
  return (
    <a tabIndex={0} className="tablet">Bulky<XMarkIcon/></a>
  )
}
export default function Page() {
  const [ selected, setSelected ] = useState({})
  function toggleMenu() {
  
  }
	return (
		<div className="layout">
			<div className="aside">
				<header>
          <h1>Yarn Directory</h1>
            <a 
              tabIndex={0}
              className="hamburger" 
              onClick={() => {
                toggleMenu()
            }}>
            <AdjustmentsVerticalIcon />
          </a>
				</header>
        <div className="menu">
          <Filter onChange={(selected) => {
            setSelected(selected)
          }} />
        </div>
			</div>
			<div className="main">
      <strong>Yarn Name</strong><br />
      <h2>{selected.name}</h2>
      <Tablets selected={selected}/>
			</div>
		</div>
	);
}
