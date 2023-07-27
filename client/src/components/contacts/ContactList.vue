<template>
  <q-list>
    <q-item
      v-for="contact in list"
      :key="contact.id"
      class=""
      clickable
      v-ripple
      @click="selectFriend(contact._id)"
    >
      <q-item-section avatar>
        <q-avatar>
          <img
            :src="
              contact.avatar ||
              'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png'
            "
          />
          <!-- <q-badge floating rounded color="green"></q-badge> -->
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ `${contact.fullname}` }}</q-item-label>
        <!-- <q-item-label>{{ contact.lastname }}</q-item-label> -->
        <q-item-label caption lines="1">{{ contact.username }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <!-- <q-icon name="chat_bubble" color="grey" /> -->
        <!-- <q-badge rounded color="green" /> -->
        <q-checkbox v-model="listFriends[contact._id].selected" @update:model-value="handleChangeModel"></q-checkbox>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup>
import { computed, inject, onBeforeMount, ref, watch } from "vue";

const allProps = defineProps({
  list: {
    type: Array,
  },
});
// const listFriends = ref(
//   allProps.list.reduce((a, b) => {
//     a[b._id] = {
//       selected: false,
//       ...b
//     };
//     return a;
//   }, {})
// );
const listFriends = inject('model-friends')

onBeforeMount(()=>{
  listFriends.value = allProps.list.reduce((a, b) => {
    a[b._id] = {
      selected: false,
      ...b
    };
    return a;
  }, {})
})

const selectFriend = (id) => {
  listFriends.value[id].selected = !listFriends.value[id]?.selected;
  dataInput.value.search = ''
};

const handleChangeModel = ()=>{
  console.log('object');
  dataInput.value.search = ''
}

const selectedFriends = computed(()=>Object.values(listFriends.value).filter(x=>x.selected))

const dataInput = inject('contacts-input')

watch(()=>selectedFriends.value, ()=>{
  dataInput.value.members = selectedFriends.value
})

</script>
<style></style>
