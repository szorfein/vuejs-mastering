<template>
    <TopBar title="Manage Bookings" />
    <div class="p-col-12">
        <h1>Bookings</h1>
    </div>
    <div class="p-col-12">
        <Card v-for="b of bookings" :key="b.id">
            <template #title>{{ b.name }}</template>
            <template #content>
                <p>Address: {{ b.address }}</p>
                <p>Description: {{ b.description }}</p>
                <p>Start date: {{ b.start_date }}</p>
                <p>End date: {{ b.end_date }}</p>
            </template>
            <template #footer>
                <Button
                    icon="pi pi-times"
                    label="Cancel"
                    class="p-button-secondary"
                    @click="deleteBooking(b.id)"
                />
            </template>
        </Card>
    </div>
</template>

<script>
 import axios from "axios"
 import { APIURL } from '../constants'
 import TopBar from "@/components/TopBar.vue"

 export default {
     name: "Bookings",
     components: {
         TopBar,
     },
     data() {
         return {
             bookings: []
         };
     },
     methods: {
         async getBookings() {
             const { data } = await axios.get(`${APIURL}/bookings`);
             this.bookings = data;
         },
         async deleteBooking(id) {
             await axios.delete(`${APIURL}/bookings/${id}`);
             this.getBookings();
         }
     },
     beforeMount() {
         this.getBookings();
     }
 };
</script>
