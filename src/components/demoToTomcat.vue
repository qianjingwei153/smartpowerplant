<template>

    <table align='center' border='1' cellspacing='0'>
        <tr>
            <td>id</td>
            <td>name</td>
        </tr>
        <tr v-for="c in categroy" v-bind:key="c.id">
            <td>{{c.id}}</td>
            <td>{{c.name}}</td>
        </tr>
    </table>
</template>

<script>/* eslint-disable */

    import axios from "axios";

    export default {
        name: "demoToTomcat",
        data(){
            return{

                categroy:[{
                    id:1,
                    name:'categroy1',
                },
                    {
                       id:2,
                       name:'categroy2',
                    }
                ]
            }
        },
        created() {
            axios.get("http://localhost:8080/categoryController/test").then((res) => {
                this.categroy = res.data
            })
        }
    }
</script>

<style scoped>

</style>
