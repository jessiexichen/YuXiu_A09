import type { navPage } from '@/types/navBar';
import type { PopVoice, TranHistory } from '@/types/voice';

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

const popularVoices : PopVoice[] = [
  {
    id: 1,
    name: "宋浩",
    language: "普通话",
    avatar: "src//assets/avatar/宋浩.jpg",
    description: "好，各位同学，大家上午好，今天又开始了高等数学的学习哈。",
    sample: "语音合成/宋浩示例音频.mp3"
  },
  {
    id: 2,
    name: "雷军",
    language: "普通话",
    avatar: "src//assets/avatar/雷军.jpg",
    description: "用户满意度是根本。把所有精力放在改善产品和服务，让用户满意……",
    sample: ""
  },
  {
    id: 3,
    name: "奶龙",
    language: "普通话",
    avatar: "src/assets/avatar/奶龙.jpg",
    description: "我是奶龙，我是奶龙，我才是真正的奶龙。今夜星光闪闪，爱你的心……",
    sample: ""
  },
  {
    id: 4,
    name: "Harry Potter",
    language: "英语",
    avatar: "src/assets/avatar/哈利波特.jpg",
    description: "Lumos Maxima，Lumos Maxima.",
    sample: ""
  },
  {
    id: 5,
    name: "蕾姆レム",
    language: "日语",
    avatar: "src/assets/avatar/蕾姆.jpg",
    description: "まる時間、凍る心、昴が優しく溶かし、また動き出させた……",
    sample: ""
  },
  {
    id: 6,
    name: "丁真",
    language: "普通话",
    avatar: "src/assets/avatar/丁真.jpeg",
    description: "大家好，我是丁真。今天想跟大家分享我这里的美景...",
    sample: ""
  },
  {
    id: 7,
    name: "李天意",
    language: "普通话",
    avatar: "src/assets/avatar/李天意.jpg",
    description: "我们接下来学习的随机变量，先学离散的，再学连续的。从简单到……",
    sample: ""
  },
  {
    id: 8,
    name: "学过石油的语文老师",
    language: "普通话",
    avatar: "src/assets/avatar/学过石油的语文老师.jpg",
    description: "没文采咋办？字不好看扣分吗？作文咋提分……",
    sample: ""
  },
  {
    id: 9,
    name: "林志玲",
    language: "普通话",
    avatar: "src/assets/avatar/林志玲.jpg",
    description: "上天莫名其妙给了我知名度，我却只有一个大问号！如果是这……",
    sample: ""
  }
]

