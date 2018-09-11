<template>
    <div id="message">
        <span>This' {{ $route.params.id }}</span>
        <el-row v-for="item in todoBox" :key="item.id">{{ item.msg }}</el-row>
    </div>
</template>

<style scoped>

</style>

<script>
    export default {
        data: function() {
            return {
                todoBox: [
                    {}
                ]
            }
        }
    }
</script>