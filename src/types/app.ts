export interface Modal {
  isOpen: boolean;
}

export interface Note {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface Filter {
  id: string;
  name: string;
  isActive: boolean;
}
