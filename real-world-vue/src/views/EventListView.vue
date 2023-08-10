<script setup lang="ts">
import EventService from '@/services/EventService';
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type';
import axios, { type AxiosResponse } from 'axios'

import { useRouter } from 'vue-router'

import { onBeforeRouteUpdate } from 'vue-router';

import {ref, type Ref, watchEffect, computed} from 'vue'
const events : Ref<Array<EventItem>> = ref([])
  const totalEvent = ref<number>(0)
  const props = defineProps({
    page:{
      type: Number,
      required: true
    }
  })
  const eventsPerPage = ref(2)
  const hasNextPage = computed(()=>{
    //first calculate the total page
    const totalPages = Math.ceil(totalEvent.value/3)
    return props.page.valueOf()< totalPages
  })
axios.get<EventItem[]>('http://localhost:3004/events')
.then((response) =>{
  events.value = response.data
})
EventService.getEvent( eventsPerPage.value, props.page).then ((response: AxiosResponse<EventItem[]>) =>{
  events.value = response.data
    totalEvent.value = response.headers['x-total-count']
})

const router = useRouter()

  EventService.getEvent(3, props.page).then((response: AxiosResponse<EventItem[]>) => { 
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
  }).catch(() => {
    router.push({ name: 'NetworkError'})
  })
  onBeforeRouteUpdate((to, from, next)=> {
    const toPage = Number(to.query.page)

    EventService.getEvent(3, toPage).then((response: AxiosResponse<EventItem[]>)=>{
      events.value = response.data
    totalEvent.value = response.headers['x-total-count']
  }).catch(() => {
    router.push({ name: 'NetworkError'})
  })
  })

</script>

<template>
  <main class="events">
    <h1>Events for Good</h1>
    <div class="events-input">
      <label for="events-per-page">Events per page:</label>
      <input type="number" id="events-per-page" v-model.number="eventsPerPage" />
    </div>
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <div class="pagination">
      <RouterLink :to="{name: 'EventList',query: {page: page-1 } }" rel = "prev" v-if="page != 1" id="page-prev">
        Prev Page
      </RouterLink>
    <RouterLink :to="{ name: 'EventList', query: { page: page +1} }" rel="next" v-if="hasNextPage" id="page-next">
      Next Page
    </RouterLink>
    </div>
  </main>
  </template>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display:flex;
  width:290px;
}
.pagination a {
  flex: 1;
  text-decoration:none;
  color: #2c3e50
}
#page-prev{
  text-align:left;
}
#page-next {
  text-align: right;
}
</style>
