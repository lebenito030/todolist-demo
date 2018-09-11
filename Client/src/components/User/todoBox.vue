<template>
    <div id="message">
        <span>This' {{ $route.params.id }}</span>
        <el-row>{{ todoBox.msg }}</el-row>
    </div>
</template>

<style scoped>

</style>

<script>
    export default {
        data: function() {
            return {
                todoBox: [
                    
                ]
            }
        }
    }
</script>