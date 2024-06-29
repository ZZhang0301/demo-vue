<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-4xl p-4 bg-blue-100 rounded-lg shadow">
      <h1 class="text-3xl font-bold text-center my-6">同学列表</h1>
      <div class="flex justify-end mb-4">
        <button @click="showFlag = true" class="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">新增</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-blue-500 text-white">
            <tr>
              <th class="py-3 px-6">序号</th>
              <th class="py-3 px-6">学号</th>
              <th class="py-3 px-6">姓名</th>
              <th class="py-3 px-6">年龄</th>
              <th class="py-3 px-6 text-center">操作</th>
            </tr>
          </thead>
          <tbody class="bg-blue-50">
            <tr v-for="(item, index) in list" :key="item.id" class="border-b border-gray-200">
              <td class="py-4 px-6">{{ index + 1 }}</td>
              <td class="py-4 px-6">{{ item.id }}</td>
              <td class="py-4 px-6">{{ item.userName }}</td>
              <td class="py-4 px-6">{{ item.age }}</td>
              <td class="py-4 px-6 text-center">
                <button @click="editUser(index)" class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">编辑</button>
                <button @click="deleteUser(index)" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ml-2">删除</button>
                <button @click="getYourName(item.id)" class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded ml-2">问名字</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="showFlag" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 class="text-2xl text-center mb-4">{{ isEdit ? '编辑同学' : '新增同学' }}</h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <label class="w-1/4 text-right text-gray-700">学号</label>
              <input type="text" v-model="studyNum" class="flex-1 p-2 border border-gray-300 rounded" />
            </div>
            <div class="flex items-center space-x-4">
              <label class="w-1/4 text-right text-gray-700">姓名</label>
              <input type="text" v-model="name" class="flex-1 p-2 border border-gray-300 rounded" />
            </div>
            <div class="flex items-center space-x-4">
              <label class="w-1/4 text-right text-gray-700">年龄</label>
              <input type="text" v-model="year" class="flex-1 p-2 border border-gray-300 rounded" />
            </div>
            <div class="flex justify-end space-x-4 mt-6">
              <button @click="showFlag = false" class="bg-white hover:bg-gray-100 text-blue-500 border border-blue-500 px-4 py-2 rounded">取消</button>
              <button @click="submitFn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';

let showFlag = ref(false);
let isEdit = ref(false);
let curIdx = ref(0);
let studyNum = ref('');
let name = ref('');
let year = ref('');
let list = reactive([]);

// 在组件加载时从 localStorage 加载数据
onMounted(() => {
  const savedList = localStorage.getItem('studentList');
  if (savedList) {
    const parsedList = JSON.parse(savedList);
    if (Array.isArray(parsedList)) {
      list.push(...parsedList.filter(item => item && item.id != null && item.userName && item.age != null));
    }
  }
});

// 删除操作
const deleteUser = index => {
  list.splice(index, 1);
  saveList();
};

// 编辑操作
const editUser = index => {
  isEdit.value = true;
  curIdx.value = index;
  const item = list[index];
  studyNum.value = item.id.toString();
  name.value = item.userName;
  year.value = item.age.toString();
  showFlag.value = true;
};

// 提交操作（包括编辑和新增）
const submitFn = () => {
  const id = parseInt(studyNum.value);
  // 判断是编辑还是新增模式
  if (isEdit.value) {
    // 编辑模式下，只有在学号变更时才需要检查是否重复
    const existingStudent = list.find((item, idx) => item.id === id && idx !== curIdx.value);
    if (existingStudent) {
      alert('学号已存在，请输入唯一的学号！');
      return;
    }
    list[curIdx.value] = {
      id: id,
      userName: name.value,
      age: parseInt(year.value)
    };
  } else {
    // 新增模式下，直接检查是否有任何学生已使用该学号
    if (list.some(item => item.id === id)) {
      alert('学号已存在，请输入唯一的学号！');
      return;
    }
    const newItem = {
      id: id,
      userName: name.value,
      age: parseInt(year.value)
    };
    list.unshift(newItem);
  }
  saveList();
  resetForm();
};

// 保存列表到 localStorage
const saveList = () => {
  localStorage.setItem('studentList', JSON.stringify(list));
};

// 重置表单
const resetForm = () => {
  studyNum.value = '';
  name.value = '';
  year.value = '';
  showFlag.value = false;
  isEdit.value = false;
};

// 获取姓名
const getYourName = id => {
  const student = list.find(item => item.id === id);
  if (student) {
    alert(student.userName);
  } else {
    alert('学生未找到');
  }
};
</script>

<style scoped>
.overflow-x-auto {
  display: flex;
  justify-content: center;
}
</style>
