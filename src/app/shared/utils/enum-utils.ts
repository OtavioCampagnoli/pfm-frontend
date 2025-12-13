export function enumToDropdownOptions(enumObj: any): { label: string }[] {
  return Object.keys(enumObj).map(key => ({
    label: enumObj[key as keyof typeof enumObj],

  }));
}
