import type { navPage } from '@/types/navBar';

const navPages : navPage[] = [
  {name: "首页", url: "/home"},
  {name:"产品简介",url: "/home/profile"},
  {name:"使用教程",url: "/home/tutor"},
  {name: "功能介绍",url: "/home/introduce"},
  {name: "性能优势",url: ""},
  {name: "迭代方向",url: ""},
  {name: "用户评价",url: ""},
  {name: "反馈入口",url: ""},
]

const childPages : navPage[] = [
  { name: "语音合成", url: "/text-to-speech" },
  { name: "构筑声音", url: "/new-voice" },
  { name: "有声课件制作", url: "/ppt-creation" },
  { name: "个人中心", url: "/user-center" },
];

const lanConfig = {
  visibleLanguages : ["中文", "英语", "法语", "俄语", "西班牙语", "阿拉伯语"],
  visibleLanguages1 : ["中文", "英语", "法语", "俄语", "西班牙语", "阿拉伯语", "德语", "希腊语",
    "丹麦语", "捷克语", "意大利语", "芬兰语", "日语", "韩语"],
  allLanguages : ["中文", "英语", "法语", "俄语", "西班牙语", "阿拉伯语", "德语", "希腊语",
    "丹麦语", "捷克语", "意大利语", "芬兰语", "日语", "韩语", "泰语", "越南语", "南非语"],

  contentType: ["诗歌", "新闻", "散文", "俗语"],

  localLanguage: ["广东", "四川", "上海", "郑州", "长沙", "天津", "闽南"],

  langType: ["标准", "温柔", "稚嫩", "活泼", "激情", "风趣"],
}
export {
  lanConfig,
  navPages,
  childPages
}


