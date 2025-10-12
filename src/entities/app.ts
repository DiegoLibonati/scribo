export type Modal = {
  isOpen: boolean;
};

export type Note = {
  id: string;
  date: string;
  title: string;
  content: string;
};

export type Filter = {
  id: string;
  name: string;
  isActive: boolean;
};
