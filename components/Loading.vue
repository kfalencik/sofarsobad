<template>
    <div class="loading">
        <img :src="require('@/assets/images/loading.gif')" alt="Loading">
    </div>
</template>

<style lang="scss" scoped>
    .loading {
        margin-top: 35px;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
    }
</style>