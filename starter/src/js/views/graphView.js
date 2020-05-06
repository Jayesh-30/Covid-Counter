import { elements, formatNumber, capitalize, nFormatter } from './base';

import Chart from 'chart.js';

export const changeDark = () => {
    elements.country.classList.add('dark');
};
export const changeLight = () => {
    elements.country.classList.remove('dark');
};

export const renderResults = (country, dates) => {
    const markup = ` 
    <div class="buttons__go-back">
    <button class="button__go-back">
        <ion-icon name="arrow-back-outline" class="go-back__icon"></ion-icon>
        <span>Go Back</span>
    </button>
    </div>
    <div class="graph">
        <div class="row">

            <div class="col span-1-of-2">
                <div class="graph--Confirmed">
                    <canvas id="graph__bar--Confirmed">
                    </canvas>
                </div>
            </div>
            <div class="col span-1-of-2">
                <div class="graph--Deaths">
                    <canvas id="graph__bar--Deaths">
                    </canvas>
                </div>
            </div>
            
        </div>
        <div class="row">
            <div class="col span-1-of-3">
                <div class="graph--pie">
                    <canvas id="graph__pie" width="100" height="100">
                    </canvas>
                    <div class="graph--pie__content" ></div>
                </div>
            </div>
            <div class="col span-2-of-3">
                <div class="graph--DailyNew">
                    <canvas id="graph__bar--DailyNew">
                    </canvas>
                </div>
            </div>
        </div>
    </div>
    `;
    elements.country.insertAdjacentHTML('afterbegin', markup);

    const { Confirmed, Active, Recovered, Deaths, dates: newDates } = getData(country, dates);

    // Confirmed Line Graph
    generateLine(Confirmed, newDates, 'Confirmed');
    // Deaths Line Graph
    generateLine(Deaths, newDates, 'Deaths');
    // Need only latest info
    generatePieChart(country[country.length - 1]);
    // Daily New Bar Graph
    const dailyNew = getDailyActive(Confirmed);
    generateBar(dailyNew, newDates.slice(1,newDates.length), 'DailyNew');

    console.log(country);
    console.log(dates);
};

const getDailyActive = (array) => {
    const newArray = [];
    for (let index = 1; index < array.length; index++) {
        const prev = array[index-1];
        const cur = array[index];
        if(cur-prev >= 0)
        newArray.push(cur-prev);
        else
        newArray.push(0);
    }
    return newArray;
};
const getData = (country, dates) => {
    const Confirmed = [];
    const Active = [];
    const Recovered = [];
    const Deaths = [];

    dates.forEach((date) => {
        const recent = country.find((cur) => cur.Date == date);
        Confirmed.push(recent.Confirmed);
        Active.push(recent.Active);
        Recovered.push(recent.Recovered);
        Deaths.push(recent.Deaths);
    });

    const curDate = new Date().getFullYear();
    dates = dates.map((cur) => cur.replace(`/${curDate}`, ''));

    return { Confirmed, Active, Recovered, Deaths, dates };
};

const generateBar = (dataCases, dates, typeOfData) => {
    let ele, col, col_light;
    if (typeOfData === 'DailyNew') {
        ele = 'graph__bar--DailyNew';
        col = '#c97c0d';
        col_light = 'rgb(201, 124, 13,0.8)';
    }
    const ctx = document.getElementById(ele).getContext('2d');
    const type = 'bar';
    const data = {
        labels: dates,
        datasets: [
            {
                label: typeOfData,
                data: dataCases,
                borderColor: col,
                hoverBorderColor: 'rgba(255,255,255,0.6)',
                borderDash: [],
                borderJoinStyle: 'round',
                borderWidth: '2',
                hoverBorderWidth: '4',
                backgroundColor: col_light,
                barPercentage : 0.8
            },
        ],
    };

    const options = {
        maintainAspectRatio: true,
        aspectRatio: 1.85,
        title: {
            display: false,
            fontColor: '#eee',
        },
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
                boxWidth: 15,
                fontColor: '#eee',
                fontSize: 14,
                padding: 10,
            },
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        },
        tooltips: {
            enabled: true,
            titleSpacing: 3,
            titleFontColor: '#777',
            bodySpacing: 3,
            caretPadding: 3,
            xPadding: 8,
            borderWidth: 1,
            borderColor: col,
            bodyFontColor: col_light,
            callbacks: {
                label: function (tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label;
                    return `${label} : ${formatNumber(tooltipItem.yLabel)}`;
                },
            },
        },
        animation: {
            duration: 2000,
        },
        scales: {
            offset : true,
            yAxes: [
                {
                    ticks: {
                        maxTicksLimit: 8,
                        fontColor: '#ccc',
                        fontSize: 10,
                        lineHeight: 1.45,
                        padding: 12.5,
                        callback: function (value, index, values) {
                            return nFormatter(value);
                        },
                    },

                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        tickMarkLength: 0,
                        zeroLineWidth: 1,
                        zeroLineColor: 'rgba(255,255,255,0.3)',
                        offsetGridLines: false,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        maxTicksLimit: 8,
                        fontColor: '#ccc',
                        fontSize: 10,
                        padding: 12.5,
                    },
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        tickMarkLength: 0,
                        zeroLineWidth: 1,
                        zeroLineColor: 'rgba(255,255,255,0.3)',
                        offsetGridLines: true,
                    },
                },
            ],
        },
    };

    const barChart = new Chart(ctx, {
        type,
        data,
        options,
    });
};

