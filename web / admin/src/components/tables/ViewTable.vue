<template>
  <div>
    <Table>
      <template v-slot:thead>
        <tr>
          <th>Category Name</th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
        </tr>
      </template>
    </Table>

    <Table>
      <template v-slot:thead>
        <tr>
          <th>Comment Text</th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-for="comment in comments" :key="comment.id">
          <td>{{ comment.text }}</td>
        </tr>
      </template>
    </Table>

    <Table>
      <template v-slot:thead>
        <tr>
          <th>Post Title</th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
        </tr>
      </template>
    </Table>

    <Table>
      <template v-slot:thead>
        <tr>
          <th>Tag Name</th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-for="tag in tags" :key="tag.id">
          <td>{{ tag.name }}</td>
        </tr>
      </template>
    </Table>

    <Table>
      <template v-slot:thead>
        <tr>
          <th>User Name</th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from './Table.vue';

interface Category {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  text: string;
}

interface Post {
  id: number;
  title: string;
}

interface Tag {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

const categories = ref<Category[]>([]);
const comments = ref<Comment[]>([]);
const posts = ref<Post[]>([]);
const tags = ref<Tag[]>([]);
const users = ref<User[]>([]);

onMounted(() => {
  fetchCategories();
  fetchComments();
  fetchPosts();
  fetchTags();
  fetchUsers();
});

async function fetchCategories() {
  try {
    const response = await fetch('/api/categories');
    const data = await response.json();
    categories.value = data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchComments() {
  try {
    const response = await fetch('/api/comments');
    const data = await response.json();
    comments.value = data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchPosts() {
  try {
    const response = await fetch('/api/posts');
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchTags() {
  try {
    const response = await fetch('/api/tags');
    const data = await response.json();
    tags.value = data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error(error);
  }
}
</script>

<script>
import Table from './Table.vue';

export default {
  components: {
    Table,
  },
};
</script>