export function extractNamedEntities(data) {
  const markings = [];

  for (let i of data['xmi:XMI']['type6:NamedEntity'].map((el) => el._attributes)) {
    markings.push({
      begin: parseInt(i.begin),
      end: parseInt(i.end),
      class_: `NER ${i.value}`,
    });
  }

  return markings;
}

export function getText(data) {
  return data['xmi:XMI']['cas:Sofa']['_attributes']['sofaString'];
}
