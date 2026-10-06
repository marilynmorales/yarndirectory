'use client'
import { useState } from "react"
import Filter from "@containers/filter"
import Tablets from "@containers/tablet"
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';
import {FilterSlugContents} from "@containers/types";

const defaultSelected = {
  "weight": {
    "super_fine": {
      "label": "Super Fine",
      "value": {}
    }
  },
  "name": "Hello",
  "fibers": {
    "camel": {
      "label": "Camel",
      "percentage": 40,
      "hasRange": true
    },
    "alpaca": {
      "label": "Alpaca",
      "percentage": 0,
      "hasRange": true
    },
    "wool": {
      "label": "Wool",
      "percentage": 60,
      "hasRange": false
    }
  }
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
          <Filter 
            selected={selected} 
            onChange={(selected: FilterSlugContents) => {
              setSelected(selected)
            }} 
          />
        </div>
			</div>
			<div className="main">
      <strong>Yarn Name</strong><br />
      <h2>{selected["name"]}</h2>
      <Tablets selected={selected}/>
			</div>
		</div>
	);
}
