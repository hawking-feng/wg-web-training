import moment from 'moment';
import accounting from 'accounting';
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);
moment.locale('zh-cn');

const currentDateRange = {start: '2018-07-15', end: '2018-07-22'};
const lastDateRange = {start: '2018-07-08', end: '2018-07-15'};
const metric_hook_formats = {
    "tc:session_duration": (seconds) => {
        return moment.duration(seconds, 'seconds').format("hh:mm:ss", {trim: false});
    },
    "tc:course_session_duration": (seconds) => {
        return moment.duration(seconds, 'seconds').format("hh:mm:ss", {trim: false});
    },
    "tc:course_completeness": (completeness) => {
        return completeness.toFixed(2);
    },
    "tc:page_view": (pv) => {
        return accounting.formatNumber(pv);
    },
    "tc:unique_visitor": (uv) => {
        return accounting.formatNumber(uv);
    },
    "tc:activeness": (point) => {
        return accounting.formatNumber(point);
    },
    "tc:instructor_activeness": (point) => {
        return accounting.formatNumber(point);
    },
    "tc:student_activeness": (point) => {
        return accounting.formatNumber(point);
    },
};
const dateFormat = {
    "hour": "YYYY.MM.DD HH:mm",
    "day": "YYYY.MM.DD",
    "month": "YYYY.MM",
    "year": "YYYY",
};
const deviceDimension = "tc:device";
const category = ['date', '加总', 'Web', 'App'];
const metricTitle = {
    "tc:page_view": "总访问量",
    "tc:unique_visitor": "总访客数",
    "tc:session_duration": "总访问时长"
};

export const lineChartDefaultOptions = {
    color: ["#ff7800",
        "#4892f6",
        "#6fd148"],
    tooltip: {
        trigger: "axis",
        padding: 10,
        backgroundColor: "#ffffff",
        textStyle: {
            color: "#737373",
        },
        extraCssText: "font-size: 12px; opacity: 0.8; min-width: 156px; display: flex; padding:12px; box-shadow: #E8E8E8 0px 0px 10px;"
    },
    grid: {
        left: "20",
        right: "30",
        top: "15",
        bottom: "0",
        containLabel: true
    },
    legend: {show: false},
    xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: "#d8d8d8"
            }
        },
        axisLabel: {
            color: "#737373",
            margin: 20,
            interval: 'auto',
        },
    },
    yAxis: {
        axisLine: {
            show: false,
        },
        axisLabel: {
            color: "#737373",
            margin: 10,
        },
        axisTick: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: "#d8d8d8",
                type: "dashed"
            },
        },
    },
    series: [
        {type: "line", showSymbol: false, symbol: "circle"},
        {type: "line", showSymbol: false, symbol: "circle"},
        {type: "line", showSymbol: false, symbol: "circle"},
    ]
};

const userVisitDetailParams = {
    "date_ranges": [{
        "start": currentDateRange.start,
        "end": currentDateRange.end
    }],
    "dimensions": [{
        "name": "day"
    }, {
        "name": "tc:device"
    }],
    "metrics": [{
        "name": "tc:page_view"
    }, {
        "name": "tc:unique_visitor"
    }],
    "filters": {},
    "with_empty_buckets": true
};

const userVisitSummaryParams = {
    "date_ranges": [{
        "start": lastDateRange.start,
        "end": lastDateRange.end
    }, {
        "start": currentDateRange.start,
        "end": currentDateRange.end
    }],
    "dimensions": [{
        "name": "tc:device"
    }],
    "metrics": [{
        "name": "tc:page_view"
    }, {
        "name": "tc:unique_visitor"
    }],
    "filters": {},
    "with_empty_buckets": true
};

const userSessionDetailParams = {
    "date_ranges": [{
        "start": currentDateRange.start,
        "end": currentDateRange.end
    }],
    "dimensions": [{
        "name": "day"
    }, {
        "name": "tc:device"
    }],
    "metrics": [{
        "name": "tc:session_duration"
    }],
    "filters": {},
    "with_empty_buckets": true
};

const userSessionSummaryParams = {
    "date_ranges": [{
        "start": lastDateRange.start,
        "end": lastDateRange.end
    }, {
        "start": currentDateRange.start,
        "end": currentDateRange.end
    }],
    "dimensions": [{
        "name": "tc:device"
    }],
    "metrics": [{
        "name": "tc:session_duration"
    }],
    "filters": {},
    "with_empty_buckets": true
};

const fetchAnalyticsData = (params) => {
    const option = {
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
    };
    return fetch("http://dashboard.qa.tronclass.com.cn/api/al/analytics", option)
        .then(response => response.json())
};

const getDateDimension = (start, end) => {
    let duration = moment.duration(moment(end) - moment(start));
    if (duration.asHours() <= 24)
        return 'hour';
    else if (duration.asDays() <= 31 * 6)
        return 'day';
    else if (duration.asDays() <= 365 + 366)
        return 'month';
    else
        return 'year';
};

const flattenToObjs = (result, dataIndex) => {
    let rows = result.data[dataIndex].rows;
    let dimensions = result.column_header.dimensions;
    let metrics = result.column_header.metrics;

    let items = [];
    rows.forEach(row => {
        let item = {};
        row.dimensions.forEach((dimensionValue, index) => {
            item[dimensions[index]] = dimensionValue;
        });
        row.metrics[0].values.forEach((metricValue, index) => {
            item[metrics[index]] = metricValue;
        });
        items.push(item);
    });
    return items;
};

const formatValue = (metric, value) => {
    if (metric_hook_formats[metric]) {
        return metric_hook_formats[metric](value);
    } else {
        return value;
    }
};

