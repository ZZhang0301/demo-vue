<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-4xl p-4 bg-blue-100 rounded-lg shadow">
      <h1 class="text-3xl font-bold text-center my-6">同学列表</h1>
      <div class="flex justify-end mb-4">
        <a-button type="primary" @click="showFlag = true">新增</a-button>
      </div>
      <a-table :columns="columns" :dataSource="list" :pagination="false" rowKey="id" bordered>
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
          <template v-else-if="['id', 'userName', 'age'].includes(column.dataIndex)">
            <div>
              <a-input
                v-if="editableData[record.id]"
                v-model:value="editableData[record.id][column.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else>
                {{ record[column.dataIndex] }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span v-if="editableData[record.id]">
                <a-typography-link @click="save(record.id)">保存</a-typography-link>
                <a-popconfirm title="确定取消?" @confirm="cancel(record.id)">
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="edit(record.id)">编辑</a>
                <a @click="deleteUser(record.id)" style="margin-left: 8px;">删除</a>
                <a-popover :content="record.userName" trigger="click">
                  <a-button type="primary" class="ml-2">问名字</a-button>
                </a-popover>
              </span>
            </div>
          </template>
        </template>
      </a-table>

      <a-modal v-model:visible="showFlag" title="新增同学" @ok="submitFn" @cancel="resetForm">
        <a-input v-model:value="studyNum" placeholder="学号" style="margin-bottom: 8px;" />
        <a-input v-model:value="name" placeholder="姓名" style="margin-bottom: 8px;" />
        <a-input v-model:value="year" placeholder="年龄" />
      </a-modal>
    </div>
  </div>
</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import { reactive, ref, onMounted } from 'vue';

let showFlag = ref(false);
let isEdit = ref(false);
let curIdx = ref(0);
let studyNum = ref('');
let name = ref('');
let year = ref('');
let list = reactive([]);
const editableData = reactive({});

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    customRender: ({ index }) => index + 1,
    width: '10%',
  },
  {
    title: '学号',
    dataIndex: 'id',
    width: '20%',
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '25%',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: '15%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '30%',
  },
];

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
const deleteUser = id => {
  const index = list.findIndex(item => item.id === id);
  if (index !== -1) {
    list.splice(index, 1);
    saveList();
  }
};

// 编辑操作
const edit = id => {
  isEdit.value = true;
  curIdx.value = id;
  const item = list.find(item => item.id === id);
  if (item) {
    editableData[id] = cloneDeep(item);
  }
};

// 提交操作（包括编辑和新增）
const submitFn = () => {
  const id = parseInt(studyNum.value);
  // 判断是编辑还是新增模式
  if (isEdit.value) {
    const existingStudent = list.find((item, idx) => item.id === id && idx !== curIdx.value);
    if (existingStudent) {
      alert('学号已存在，请输入唯一的学号！');
      return;
    }
    const index = list.findIndex(item => item.id === curIdx.value);
    if (index !== -1) {
      list[index] = {
        id: id,
        userName: name.value,
        age: parseInt(year.value)
      };
    }
  } else {
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

// 取消编辑
const cancel = id => {
  delete editableData[id];
};

// 保存编辑
const save = id => {
  Object.assign(list.find(item => item.id === id), editableData[id]);
  delete editableData[id];
  saveList();
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
