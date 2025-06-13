<template>
    <section class="search-section">
        <div class="container">
            <div class="row" style="margin-top: 60px; text-align: left !important;">
                <div class="advance-search">
                    <div class="advance-search-wrapper" style="">
                        <div class="query-input">
                            <UPopover>
                                <UButton class="button" color="neutral" variant="subtle" icon="i-lucide-calendar">
                                    <template v-if="modelValue.start">
                                        <template v-if="modelValue.end">
                                            {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }} - {{
                                                df.format(modelValue.end.toDate(getLocalTimeZone())) }}
                                        </template>

                                        <template v-else>
                                            {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
                                        </template>
                                    </template>
                                    <template v-else>
                                        Pick a date
                                    </template>
                                </UButton>

                                <template #content>
                                    <UCalendar v-model="modelValue" :is-date-disabled="isDateDisabled" class="p-2" :number-of-months="2" range />
                                </template>
                            </UPopover>
                        </div>
                        <div class="query-input">
                            <div class="query-input-position">
                                <select v-model="numberOfPerson">
                                    <option value="" selected>All Room</option>
                                    <option value="1">1 Person</option>
                                    <option value="2">2 Person</option>
                                    <option value="3">3 Person</option>
                                    <option value="4">4 Person</option>
                                    <option value="5">5 Person</option>
                                    <option value="6">6 Person</option>
                                    <option value="7">7 Person</option>
                                </select>
                            </div>
                        </div>
                        <button class="btn-style button" @click="searchRooms">
                            <Icon name="oui:search"></Icon> Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="sort-section">
        <div class="container">
            <div class="row">
                    <div class="sort-wrapper">
                        <div class="sort-title">
                            <h1>Room List</h1>
                            <p>Find the perfect room for your stay</p>
                        </div> 
                        <div class="sort-options">
                            <span>Sort by:</span>
                            <select @change="onSortChange($event.target.value)">
                                <option value="default">Default</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="size_asc">Size: Small to Large</option>
                                <option value="size_desc">Size: Large to Small</option>
                            </select>
                        </div>
                    </div>
            </div>
        </div>
    </section>
    <section class="room-section">
        <div class="row gy-5">
            <div class="container">
                <div class="room-wrapper">
                    <div v-if="roomStore.loading">Loading...</div>
                    <div v-else v-for="room in roomStore.rooms" class="room-card is-style-four">
                        <div class="room-card-top">
                            <div class="room-card-image">
                                <div>
                                    <img :src="room.image" :alt="room.room_name">
                                </div>
                            </div>
                        </div>
                        <div class="room-card-meta">
                            <div class="room-card-title">
                                <h1>{{ room.room_name }}</h1>
                                <h5>{{ room.hotel_name }}</h5>
                            </div>
                            <div class="room-card-meta-info">
                                <span>
                                    <Icon name="icon-park-outline:factory-building"></Icon>
                                    Size: {{ room.size }} m<sup>2</sup>
                                </span>
                                <span>
                                    <Icon name="icon-park-outline:people"></Icon>
                                    Person: {{ room.number_persion }}
                                </span>
                            </div>
                            <p class="short_desc">
                                {{ room.short_desc }}
                            </p>
                            <div class="room-card-meta-info">
                                <ul>
                                    <li v-for="(convenient, index) in room.convenient" :key="index">
                                        <Icon name="icon-park-outline:paperclip"></Icon>
                                        {{ convenient }}
                                    </li>
                                </ul>
                            </div>
                            <div class="room-price-tag">
                                <span class="d-block">
                                    <Icon name="icon-park-outline:paper-money-two"></Icon>
                                    ${{ room.price }} / Night
                                </span>
                            </div>
                            <button class="room-card-link button">BOOK ROOM</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="pagination">
        <button
            class="page-link"
            :disabled="page === 1"
            @click="goToPage(page - 1)"
        >
            <Icon name="icon-park-outline:double-left"></Icon>
        </button>

        <span>Page {{ page }} / {{ totalPages }}</span>

        <button
            class="page-link"
            :disabled="page === totalPages"
            @click="goToPage(page + 1)"
        >
            <Icon name="icon-park-outline:double-right"></Icon>
        </button>
    </section>
</template>

<script setup lang="ts">

import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { onMounted } from "vue";
import { useRoomStore } from "@/stores/room";

const df = new DateFormatter('en-US', {
    dateStyle: 'medium'
})

// import { useRoom } from '@/composables/useRoom';

// const { saveRooms } = useRoom()

// import rooms from '@/data/rooms.json'
// // console.log(rooms.rooms);

// await saveRooms(rooms.rooms)

const today = new Date()

const modelValue = shallowRef({
    start: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()),
    end: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate() + 1)
})

const isDateDisabled = (date: Date) => {
  const current = new Date(date)
  current.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  return current < today
}

const numberOfPerson = shallowRef(1);

const roomStore = useRoomStore();
const { page, totalPages } = storeToRefs(roomStore)

onMounted(() => {
    roomStore.fetchRooms();
});

const goToPage = (newPage: number) => {
  roomStore.fetchRooms(numberOfPerson.value, newPage)
}

const searchRooms = () => {
  roomStore.fetchRooms(numberOfPerson.value, 1);
}

const onSortChange = (sortOption: string) => {
  if (sortOption === 'default') {
    roomStore.orderBy = null
    roomStore.order = null
  } else {
    const [field, direction] = sortOption.split('_')
    roomStore.orderBy = field
    roomStore.order = direction === 'asc' ? 'asc' : 'desc'
  }
  roomStore.fetchRooms(1) // reset page
}

</script>