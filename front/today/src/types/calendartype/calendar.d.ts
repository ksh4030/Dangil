export interface Header {
  month: number;
  year: number;
  date: number;
  today: {
    month: number;
    year: number;
    date: number;
  };
  moveToNextMonth: (month: number) => void;
  moveToPreviousMonth: (month: number) => void;
  moveToSpecificYearAndMonth: (year: number, month: number) => void;
}

export interface PressedDate {
  state: string;
  year: number;
  month: number;
  date: number;
}

export type dayType = {
  [key: string]: any;
};
