import { defineStore } from 'pinia'
import { ref } from 'vue';
import type { Voice } from '@/types/voice';
import type { Words } from '@/types/words';

export const useCollectionStore = defineStore('collection', () => {
    // 声音数据
    const voices = ref<Voice[]>([
      {
        id: 1,
        name: "调节1",
        date: "2025/3/31",
        group: "分组2",
        status: "success",
        file: null,
        description: "总是明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我……",
      },
      {
        id: 2,
        name: "声音1",
        date: "2025/3/31",
        group: "分组1",
        status: "success",
        file: null,
        description: "丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？……",
      },
      {
        id: 3,
        name: "毕导",
        date: "2025/3/31",
        group: "b站up主",
        status: "success",
        file: null,
        description: "这个问题所有人都学过，但我答对99%的人都答不对，甚至连教材……",
      },
    ]);

    // 分组列表
    const groups = ref<string[]>(["分组1","分组2","b站up主"]);

  function CollectVoice(newVoice: string , group: string) {
    voices.value.push(
      {
        id: voices.value.length + 1,
        name: newVoice,
        date: new Date().toLocaleDateString(),
        group: group,
        status: "success",
        //file功能之后想玩可以想想怎么接
        file: null,
        description: "",
      }
    );
    buildGroup(group);
  }
  function DeleteVoice(id: number): boolean {
    // 找到声音的索引
    const index = voices.value.findIndex(voice => voice.id === id);

    if (index !== -1) {
      // 删除声音对象
      voices.value.splice(index, 1);
      return true;
    }
    return false;
  }

  function buildGroup(group: string) {
    if(!groups.value.includes(group)){
      groups.value.push(group);
    }
  }

  function restoreVoice(id: number, newName: string, newGroup: string) {
    //检查修改的组存在吗
    buildGroup(newGroup);
    // 找到声音的索引
    const index = voices.value.findIndex(voice => voice.id === id);

    if (index !== -1) {
      // 替换声音对象
      voices.value.splice(index, 1, {
        ...voices.value[index], // 保留原始的日期和其他字段
        name: newName,
        group: newGroup,
      });
      return true;
    }
    return false;
  }
  async function getVoice(id: number) {
    return new Promise((resolve) => {
      voices.value.forEach((voice:Voice) => {
        if (voice.id === id) {
          resolve(voice);
        }
      });
    });
  }

  return { voices, groups, CollectVoice, DeleteVoice, buildGroup, restoreVoice, getVoice }
})

export const useWordsStore = defineStore('words', () => {
  const wordsStore = ref<Words[]>([
    {
      id: 1,
      name: "生物",
      data: ["染色体","DNA"," 细胞核", "伞藻", "基因", "遗传信息", "基因", "遗传物质", "假根", "性状", "遗传"],
    },
  ]);
  function CollectWords(newWords: string[], name: string) {
    wordsStore.value.find((words: Words) => {
      if (words.name === name) {
        words.data = newWords;
      }
      else {
          wordsStore.value.push(
          {
            id: wordsStore.value.length + 1,
            name: name,
            data: newWords,
          }
        );
      }
    });
  }

  function findWords(id: number) {
    return new Promise((resolve) => {
      wordsStore.value.forEach((words:Words) => {
        if (words.id === id) {
          resolve(words);
        }
      });
    });
  }
  return { wordsStore, CollectWords, findWords }
})