const calculateFluctuate = (preData, currentData) => {
    if (preData === 0 && currentData === 0) {
        return 0;
    } else if (preData === 0) {
        return 100;
    }

    return Math.round(((currentData - preData) * 100 / preData) | 0);
};

const formatShowDate = (dateDimension, date) => {
    return moment(date).format(dateFormat[dateDimension]).replace(' ', '\n');
};
const groupBy = (list, props) => {
    return list.reduce((a, b) => {
        (a[b[props]] = a[b[props]] || []).push(b);
        return a;
    }, {});
};

const sumBy = (arr, iteratee) => {
    const func = typeof iteratee === 'function' ? iteratee : item => item[iteratee];

    return arr.reduce((acc, item) => acc + func(item), 0)
};

const findAndGetBy = (dateItems, findBy) => {
    return dateItems.filter(item => item[findBy[0]] === findBy[1])[0] || {}
};

const parseToDataSet = (dateDimension, detailItems, metric) => {
    let dateGroups = groupBy(detailItems, dateDimension);
    let dataset = [];
    Object.keys(dateGroups).forEach(date => {
        let dateItems = dateGroups[date];
        let datasetRow = [
            formatShowDate(dateDimension, date),
            sumBy(dateItems, (item) => {
                return item[metric];
            }),
            findAndGetBy(dateItems, [deviceDimension, "web"])[metric] || 0,
            findAndGetBy(dateItems, [deviceDimension, "mob"])[metric] || 0,
        ];
        dataset.push(datasetRow);
    });
    dataset.unshift(category);
    return dataset;
};

const getSummaryCount = (summaryItems, metric, deviceType = null) => {
    if (summaryItems.length === 0) {
        return 0;
    }
    if (deviceType) {
        return findAndGetBy(summaryItems, [deviceDimension, deviceType])[metric];
    } else {
        return summaryItems[0][metric];
    }
};

const parsePageViewData = (dateDimension, detailData, summaryData) => {
    let flattenCurrentDetailData = flattenToObjs(detailData, 0);

    let flattenHistorySummaryData = flattenToObjs(summaryData, 0);
    let flattenCurrentSummaryData = flattenToObjs(summaryData, 1);

    let charts = [];
    detailData.column_header.metrics.forEach((metric) => {
        let dataset = parseToDataSet(dateDimension, flattenCurrentDetailData, metric);

        let pcCurrentSummaryCount = getSummaryCount(flattenCurrentSummaryData, metric, "web");
        let mobileCurrentSummaryCount = getSummaryCount(flattenCurrentSummaryData, metric, "mob");
        let totalCurrentSummaryCount = pcCurrentSummaryCount + mobileCurrentSummaryCount;

        let pcHistorySummaryCount = getSummaryCount(flattenHistorySummaryData, metric, "web");
        let mobileHistorySummaryCount = getSummaryCount(flattenHistorySummaryData, metric, "mob");
        let totalHistorySummaryCount = pcHistorySummaryCount + mobileHistorySummaryCount;

        charts.push({
            metric: metric,
            metricName: metricTitle[metric],
            total: formatValue(metric, totalCurrentSummaryCount),
            fluctuate: calculateFluctuate(totalHistorySummaryCount, totalCurrentSummaryCount),
            options: {
                dataset: {
                    source: dataset
                },
            },
            customLegends: [
                {
                    name: '加总',
                    summaryCount: formatValue(metric, totalCurrentSummaryCount),
                    fluctuate: calculateFluctuate(totalHistorySummaryCount, totalCurrentSummaryCount),
                    active: true
                },
                {
                    name: 'Web',
                    summaryCount: formatValue(metric, pcCurrentSummaryCount),
                    fluctuate: calculateFluctuate(pcHistorySummaryCount, pcCurrentSummaryCount),
                    active: true
                },
                {
                    name: 'App',
                    summaryCount: formatValue(metric, mobileCurrentSummaryCount),
                    fluctuate: calculateFluctuate(mobileHistorySummaryCount, mobileCurrentSummaryCount),
                    active: true
                },
            ]
        });
    });
    return charts;
};

export const getPageViewData = () => {
    let userVisitDetailPromise = fetchAnalyticsData(userVisitDetailParams);
    let userVisitSummaryPromise = fetchAnalyticsData(userVisitSummaryParams);
    let userSessionDetailPromise = fetchAnalyticsData(userSessionDetailParams);
    let userSessionSummaryPromise = fetchAnalyticsData(userSessionSummaryParams);
    let dateDimension = getDateDimension(currentDateRange.start, currentDateRange.end);

    let onSuccess = (responses) => {
        let userVisitDetails = responses[0].result,
            userVisitSummaries = responses[1].result;

        let userVisitCharts = parsePageViewData(dateDimension, userVisitDetails, userVisitSummaries);

        let sessionDetails = responses[2].result,
            sessionSummaries = responses[3].result;

        let sessionCharts = parsePageViewData(dateDimension, sessionDetails, sessionSummaries);

        let charts = userVisitCharts.concat(sessionCharts);

        return charts;
    };

    return Promise.all([userVisitDetailPromise, userVisitSummaryPromise,
        userSessionDetailPromise, userSessionSummaryPromise])
        .then(onSuccess)
};

export const  fetchHeatMapData = () => {
    const params = {
        "date_ranges":[{"start":"2018-06-30","end":"2018-07-31"}],
        "dimensions":[{"name":"day-of-week"},{"name":"hour"}],
        "metrics":[{"name":"tc:page_view"}],
        "filters":{}
    };
    const option = {
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
    };

    return fetch("http://dashboard.qa.tronclass.com.cn/api/al/heatmap", option)
        .then(response => response.json())
};




