<script setup>
import { Line, Pie } from 'vue-chartjs'
const state = reactive({
    line: {
        labels: contract.weekDays,
        datasets: [
            {
                label: 'آمار بازدید',
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                data: [40, 39, 10, 40, 39, 80, 40],
                tension: 0.1
            }
        ]
    },
    pie: {
        labels: contract.countries,
        datasets: [
            {
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', '#DD1B16'],
                data: [40, 20, 80, 10],
            }
        ]
    }
})
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
})
</script>
<template>
    <div>
        <Line :data="state.line" :options="chartOptions" />
    </div>
    <div>
        <Pie :data="state.pie" :options="chartOptions" />
    </div>
</template>