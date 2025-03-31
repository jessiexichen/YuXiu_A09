export type Voice = {
  id: number;
  name: string;
  date: string;
  group: string;
  status: string;
  file: File | null;
  description: string;
}

export type PopVoice = {
  id: number;
  name: string;
  language: string;
  avatar: string;
  description: string;
}
