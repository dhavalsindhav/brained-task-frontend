<template>
  <h2>{{ isEdit?'Edit':'Create' }} User</h2>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="firstName" label="First Name" name="firstName">
      <a-input v-model:value="formState.firstName" />
    </a-form-item>
    <a-form-item ref="lastName" label="Last Name" name="lastName">
      <a-input v-model:value="formState.lastName" />
    </a-form-item>
    <a-form-item ref="email" label="Email" name="email">
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item ref="avatar" label="Avatar" name="avatar"> 
      <a-upload
      v-model:file-list="fileList"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :customRequest="uploadFiles"
    >
    <img v-if="formState.avatar" :src="`http://localhost:3000${formState.avatar}`" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">{{isEdit?'Update':'Create'}}</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
  <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
</template>
<script setup>
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { notification } from 'ant-design-vue';
import { reactive, ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id);
const isEdit = id.value !== undefined;
const formRef = ref();
const labelCol = {
  span: 5,
};
const wrapperCol = {
  span: 13,
};
const formState = reactive({
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
});
const rules = {
  firstName: [
    {
      required: true,
      message: 'Please input First Name',
      trigger: 'change',
    },
    {
      min: 3,
      max: 10,
      message: 'Length should be 3 to 5',
      trigger: 'blur',
    },
  ],
  lastName: [
    {
      required: true,
      message: 'Please input Last Name',
      trigger: 'change',
    },
    {
      min: 3,
      max: 10,
      message: 'Length should be 3 to 5',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: 'Please input Email',
      trigger: 'change',
    },
    {
      type: 'email',
      message: 'Please input valid Email',
      trigger: 'blur',
    },
  ],
};
const store =useUserStore();
if(isEdit){
  store.fetchUser(id.value).then((res) => {
    if (res.status==200) {
      formState.firstName = res.data.firstName;
      formState.lastName = res.data.lastName;
      formState.email = res.data.email;
      formState.avatar = res.data.avatar;
    }
  });
}
const fileList = ref([]);

function uploadFiles(e) {
  formState.avatar = e.file;
}
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    console.log('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    console.log('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      if (isEdit) {
        const formData = new FormData();
        formData.append('firstName', formState.firstName);
        formData.append('lastName', formState.lastName);
        formData.append('email', formState.email);
        formData.append('avatar', formState.avatar);
        store.updateUser(id.value, formData).then((res) => {
          if (res.status==200) {
            notification.success({
              message: 'Success',
              description: 'User Updated Successfully',
            });
            router.push({ name: 'user' });
          }
        });
      } else {
        const formData = new FormData();
      formData.append('firstName', formState.firstName);
      formData.append('lastName', formState.lastName);
      formData.append('email', formState.email);
      formData.append('avatar', formState.avatar);
      store.createUser(formData).then((res) => {
        if (res.status==200) {
          notification.success({
            message: 'Success',
            description: 'User Created Successfully',
          });
          router.push({ name: 'user' });
          resetForm();
        }
      });
      }
      
    })
    .catch(error => {
      console.log('error', error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>