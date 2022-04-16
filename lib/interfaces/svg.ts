export interface SvgAttribute {
  id: string;
}

export interface SvgChild {
  value: string;
  attributes: SvgAttribute;
}

export interface SvgNode {
  children: [SvgChild];
}
