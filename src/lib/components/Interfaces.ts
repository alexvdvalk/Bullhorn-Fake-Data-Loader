export interface MetaResonse {
  entityMetaUrl: string;
  entity: string;
  sectionHeaders: SectionHeader[];
  label: string;
  entityType: string;
  layouts: Layout[];
  dateLastModified: string;
  fields: Field5[];
}

export interface Field5 {
  dataType?: string;
  optional: boolean;
  name: string;
  label: string;
  type: string;
  optionsUrl?: string;
  sortOrder?: number;
  hint?: string;
  systemRequired?: boolean;
  readOnly?: boolean;
  hideFromSearch?: boolean;
  optionsType?: string;
  shouldAddCustomEntityLabel?: boolean;
  description?: string;
  multiValue?: boolean;
  required?: boolean;
  dataSpecialization?: string;
  confidential?: boolean;
  associatedEntity?: AssociatedEntity2;
  fields?: Field4[];
  inputType?: string;
  maxLength?: number;
  options?: Option[];
  defaultValue?: string[] | string;
}

interface Field4 {
  sortOrder?: number;
  hint?: string;
  label?: string;
  type: string;
  systemRequired?: boolean;
  dataType: string;
  readOnly?: boolean;
  hideFromSearch?: boolean;
  maxLength?: number;
  shouldAddCustomEntityLabel?: boolean;
  description?: string;
  name: string;
  optional: boolean;
  multiValue?: boolean;
  required?: boolean;
  confidential?: boolean;
  optionsUrl?: string;
  optionsType?: string;
  inputType?: string;
  defaultValue?: number;
  options?: Option[];
  dataSpecialization?: string;
}

interface AssociatedEntity2 {
  entityMetaUrl: string;
  entity: string;
  label: string;
  dateLastModified: string;
  fields: Field3[];
  staticTemplateName?: string;
  tabName?: string;
}

interface Field3 {
  dataType?: string;
  optional: boolean;
  name: string;
  label: string;
  type: string;
  optionsUrl?: string;
  sortOrder?: number;
  hint?: string;
  systemRequired?: boolean;
  readOnly?: boolean;
  hideFromSearch?: boolean;
  optionsType?: string;
  shouldAddCustomEntityLabel?: boolean;
  description?: string;
  multiValue?: boolean;
  required?: boolean;
  dataSpecialization?: string;
  confidential?: boolean;
  associatedEntity?: AssociatedEntity;
  maxLength?: number;
  fields?: Field2[];
  inputType?: string;
  options?: Option[];
}

interface Option {
  value: string;
  label: string;
}

interface Field2 {
  sortOrder?: number;
  hint?: string;
  label?: string;
  type: string;
  systemRequired?: boolean;
  dataType: string;
  readOnly?: boolean;
  hideFromSearch?: boolean;
  maxLength?: number;
  shouldAddCustomEntityLabel?: boolean;
  description?: string;
  name: string;
  optional: boolean;
  multiValue?: boolean;
  required?: boolean;
  confidential?: boolean;
  optionsUrl?: string;
  optionsType?: string;
  inputType?: string;
  dataSpecialization?: string;
}

interface AssociatedEntity {
  entityMetaUrl: string;
  entity: string;
  label: string;
  dateLastModified: string;
  fields: Field[];
}

interface Field {
  dataType: string;
  optional: boolean;
  name: string;
  label: string;
  type: string;
  sortOrder?: number;
  hint?: string;
  systemRequired?: boolean;
  readOnly?: boolean;
  hideFromSearch?: boolean;
  maxLength?: number;
  shouldAddCustomEntityLabel?: boolean;
  description?: string;
  multiValue?: boolean;
  required?: boolean;
  confidential?: boolean;
}

interface Layout {
  enabled: boolean;
  name: string;
  label: string;
}

interface SectionHeader {
  enabled: boolean;
  sortOrder: number;
  name: string;
  label: string;
}
