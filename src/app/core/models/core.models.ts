export interface ImgProps {
    url: string;
    alt?: string;
    name?: string;
    id: number;
    title?: string;
    description?: string;
}

export interface Tab {
    id: string;
    label: string;
    icon: string;
}

export interface StatItem {
    label: string;
    value: string;
    icon?: string;
  }