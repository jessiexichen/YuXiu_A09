import type { navPage } from '@/types/navBar';

const navPages : navPage[] = [
  {name: "首页", url: "/home"},
  {name:"产品简介",url: "/home"},
  {name:"使用教程",url: "/home"},
  {name: "功能介绍",url: "/home"},
  {name: "性能优势",url: "/home"},
  {name: "迭代方向",url: "/home"},
  {name: "用户评价",url: "/home"},
  {name: "反馈入口",url: "/home"},
]

const childPages : navPage[] = [
  { name: "语音合成", url: "/text-to-speech" },
  { name: "构筑声音", url: "/new-voice" },
  { name: "有声课件制作", url: "/ppt-creation" },
  { name: "生成历史", url: "/tranhistory" },
  { name: "个人中心", url: "/user-center" },
];

const lanConfig = {
  visibleLanguages : ["中文", "英语", "法语", "日语", "俄语", "西班牙语"],
  visibleLanguages1 : ["中文", "英语", "法语", "日语", "俄语", "西班牙语", "阿拉伯语", "德语", "希腊语",
    "丹麦语", "捷克语", "意大利语", "芬兰语"],
  allLanguages : ["中文", "英语", "法语", "日语","俄语", "西班牙语", "阿拉伯语", "德语", "希腊语", "丹麦语", "捷克语",
    "意大利语", "芬兰语", "韩语", "泰语", "越南语", "南非语", "阿塞拜疆语", "保加利亚语", "孟加拉语",
    "波斯尼亚语", "加泰罗尼亚语", "威尔士语", "爱沙尼亚语", "波斯语", "菲律宾语", "希伯来语", "印地语", "克罗地亚语",
    "匈牙利语", "印尼语", "冰岛语", "柬埔寨语", "卡纳达语", "老挝语", "立陶宛语", "蒙古语", "马来语", "缅甸语", "挪威语", "尼泊尔语",
    "波兰语", "葡萄牙语", "罗马尼亚语", "斯洛伐克语", "斯洛文尼亚语", "瑞典语", "土耳其语", "乌克兰语", "乌尔都语"],


  localLanguage: ["普通话","广东", "四川", "上海", "郑州", "长沙", "天津"],

  langType: ["标准", "温柔", "稚嫩", "活泼", "激情", "风趣"],
}
export {
  lanConfig,
  navPages,
  childPages
}


