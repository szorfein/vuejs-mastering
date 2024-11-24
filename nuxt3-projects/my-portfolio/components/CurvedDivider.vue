<template>
    <div class="divider" />
</template>

<style scoped>
 .divider {
     position: relative;
     height: 70px;
     background: #f7f9fa;
 }
 .divider:before {
     content: '';
     position: absolute;
     bottom: 0;
     width: 100%;
     height: 50px;
     background: #e2e8f0;
     border-radius: 100% 100% 0 0;
 }
</style>
