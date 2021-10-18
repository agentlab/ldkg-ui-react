export interface Relation {
  title: string;
  predicate: string;
  type?: string;
}

export interface FilterType {
  value: any[];
  valueName?: string[];
  title: string;
  property: string;
  relation: Relation;
}

export interface ValueOfFilter {
  value: any[];
  valueName?: string[];
}
