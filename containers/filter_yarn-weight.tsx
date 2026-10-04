type YarnWeightInput = {
  label: string,
  options: string[]
}[]

const types:YarnWeightInput = [
  {
    label: "Lace",
    options: ["Crochet Thread", "Fingering"]
  },
  {
    label: "Super Fine",
    options: ["Sock", "Fingering", "Baby"]
  },
  {
    label: "Fine",
    options: ["Baby", "Sport"]             
  },
  {
    label: "Light",
    options: ["DK", "Light Worsted"]
  },
  {
    label: "Medium",
    options: ["Worsted", "Afghan", "Aran"]
  },
  {
    label: "Bulky",
    options: ["Chunky", "Craft", "Rug"]
  },
  {
    label: "Super Bulky",
    options: ["Super Bulky", "Roving"]
  },
  {
    label: "Jumbo",
    options: ["Jumbo", "Roving"]
  }
]
export default function() {
  return (
    <fieldset>
      <legend>
        Yarn Weight
      </legend>
      {types.map((type, index) => {
        return (
          <div key={type.label} className="search--field-sub">
            <strong>{index} - {type.label}</strong>
            {type.options.map(opt => {
              const slug = opt.split(" ").join("_").toLowerCase();
              const id = `search-weight--${index}-${slug}`;
              return (
                <div key={(type.label + slug)}>
                <input id={id} name={`weight[${index}][${slug}]`} type="checkbox"/>
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