const tranhistory: TranHistory[] = [
  {
    type: "语音合成",
    content: "今天，我们来讲解计算机的发展历史。你知道世界上第一台通用电子计算机是什么吗？它就是1946年诞生的ENIAC，使用穿孔卡片存储程序，编程复杂且低效。后来，冯·诺依曼提出‘存储程序’和‘程序控制’原理，奠定了现代计算机的基础。这种架构沿用至今，被称为‘冯·诺依曼结构’，他也因此被誉为‘现代电子计算机之父’。",
    date: "2025-03-31",
    tags: ["普通话", "标准", "男"],
    status: "已完成",
    sourceUrl: "",
  },
  {
    type: "语音合成",
    content: "Text A / Lead-inHow do you celebrate Spring Festival? Write down your activities in the following table and analyze whose skill and labor are required to make these activities possible. After completing the table, share it with your partner and discuss the following two questions.1 What's the power that leads people to work and cooperate?2 What do you understand about economic life from the table?",
    date: "2025-03-31",
    tags: ["英语", "标准", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "开平碉楼融合中西建筑风格，曾用作防御土匪嘅堡垒。你知唔知道点解当时要兴建咁多碉楼？",
    date: "2025-03-31",
    tags: ["广东", "标准", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "都江堰是李冰父子修建的水利工程，让成都变成‘天府之国’。你晓得它是咋个运作的吗？",
    date: "2025-03-31",
    tags: ["四川", "标准", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "1843年上海开埠，外滩成为金融中心，十里洋场繁华一时。侬晓得当年租界是怎么划分的吗？",
    date: "2025-03-31",
    tags: ["上海", "标准", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "郑州是商朝早期的都城，甲骨文和青铜器见证了三千年历史。你知道郑州城墙遗址是咋发现的吗？",
    date: "2025-03-31",
    tags: ["郑州", "标准", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "马王堆汉墓出土了完整的辛追夫人遗体和珍贵丝绸。你晓得这些丝织品为啥保存这么好吗？",
    date: "2025-03-31",
    tags: ["长沙", "标准", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "天津卫设立于明朝，因漕运兴起，码头文化繁荣。你知道‘卫’在古代是啥意思吗？",
    date: "2025-03-31",
    tags: ["天津", "标准", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "同学们，今天我们一起来学习一首古诗。这首诗描绘了春天的美景，让我们闭上眼睛，想象温暖的春风轻轻拂过脸颊，花儿悄悄绽放。请大家跟着我一起朗读，感受诗中的意境。",
    date: "2025-03-31",
    tags: ["普通话", "温柔", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "小朋友们，今天我们来讲一个可爱的故事！从前，有一只小兔子，它最喜欢在草地上蹦蹦跳跳。一天，它遇到了一只小乌龟，他们成为了好朋友。你们想知道后来发生了什么吗？我们一起来听听吧！",
    date: "2025-03-31",
    tags: ["普通话", "稚嫩", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "大家好！欢迎来到我们的课堂！今天，我们要一起探索有趣的科学小实验。你们知道为什么有些东西能浮在水面上，而有些却会沉下去吗？让我们动手试一试，看看其中的奥秘吧！准备好了吗？那我们开始啦！",
    date: "2025-03-31",
    tags: ["普通话", "活泼", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "同学们！历史的长河波澜壮阔，每一次创新都推动着人类文明的进步！今天，我们将探讨一场改变世界的科技革命！让我们带着求知的热情，一起走进这段激动人心的历史！",
    date: "2025-03-31",
    tags: ["普通话", "激情", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "嘿，同学们，你们有没有想过，为什么牛奶是白色的？难道奶牛只吃白色的东西？当然不是啦！今天我们就来揭秘这个有趣的科学现象，保证让你们听完后惊叹：‘原来是这样！",
    date: "2025-03-31",
    tags: ["普通话", "风趣", "男"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "《纸船——寄母亲》，冰心 我从不肯妄弃了一张纸，总是留着——留着，叠成一只只很小的船儿，从舟上抛下在海里。",
    date: "2025-03-31",
    tags: ["普通话", "标准", "女"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "定理 7（极限审敛法 2） 设函数f(x)在区间(a, b]上连续且f(x) \geq 0 ， x = a  为  f(x)的瑕点。如果存在常数  0 < q < 1 ，使得\\lim_{x \\to a^+} (x-a)^q f(x)存在，那么反常积分  \\int_a^b f(x) \\, dx  收敛；如果 \\lim_{x \to a^+} (x-a) f(x) = d > 0 \\quad (\\text{或} \\lim_{x \to a^+} f(x) = +\\infty)，那么反常积分  \\int_a^b f(x) \\, dx  发散。",
    date: "2025-03-31",
    tags: ["普通话", "宋浩"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "构建声音",
    content: "丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。",
    date: "2025-03-31",
    tags: ["普通话", "声音1"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "构建声音",
    content: "这个问题所有人都学过，但我答对99%的人都答不对，甚至连教材都是错的。从岸上看水里的鱼，它的实际位置比你看到的位置是更深还是更浅呢？",
    date: "2025-03-31",
    tags: ["普通话", "毕导"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "“密码”或“加密系统”用于“加密”数据。对于原始的未加密的数据，我们称之为“明文”；对于加密的结果，我们称之为“密文”。通过称为“解密”的过程，我们把密文恢复成原始的明文。“密钥”是一个重要的概念，我们用它来配置密码系统以实施加密和解密。",
    date: "2025-03-31",
    tags: ["普通话", "声音1"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "语音合成",
    content: "在“对称密钥”密码体系中，加密和解密使用的是同样的密钥，如图2-1中所示的黑盒密码系统说明了这个特性。另外，还有所谓“公开密钥”加密技术的概念，其中用到的加密和解密密钥是不同的。既然使用不同的密钥，公开加密密钥就成为可能的——这就是公开密钥这个名字的由来。在公开密钥加密中，加密密钥被相应地称为“公钥”，而解密密钥则需要确保机密，被称为“私钥”。在对称密钥加密中，密钥被称为“对称密钥”。我们需要区分清楚这些关于密钥的术语，以免混淆。",
    date: "2025-03-31",
    tags: ["普通话", "毕导"],
    status: "已完成",
    sourceUrl: ""
  },
  {
    type: "基础视频",
    content: "DNA是主要的遗传物质 课程导入，龙生龙，凤生凤，老鼠的儿子会打洞。人们通常将生物亲代与子代之间相似的现象，叫做遗传。  商品条形码上包含着商品名称、价格、生产日期等信息。俗话说“种瓜得瓜，种豆得豆”是因为亲代将自己的生命信息传递给了子代。在生物体内有没有隐含着生命信息的码呢？它存在哪里？又是如何传递的呢？",
    date: "2025-03-31",
    tags: ["普通话", "雷军"],
    status: "已完成",
    sourceUrl: "DNA是主要的遗传物质_基础视频.mp4"
  },
  {
    type: "讲解视频",
    content: "同学们，今天我们来学习一个非常重要的生物学概念——DNA是主要的遗传物质。遗传物质是生物体内控制遗传特征的物质基础，它决定了生物的性状和特征如何从一代传递到下一代。DNA作为遗传物质的核心，承载着生物体的全部遗传信息，是生命延续的关键。大家都知道“龙生龙，凤生凤，老鼠的儿子会打洞”这句话吧？这其实是在描述生物的遗传现象。遗传是指生物亲代与子代之间相似的现象，比如父母的某些特征会在子女身上体现出来。这种遗传现象是如何发生的呢？这就涉及到我们今天要学习的遗传物质了。我们再来看一个大家熟悉的现象：“种瓜得瓜，种豆得豆”。这是因为亲代将自己的生命信息传递给了子代。那么，生物体内有没有一种像商品条形码一样，能够存储生命信息的“密码”呢？如果有，它又存在于生物体的哪个部位，又是如何传递给下一代的呢？这些问题我们将在接下来的内容中一一解答。",
    date: "2025-03-31",
    tags: ["普通话", "雷军"],
    status: "已完成",
    sourceUrl: "DNA是主要的遗传物质_讲解视频.mp4"
  },
  {
    type: "语音合成",
    content: "《端午的咸鸭蛋》 汪曾祺 家乡的端午，很多风俗和外地一样。系百索子。五色的丝线拧成小绳，系在手腕上。丝线是掉色的，洗脸时沾了水，手腕上就印得红一道绿一道的。做香角子。丝线缠成小粽子，里头装了香面，一个一个串起来，挂在帐钩上。贴五毒。红纸剪成五毒，贴在门坎上。贴符。这符是城隍庙送来的。城隍庙的老道士还是我的寄名干爹，他每年端午节前就派小道士送符来，还有两把小纸扇。符送来了，就贴在堂屋的门楣上。一尺来长的黄色、蓝色的纸条，上面用朱笔画些莫名其妙的道道，这就能辟邪么？喝雄黄酒。用酒和的雄黄在孩子的额头上画一个王字，这是很多地方都有的。有一个风俗不知别处有不：放黄烟子。黄烟子是大小如北方的麻雷子的炮仗，只是里面灌的不是硝药，而是雄黄。点着后不响，只是冒出一股黄烟，能冒好一会。把点着的黄烟子丢在橱柜下面，说是可以熏五毒。小孩子点了黄烟子，常把它的一头抵在板壁上写虎字。写黄烟虎字笔画不能断，所以我们那里的孩子都会写草书的“一笔虎。”还有一个风俗，是端午节的午饭要吃“十二红”，就是十二道红颜色的菜。十二红里我只记得有炒红苋菜、油爆虾、咸鸭蛋，其余的都记不清，数不出了。也许十二红只是一个名目，不一定真凑足十二样。不过午饭的菜都是红的，这一点是我没有记错的，而且，苋菜、虾、鸭蛋，一定是有的。我的家乡是水乡。出鸭。高邮麻鸭是著名的鸭种。鸭多，鸭蛋也多。高邮人也善于腌鸭蛋。高邮咸鸭蛋于是出了名。我在苏南、浙江，每逢有人问起我的籍贯，回答之后，对方就会肃然起敬：“哦!你们那里出咸鸭蛋!”上海的卖腌腊的店铺里也卖咸鸭蛋，必用纸条特别标明：“高邮咸蛋”。高邮还出双黄鸭蛋。别处鸭蛋有偶有双黄的，但不如高邮的多，可以成批输出。双黄鸭蛋味道其实无特别处。还不就是个鸭蛋!只是切开之后，里面圆圆的两个黄，使人惊奇不已。我对异乡人称道高邮鸭蛋，是不大高兴的，好像我们那穷地方就出鸭蛋似的!不过高邮的咸鸭蛋，确实是好，我走的地方不少，所食鸭蛋多矣，但和我家乡的完全不能相比!曾经沧海难为水，他乡咸鸭蛋，我实在瞧不上。袁枚的《随园食单 小菜单》有“腌蛋”一条。袁子才这个人我不喜欢，他的《食单》好些菜的做法是听来的，他自己并不会做菜。但是《腌蛋》这一条我看后却觉得很亲切，而且“与有荣焉”。文不长，录如下：腌蛋以高邮为佳，颜色细而油多，高文端公最喜食之。席间，先夹取以敬客，放盘中。总宜切开带壳，黄白兼用；不可存黄去白，使味不全，油亦走散。高邮咸蛋的特点是质细而油多。蛋白柔嫩，不似别处的发干、发粉，入口如嚼石灰。油多尤为别处所不及。鸭蛋的吃法，如袁子才所说，带壳切开，是一种，那是席间待客的办法。平常食用，一般都是敲破“空头”用筷子挖着吃。筷子头一扎下去，吱——红油就冒出来了。高邮咸蛋的黄是通红的。苏北有一道名菜，叫做“朱砂豆腐”，就是用高邮鸭蛋黄炒的豆腐。我在北京吃的咸鸭蛋，蛋黄是浅黄色的，这叫什么咸鸭蛋呢！端午节，我们那里的孩子兴挂“鸭蛋络子”。头一天，就由姑姑或姐姐用彩色丝线打好了络子。端午一早，鸭蛋煮熟了，由孩子自己去挑一个，鸭蛋有什么可挑的呢！有！一要挑淡青壳的。鸭蛋壳有白的和淡青的两种。二要挑形状好看的。别说鸭蛋都是一样的，细看却不同。有的样子蠢，有的秀气。挑好了，装在络子里，挂在大襟的纽扣上。这有什么好看呢？然而它是孩子心爱的饰物。鸭蛋络子挂了多半天，什么时候孩子一高兴，就把络子里的鸭蛋掏出来，吃了。端午的鸭蛋，新腌不久，只有一点淡淡的咸味，白嘴吃也可以。孩子吃鸭蛋是很小心的，除了敲去空头，不把蛋壳碰破。蛋黄蛋白吃光了，用清水把鸭蛋里面洗净，晚上捉了萤火虫来，装在蛋壳里，空头的地方糊一层薄罗。萤火虫在鸭蛋壳里一闪一闪地亮，好看极了！小时读囊萤映雪故事，觉得东晋的车胤用练囊盛了几十只萤火虫，照了读书，还不如用鸭蛋壳来装萤火虫。不过用萤火虫照亮来读书，而且一夜读到天亮，这能行么？车胤读的是手写的卷子，字大，若是读现在的新五号字，大概是不行的。",
    date: "2025-03-31",
    tags: ["普通话", "标准", "男"],
    status: "已完成",
    sourceUrl: ""
  }
];

const audioUrlTest = [
  "语音合成/普通话_男_标准_今天，我.mp3",
  "语音合成/普通话_男_标准_今天，我_调节后.mp3",
  "英语_男_标准_Text.mp3",
  "广东话_男_标准_开平碉楼.mp3",
  "四川话_男_ 标准_都江堰是.wav",
  "上海话_男_标准_1843.wav",
  "郑州话 _男_标准_郑州市商.wav",
  "长沙-男-标准-马王堆.wav",
  "天津话_男_标准_天津卫打.wav",
  "普通话_男_温柔_同学们，.mp3",
  "普通话_男_稚嫩_小朋友们.mp3",
  "普通话_男_活泼_大家好！.mp3",
  "普通话_男_激情_同学们！.mp3",
  "普通话_男_风趣_嘿，同学.mp3",
  "普通话_女_标准_《纸船-.mp3",
  "普通话_ 宋浩_定理(7.mp3",//15
  "普通话_男_标准_《端午的.mp3",//16
  "生成1.mp3",
  "生成2.mp3",

]
const textTest = [
  "毓秀语音教学平台以促进教育公平、提高教学效果为主要目标，致力于打造符合教育学原理与学习者需求的语音教学产品，提供多语言多风格语音合成、辅助语言学习、构建个性化语音库、有声课件制作、音频参数调节等特色功能，将技术与应用场景相结合，增强学习体验，提高学习效果，并进一步研究其跨学科应用潜力与技术的可拓展性。",
  "DNA是主要的遗传物质_基础视频.mp3",
  "Text A / Lead-inHow do you celebrate Spring Festival? Write down your activities in the following table and analyze whose skill and labor are required to make these activities possible. After completing the table, share it with your partner and discuss the following two questions.1 What's the power that leads people to work and cooperate?2 What do you understand about economic life from the table?",
  "开平碉楼融合中西建筑风格，曾用作防御土匪嘅堡垒。你知唔知道点解当时要兴建咁多碉楼？",
  "都江堰是李冰父子修建的水利工程，让成都变成‘天府之国’。你晓得它是咋个运作的吗？",
  "1843年上海开埠，外滩成为金融中心，十里洋场繁华一时。侬晓得当年租界是怎么划分的吗？",
  "郑州是商朝早期的都城，甲骨文和青铜器见证了三千年历史。你知道郑州城墙遗址是咋发现的吗？",
  "马王堆汉墓出土了完整的辛追夫人遗体和珍贵丝绸。你晓得这些丝织品为啥保存这么好吗？",
  "天津卫设立于明朝，因漕运兴起，码头文化繁荣。你知道‘卫’在古代是啥意思吗？",
  "同学们，今天我们一起来学习一首古诗。这首诗描绘了春天的美景，让我们闭上眼睛，想象温暖的春风轻轻拂过脸颊，花儿悄悄绽放。请大家跟着我一起朗读，感受诗中的意境。",
  "小朋友们，今天我们来讲一个可爱的故事！从前，有一只小兔子，它最喜欢在草地上蹦蹦跳跳。一天，它遇到了一只小乌龟，他们成为了好朋友。你们想知道后来发生了什么吗？我们一起来听听吧！",
  "大家好！欢迎来到我们的课堂！今天，我们要一起探索有趣的科学小实验。你们知道为什么有些东西能浮在水面上，而有些却会沉下去吗？让我们动手试一试，看看其中的奥秘吧！准备好了吗？那我们开始啦！",
  "同学们！历史的长河波澜壮阔，每一次创新都推动着人类文明的进步！今天，我们将探讨一场改变世界的科技革命！让我们带着求知的热情，一起走进这段激动人心的历史！",
  "嘿，同学们，你们有没有想过，为什么牛奶是白色的？难道奶牛只吃白色的东西？当然不是啦！今天我们就来揭秘这个有趣的科学现象，保证让你们听完后惊叹：‘原来是这样！",
  "《纸船——寄母亲》，冰心 我从不肯妄弃了一张纸，总是留着——留着，叠成一只只很小的船儿，从舟上抛下在海里。",
  "好，各位同学，大家上午好，今天又开始了高等数学的学习哈。",//15
  "毓秀语音教学平台以促进教育公平、提高教学效果为主要目标，致力于打造符合教育学原理与学习者需求的语音教学产品，提供多语言多风格语音合成、辅助语言学习、构建个性化语音库、有声课件制作、音频参数调节等特色功能，将技术与应用场景相结合，增强学习体验，提高学习效果，并进一步研究其跨学科应用潜力与技术的可拓展性。",
  "毓秀语音教学平台以促进教育公平、提高教学效果为主要目标，致力于打造符合教育学原理与学习者需求的语音教学产品，提供多语言多风格语音合成、辅助语言学习、构建个性化语音库、有声课件制作、音频参数调节等特色功能，将技术与应用场景相结合，增强学习体验，提高学习效果，并进一步研究其跨学科应用潜力与技术的可拓展性。",
  "毓秀语音教学平台以促进教育公平、提高教学效果为主要目标，致力于打造符合教育学原理与学习者需求的语音教学产品，提供多语言多风格语音合成、辅助语言学习、构建个性化语音库、有声课件制作、音频参数调节等特色功能，将技术与应用场景相结合，增强学习体验，提高学习效果，并进一步研究其跨学科应用潜力与技术的可拓展性。",
]

const chartData = [
  ["染色体", 78],
  ["DNA", 55],
  ["细胞核", 44],
  ["伞藻", 35],
  ["我们", 28],
  ["遗传信息", 27],
  ["基因", 25],
  ["生物", 22],
  ["实验", 19],
  ["结构", 19],
  ["分子", 17],
  ["一个", 17],
  ["主要", 15],
  ["遗传物质", 15],
  ["假根", 14],
  ["控制", 13],
  ["性状", 13],
  ["遗传", 12],
  ["通过", 12],
  ["生物体", 11]
]
export {
  lanConfig,
  navPages,
  childPages,
  popularVoices,
  tranhistory,
  audioUrlTest,
  textTest,
  chartData
}