const generateLine = (dataCases, dates, typeOfData) => {
    let ele, col, col_light;
    if (typeOfData === 'Confirmed') {
        ele = 'graph__bar--Confirmed';
        col = '#007bff';
        col_light = 'rgba(0, 123, 255, 0.65)';
    }
    if (typeOfData === 'Deaths') {
        ele = 'graph__bar--Deaths';
        col = '#dc3545';
        col_light = 'rgba(220, 53, 70, 0.65)';
    }

    const ctx = document.getElementById(ele).getContext('2d');
    const type = 'line';
    const data = {
        labels: dates,
        datasets: [
            {
                label: typeOfData,
                data: dataCases,
                borderColor: col,
                borderDash: [],
                borderJoinStyle: 'miters',
                borderWidth: '2',
                backgroundColor: col_light,
                pointRaduis: 5,
                pointHoverRaduis: 8,

                pointBorderColor: 'rgba(0,0,0,0.2)',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,

                pointHitRadius: 4,
            },
        ],
    };

    const options = {
        maintainAspectRatio: true,
        aspectRatio: 1.6,
        title: {
            display: false,
            fontColor: '#eee',
        },
        legend: {
            display: true,
            position: 'top',
            align: 'center',
            labels: {
                boxWidth: 15,
                fontColor: '#eee',
                fontSize: 14,
                padding: 10,
            },
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        },
        tooltips: {
            enabled: true,
            titleSpacing: 3,
            titleFontColor: '#777',
            bodySpacing: 3,
            caretPadding: 3,
            xPadding: 8,
            borderWidth: 1,
            borderColor: col,
            bodyFontColor: col_light,
            callbacks: {
                label: function (tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label;
                    return `${label} : ${formatNumber(tooltipItem.yLabel)}`;
                },
            },
        },
        animation: {
            duration: 2000,
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        maxTicksLimit: 8,
                        fontColor: '#ccc',
                        fontSize: 10,
                        lineHeight: 1.45,
                        padding: 12.5,
                        callback: function (value, index, values) {
                            return nFormatter(value);
                        },
                    },

                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        tickMarkLength: 0,
                        zeroLineWidth: 1,
                        zeroLineColor: 'rgba(255,255,255,0.3)',
                        offsetGridLines: false,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        maxTicksLimit: 8,
                        fontColor: '#ccc',
                        fontSize: 10,
                        padding: 12.5,
                    },
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        tickMarkLength: 0,
                        zeroLineWidth: 1,
                        zeroLineColor: 'rgba(255,255,255,0.3)',
                        offsetGridLines: false,
                    },
                },
            ],
        },
    };

    const barChart = new Chart(ctx, {
        type,
        data,
        options,
    });
};

const generatePieChart = (country) => {
    const ctx = document.getElementById('graph__pie').getContext('2d');
    const type = 'doughnut';
    const data = {
        labels: ['Active', 'Recovered', 'Deaths'],
        datasets: [
            {
                label: '# of Cases',
                data: [country.Active, country.Recovered, country.Deaths],
                backgroundColor: ['#5c1ac3', '#0ba360 ', '#e7515a'],
                hoverBackgroundColor: ['#742de3', '#3cba92', '#ed7e84'],
                borderColor: ['#0e1726', '#0e1726', '#0e1726'],
                hoverBorderColor: ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)'],
                borderWidth: 5,
                hoverBorderWidth: 3,
                borderAlign: 'center',
                weight: 1,
            },
        ],
    };
    const options = {
        cutoutPercentage: 77.5,
        rotation: -0.5 * Math.PI,
        circumference: 2 * Math.PI,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 7.5,
                bottom: 7.5,
            },
        },
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            fullWidth: true,
            labels: {
                boxWidth: 15,
                fontColor: '#eee',
                fontSize: 14,
                padding: 10,
            },
            onHover: function (event, data) {
                const type = data.text;
                setContent(country, type);
            },
            onLeave: function () {
                setContent(country);
            },
        },
        animation: {
            duration: 2000,
        },
        tooltips: {
            enabled: true,
            bodySpacing: 10,
            caretPadding: 3,
            xPadding: 8,
            borderWidth: 1,
            backgroundColor: '#000',
            callbacks: {},
        },
    };

    const pieChart = new Chart(ctx, {
        type,
        data,
        options,
    });

    setContent(country);
};

const setContent = (country, type = 'Confirmed') => {
    document.querySelector('.graph--pie__content').innerHTML = `
    <h3>
        ${type === 'Confirmed' ? 'Overview' : type}
    </h3> 
    <p>
        ${formatNumber(country[type])}
    </p>`;
};
