<template>
    <TopBar title="Manage Vacation Packages" />
    <h1>Catalog</h1>
    <div class="p-col-12">
        <Button label="Add Vacation Package" @click="displayCatalog = true" />
        <Dialog header="Add Vacation Package" v-model:visible="displayCatalog">
            <CatalogForm
                @catalog-form-close="displayCatalog = false;
                getCatalog();"
            />
        </Dialog>
    </div>

    <div class="p-col-12">
        <Card v-for="c of catalog" :key="c.id">
            <template #header>
                <img :alt="c.description" :src="c.image_url" />
            </template>
            <template #title>{{ c.name }}</template>
            <template #content>{{ c.description }}</template>
            <template #footer>
                <Button
                    icon="pi pi-times"
                    label="Delete"
                    class="p-button-secondary"
                    @click="deleteCatalogItem(c.id)"
                />
            </template>
        </Card>
    </div>
</template>

<script>
 import axios from "axios";
 import { APIURL } from "@/constants";
 import CatalogForm from "@/components/CatalogForm.vue";
 import TopBar from "@/components/TopBar.vue";

 export default {
     name: 'Catalog',
     components: {
         CatalogForm,
         TopBar,
     },
     data() {
         return {
             catalog: [],
             displayCatalog: false
         };
     },
     methods: {
         async getCatalog() {
             const { data } = await axios.get(`${APIURL}/catalog`);
             this.catalog = data;
         },
         async deleteCatalogItem(id) {
             await axios.delete(`${APIURL}/catalog/${id}`);
             this.getCatalog();
         }
     },
     beforeMount() {
         this.getCatalog();
     }
 };
</script>
