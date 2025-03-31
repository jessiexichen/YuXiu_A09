import { defineStore } from 'pinia'
import { ref } from 'vue';
import type { Voice } from '@/types/voice';

export const useCollectionStore = defineStore('collection', () => {
    // 声音数据
    const voices = ref<Voice[]>([
      {
        id: 1,
        name: "声音1",
        date: "2025/2/25",
        group: "分组1",
        status: "success",
        file: null,
        description: "总是明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我……",
      },
    ]);

    // 分组列表
    const groups = ref<string[]>(["分组1", "分组2"]);

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
    console.log(voices.value);
    console.log(groups.value);

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
      console.log(voices.value);
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
