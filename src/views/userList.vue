<template>
<div>
  <h1>User List</h1>
  <div>
    <div class="table_topbar">
      <a-input-search placeholder="Search" style="width: 200px" v-model="params.search" @change="searchText" />
      <a-button type="primary" @click="addUser">Add</a-button>
    </div>
    <a-table :columns="columns" :data-source="users" row-key="id" :pagination="pagination" @change="handleTableChange" bordered >
    <template #bodyCell="{ column,record }">
      <template v-if="column.dataIndex === 'name'">
        {{ record.firstName }} {{ record.lastName }}
      </template>
      <template v-else-if="column.dataIndex === 'avatar'">
        <a-avatar :src="`http://localhost:3000${record.avatar}`" />
      </template>
      <template v-else-if="column.key === 'action'">
        <a-button type="link" @click="editUser(record.id)">Edit</a-button>
        <a-button type="link" @click="deleteUser(record.id)">Delete</a-button>
      </template>
    </template>
    </a-table>
  </div>
</div>
</template>

<script setup>
import {  onMounted, computed,defineExpose } from 'vue';
import { notification, Table as ATable } from 'ant-design-vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const store =useUserStore();
const router = useRouter();
const users = computed(() => store.getusers);
const columns = [
  { title: 'Id', dataIndex: 'id', key: 'id' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {title:'Avatar', dataIndex:'avatar', key:'avatar'},
  { title: 'Action', key: 'action'},
];

const pagination = {
  current: 1,
  pageSize: 5,
  total: users.length,
  showSizeChanger: true,
  showTotal: (total) => `Total ${total} Users`,
};

const params={
    page:pagination.current, 
    limit:pagination.pageSize,
    search:null,
  }

async function fetchList(params = {}){
   await store.fetchUsersList(params).then((res) => {
    if (res.status==200) {
      pagination.current = res.data.currentPage;
      pagination.total = res.data.totalUsers;
    }
  });
}

const deleteUser = (id) => {
  store.deleteUser(id).then((res) => {
    if (res.status == 200) {
      notification.success({
        message: 'Success',
        description: 'User deleted successfully',
      });
      refresh()
    }
  });
};

const editUser = (id) => {
  router.push({ name: 'edit-user', params: { id } });
};

const addUser = () => {
  router.push({ name: 'create-user' });
};

const searchText = (e) => {
  params.search = e.target.value;
  refresh()
};

const handleTableChange = (pag) => {
  fetchList({
    limit: pag.pageSize,
    page: pag.current,
  });
};

function refresh() {
  fetchList(params);
}

defineExpose({
  refresh,
});

onMounted(() => {
  refresh()
});
</script>

<style scoped>
</style>