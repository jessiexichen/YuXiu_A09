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
  sample: string;
}

export type TranHistory = {
  type: "语音合成" | "基础视频" | "讲解视频" | "构建声音";
  date: string;
  content: string;
  status: string;
  tags: string[];
  sourceUrl: string;
}

export type SelectedVoice = {
  type: string;
  tags: string[];
  name: string;
  language: string;
  avatar: string;
}
