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

export type SelectedSubsInput = {
  label: string,
  value: Set<string>
}
export type SelectedSubs = {
  [type: string]: SelectedSubsInput
}

export type SelectionRangeInput = {
  label: string
  percentage: number,
  hasRange: boolean
}
export type SelectionRange = {
  [value: string] : SelectionRangeInput
}

export type FilterSlugContents = string | SelectedSubs | SelectionRange

export type SelectionValue = SelectionRangeInput | SelectedSubsInput
export type FilterSelected = {
  [filter_slug:string]: FilterSlugContents
}
export type OptionSelectors = Exclude<FilterSlugContents, string>
