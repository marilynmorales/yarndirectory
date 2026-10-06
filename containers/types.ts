export type RangeSelections = {
  [slug: string]: {
    label: string,
  }
}
export type SubInput = {
  [slug: string]: {
    index: number,
    label: string,
    options: string[]
  }
}
export type SelectedSubs = {
  [type: string]: {
    label: string,
    value: Set<string>
  }
}

export type SelectionRange = {
  [value: string] : {
    label: string
    percentage: number,
    hasRange: boolean
  }
}

export type FilterSlugContents = string | SelectedSubs | SelectionRange
export type FilterSelected = {
  [filter_slug:string]: FilterSlugContents
}

