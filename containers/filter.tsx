'use client'

import FilterYarnName from "./filter_yarn-name"
import FilterYarnWeight from "./filter_yarn-weight"
import FilterYarnFiber from "./filter_yarn-fiber"

export default function Filter() {
  return (
    <form>
      <FilterYarnName />
      <FilterYarnWeight />
      <FilterYarnFiber />
    </form>
  )
}
