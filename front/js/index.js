$(function () {
    initializationLineCharts();
    initializationMileageBarCharts();
    initializationDrivingTimeBarCharts();
    initializationDrivingTimeAndMileageLineCharts();
    initializationGaugeCharts();
    initializationMap();
    initializationWebSocket();
});

// 缓存数据，全局引用
var pageData = {
    //车辆仪表盘图表 实例
    chartsCarGauge: null,
    //折线图 实例
    chartsRealDataLine: null,
    //驾驶时长柱状图 实例
    chartsDrivingTimeBar: null,
    //里程统计柱状图 实例
    chartsMileageBar: null,
    //车辆总驾驶时长及总驾驶里程数折线图 实例
    chartsDrivingTimeAndMileageLine: null,
    //地图 实例
    map: null,
    //地图上的车辆图标  实例
    mapMarker: null
}

//初始化里程统计柱状图
function initializationMileageBarCharts() {
    // 1实例化对象
    var myChart = echarts.init(document.querySelector(".line .chart"));
    // 2. 指定配置项和数据
    var option = {
        color: ["#2f89cf"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        // 修改图表的大小
        grid: {
            left: "7%",
            top: "3%",
            right: "0%",
            bottom: "4%",
            containLabel: true
        },
        xAxis: {
            type: "category",
            data: [
                "手动驾驶里程",
                "自动驾驶里程",
                '累计里程'
            ],
            axisTick: {
                alignWithLabel: true
            },
            // 修改刻度标签 相关样式
            axisLabel: {
                color: "rgba(255,255,255,1) ",
                // fontSize: "18"
            },
            // 不显示x坐标轴的样式
            axisLine: {
                show: false
            }
        },
        yAxis: {
            type: "value",
            // 修改刻度标签 相关样式
            axisLabel: {
                color: "rgba(255,255,255,1) ",
                fontSize: 12
            },
            // y轴的线条改为了 2像素
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,1)",
                    width: 2
                }
            },
            // y轴分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,1)"
                }
            },
            name: "里程（km）",
            nameLocation: "middle",
            nameGap: 60,
            nameTextStyle: {
                color: "#fff"
            }
        },
        series: [
            {
                name: "直接访问",
                type: "bar",
                barWidth: "35%",
                //对应数据库数据初始值
                data: [13414.22, 9454.405, 22868.625],
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5
                }
            }
        ]
    };
    // 3. 把配置项给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });

    pageData.chartsMileageBar = myChart;
}

//初始化车辆仪表盘图表
function initializationGaugeCharts() {
    var carChart = echarts.init(document.getElementById("chartsCarGauge"));
    var carOption = {
        // backgroundColor: '#063258',
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
        },
        series: [
            // left
            {
                name: 'gauge 0',
                type: 'gauge',
                min: -200,
                max: 250,
                startAngle: -30,
                endAngle: -315,
                splitNumber: 9,
                radius: '70%',
                center: ['24%', '60%'],
                axisLine: {
                    lineStyle: {
                        width: 10,
                        color: [[1, '#00FF00']]
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                anchor: {},
                pointer: {
                    show: false
                },
                detail: {
                    show: false
                },
                progress: {
                    show: true,
                    width: 3,
                    itemStyle: {
                        color: '#fff'
                    }
                },
                data: [
                    {
                        value: 0,
                        name: ''
                    }
                ]
            },
            {
                name: '车速',
                type: 'gauge',
                min: 0,
                max: 180,
                startAngle: -120,
                endAngle: -340,
                splitNumber: 6,
                radius: '70%',
                center: ['24%', '60%'],
                axisLine: {
                    lineStyle: {
                        width: 10,
                        color: [[1, '#00FF00']]
                    }
                },
                splitLine: {
                    distance: -7,
                    length: 12,
                    lineStyle: {
                        color: '#fff',
                        width: 2
                    }
                },
                axisTick: {
                    distance: -8,
                    length: 8,
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    }
                },
                axisLabel: {
                    distance: 12,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: 'Arial',
                    color: '#fff'
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 10,
                    itemStyle: {
                        borderWidth: 4
                    }
                },
                pointer: {
                    icon: 'path://M-36.5,23.9L-41,4.4c-0.1-0.4-0.4-0.7-0.7-0.7c-0.5-0.1-1.1,0.2-1.2,0.7l-4.5,19.5c0,0.1,0,0.1,0,0.2v92.3c0,0.6,0.4,1,1,1h9c0.6,0,1-0.4,1-1V24.1C-36.5,24-36.5,23.9-36.5,23.9z M-39.5,114.6h-5v-85h5V114.6z',
                    width: 6,
                    length: '80%',
                    offsetCenter: [0, 0],
                    itemStyle: {
                        color: '#f00',
                        shadowColor: 'rgba(255, 0, 0)',
                        shadowBlur: 5,
                        shadowOffsetY: 2
                    }
                },
                title: {
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: 'Arial',
                    color: '#fff',
                    offsetCenter: [1, '-32%']
                },
                detail: {
                    show: false
                },
                data: [
                    {
                        value: 0,
                        name: 'km/h'
                    }
                ],
                tooltip: {
                    formatter: "{a}: <br />{c} {b}"
                }
            },
            // middle
            {
                name: '转速',
                type: 'gauge',
                min: 0,
                max: 8,
                z: 10,
                startAngle: 210,
                endAngle: -30,
                splitNumber: 8,
                radius: '105%',
                center: ['68%', '58%'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 0,
                        color: [
                            [0.825, '#fff'],
                            [1, '#f00']
                        ]
                    }
                },
                splitLine: {
                    distance: 20,
                    length: 15,
                    lineStyle: {
                        color: 'auto',
                        width: 4,
                        shadowColor: 'rgba(255, 255, 255, 0.5)',
                        shadowBlur: 15,
                        shadowOffsetY: -10
                    }
                },
                axisTick: {
                    distance: 20,
                    length: 8,
                    lineStyle: {
                        color: 'auto',
                        width: 2,
                        shadowColor: 'rgba(255, 255, 255)',
                        shadowBlur: 10,
                        shadowOffsetY: -10
                    }
                },
                axisLabel: {
                    distance: 10,
                    fontSize: 26,
                    fontWeight: 710,
                    fontFamily: 'Arial',
                    color: '#fff'
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 10,
                    itemStyle: {
                        borderWidth: 4
                    }
                },
                pointer: {
                    icon: 'path://M-36.5,23.9L-41,4.4c-0.1-0.4-0.4-0.7-0.7-0.7c-0.5-0.1-1.1,0.2-1.2,0.7l-4.5,19.5c0,0.1,0,0.1,0,0.2v92.3c0,0.6,0.4,1,1,1h9c0.6,0,1-0.4,1-1V24.1C-36.5,24-36.5,23.9-36.5,23.9z M-39.5,114.6h-5v-85h5V114.6z',
                    width: 10,
                    offsetCenter: [0, 0],
                    length: '75%',
                    itemStyle: {
                        color: '#f00',
                        shadowColor: 'rgba(255, 0, 0)',
                        shadowBlur: 5,
                        shadowOffsetY: 3
                    }
                },
                title: {
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: 'Arial',
                    offsetCenter: [0, '-23%']
                },
                data: [
                    {
                        value: 0.6,
                        name: '×1000r/min'
                    }
                ],
                detail: {
                    show: false
                },
                tooltip: {
                    formatter: "{a}: <br />{c} {b}"
                }
            },
            {
                name: 'gauge 3',
                type: 'gauge',
                min: 0,
                max: 8,
                z: 10,
                splitNumber: 8,
                radius: '105%',
                center: ['68%', '58%'],
                axisLine: {
                    lineStyle: {
                        width: 18,
                        color: [[1, '#000']]
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                anchor: {},
                pointer: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    offsetCenter: ['5%', '60%'],
                    formatter: '{a|{value}}{b|r/min}',
                    rich: {
                        a: {
                            fontSize: 25,
                            fontWeight: 800,
                            fontFamily: 'Arial',
                            color: '#fff',
                            align: 'center',
                            padding: [0, 5, 0, 0]
                        },
                        b: {
                            fontSize: 14,
                            fontWeight: 800,
                            fontFamily: 'Arial',
                            color: '#fff',
                            padding: [0, 0, 20, 0]
                        }
                    }
                },
                // value is speed
                data: [
                    {
                        value: 0,
                        name: ''
                    }
                ]
            },
        ]
    };

    carChart.setOption(carOption);
    window.addEventListener("resize", function () {
        carChart.resize();
    });

    //附到全局变量里
    pageData.chartsCarGauge = carChart;
}

//初始化速度-转速散点图
function initializationDrivingTimeAndMileageLineCharts() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".pie2 .chart"));
    // 2.指定配置
    var option = {
        grid: {
            top: "8%",
            left: '5%',
            right: '5%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#fff"
                }
            },
            axisLabel: {
                color: "#fff"
            },
            name: "车速（km/h）",
            nameLocation: "center",
            nameGap: 25,
            nameTextStyle: {
                color: "#fff"
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#fff"
                }
            },
            axisTick: {
                show: true,
                length: 5,
                lineStyle: {
                    color: "#fff"
                }
            },
            axisLabel: {
                color: "#fff"
            },
            name: "转速（r/min）",
            nameLocation: "middle",
            nameGap: 45,
            nameTextStyle: {
                color: "#fff"
            }
        },
        series: [
            {
                type: 'scatter',
                symbolSize: 10,
                itemStyle: {
                    color: "#ee6666"
                },
                data: []
            }
        ]
    };

    // 3. 把配置给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });

    pageData.chartsDrivingTimeAndMileageLine = myChart;
}

//统计驾驶时长柱状图
function initializationDrivingTimeBarCharts() {
    var myChart = echarts.init(document.getElementById("chartsDrivingTimeBar"));
    var option = {
        color: ["#7b68ee"],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: "0%",
            top: "2%",
            right: "5%",
            bottom: "9%",
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick: {
                alignWithLabel: true
            },
            // 修改刻度标签 相关样式
            axisLabel: {
                color: "rgba(255,255,255,1) ",
                fontSize: "15"
            },
            // 不显示x坐标轴的样式
            axisLine: {
                show: false
            },
            name: "时长（小时）",
            nameLocation: "center",
            nameGap: 30,
            nameTextStyle: {
                color: "#fff"
            }
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                color: "rgba(255,255,255,1) ",
                fontSize: "15"
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,1)",
                    width: 2
                }
            },
            data: ['累计时长', "自动行驶时长", "手动行驶时长"]
        },
        series: [
            {
                type: 'bar',
                //设置初始值
                data: [312.19, 129.07, 183.12],
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5
                }
            },
        ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });

    pageData.chartsDrivingTimeBar = myChart;
}

//初始化折线图
function initializationLineCharts() {
    let carChart = echarts.init(document.getElementById("chartsRealDataLine"));
    let chartOption = {
        //这个是鼠标放图上的弹窗
        tooltip: {
            trigger: 'axis'
        },
        //这个是图例
        legend: {
            data: ['速度', '瞬时油耗', '海拔', '发动机转速'],
            textStyle: {
                color: [""]
            }
        },
        //这个是绘制范围
        grid: {
            //距离左边的距离
            left: "0%",
            top: "20px",
            right: "0%",
            bottom: "4%",
            containLabel: true
        },
        //X轴参数
        xAxis: {
            //指定x轴上的数据是时间
            type: 'time',
            //轴上的分割线
            splitLine: {
                //是否显示
                show: false
            },
            //轴
            axisLine: {
                //直线样式
                lineStyle: {
                    //颜色位白色
                    color: "#fff"
                }
            },
            //轴上的文字
            axisLabel: {
                //颜色为白色
                color: "#fff"
            }
        },
        //y轴参数
        yAxis: {
            //指定y轴上的数据是数字
            type: 'value',
            //上同
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            },
            axisLabel: {
                color: "#fff"
            }
        },
        //数据项
        series: [
            //折线1
            {
                name: '速度',
                type: 'line',
                showSymbol: false,
                //初始化时填的折线1的数据
                data: []
            },
            //折线2
            {
                name: '瞬时油耗',
                type: 'line',
                showSymbol: false,
                //初始化时填的折线2的数据
                data: []
            },
            {
                name: '海拔',
                type: 'line',
                showSymbol: false,
                data: []
            },
            {
                name: '发动机转速',
                type: 'line',
                showSymbol: false,
                data: []
            },
        ]
    };
    //把初始化的参数set到echarts实例中
    carChart.setOption(chartOption);
    window.addEventListener("resize", function () {
        carChart.resize();
    });

    pageData.chartsRealDataLine = carChart;
}

//初始化WebSocket
function initializationWebSocket() {
    // 打开一个 web socket
    let wsImpl = window.WebSocket || window.MozWebSocket;
    let ws = new wsImpl("ws://43.138.155.114:8081/websocket");

    ws.onopen = function () {
        // Web Socket 已连接上，使用 send() 方法发送数据
        ws.send("0");
    };

    ws.onmessage = function (evt) {
        // Web Socket 收到发送数据
        let received_msg = JSON.parse(evt.data);
        // console.log(received_msg);
        setData(received_msg);
    };

    ws.onclose = function () {
        // Web Socket 关闭
    };
}

//初始化地图和车辆图标
function initializationMap() {
    AMapLoader.load({
        "key": "9458cf650a0241f20a8373822d16c6bf",
        "version": "2.0",
        "plugins": ['AMap.MoveAnimation'],
    }).then((AMap) => {
        let map = new AMap.Map("container", {
            center: new AMap.LngLat(116.397428, 39.90923),
            zoom: 16,
            expandZoomRange: true,
            dragEnable: false,
            zooms: [3, 20],
            // 地图主题  https://lbs.amap.com/demo/jsapi-v2/example/personalized-map/set-theme-style
            //mapStyle: "amap://styles/darkblue"
        });
        pageData.map = map;

        let mapMarker = new AMap.Marker({
            map: map,
            position: new AMap.LngLat(116.397428, 39.90923),
            offset: new AMap.Pixel(-13, -26),
            angle: 0,
            icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
            visible: false,
            clickable: false
        });
        pageData.mapMarker = mapMarker;
    }).catch((e) => {
        console.error(e);  //加载错误提示
    });
}

//设置数据
function setData(data) {
    realDataTable(data);
    setGaugeCharts(data);
    setLineCharts(data);
    setDrivingTimeBarCharts(data);
    setMileageBarCharts(data);
    setDrivingTimeAndMileageLineCharts(data);
    setMapData(data);
}

//设置实时数据表格
function realDataTable(data) {
    $("#speed").text(data.speed);
    $("#mileage").text(data.mileage);
    $("#direction").text(data.direction);
    $("#accelerator").text(data.accelerator);
    $("#totalFuelConsumption").text(data.totalFuelConsumption);
    $("#instantFuelConsumption").text(data.instantFuelConsumption);
    $("#gear").text(data.gear);
    let drivingModeText = "";
    if (data.drivingMode == 1)
        drivingModeText = "自动驾驶";
    else
        drivingModeText = "手动驾驶";
    $("#drivingMode").text(drivingModeText);
    $("#longitude").text(data.longitude);
    $("#latitude").text(data.latitude);
}

//设置仪表盘数据
function setGaugeCharts(data) {
    //获取到图表里的series
    let series = pageData.chartsCarGauge.getOption().series;
    //取到series里的data数据
    let speedData1 = series[0].data;
    let speedData2 = series[1].data;
    let engineSpeedData1 = series[2].data;
    let engineSpeedData2 = series[3].data;
    //设置值
    speedData1[0].value = data.speed.toFixed(2);
    speedData2[0].value = data.speed.toFixed(2);
    let engineSpeedShow = (data.engineSpeed / 1000).toFixed(2);
    engineSpeedData1[0].value = engineSpeedShow;
    engineSpeedData2[0].value = engineSpeedShow;
    //再把取到的series设置进echarts实例中
    pageData.chartsCarGauge.setOption({
        series: series
    });
}

//设置折线图数据
function setLineCharts(data) {
    //获取echarts实例中的series属性
    let setvice = pageData.chartsRealDataLine.getOption().series;
    //取到折线1的数据
    let setviceData1 = setvice[0].data;
    //取到折线2的数据
    let setviceData2 = setvice[1].data;
    let setviceData3 = setvice[2].data;
    let setviceData4 = setvice[3].data;

    //把新的数据插入到折线1数据的末尾（插入的是数组，数组索引0位填的是x轴数据，1位是y轴数据）
    setviceData1.push([data.traveltime, data.speed]);
    //把新的数据插入到折线2数据的末尾（插入的是数组，数组索引0位填的是x轴数据，1位是y轴数据）
    setviceData2.push([data.traveltime, data.instantFuelConsumption]);
    setviceData3.push([data.traveltime, data.altitude]);
    setviceData4.push([data.traveltime, (data.engineSpeed / 1000).toFixed(2)]);
    //再把新的数据set到echarts实例中
    pageData.chartsRealDataLine.setOption({
        series: setvice
    });
}

//设置驾驶时长柱状图数据
function setDrivingTimeBarCharts(data) {
    //获取echarts实例中的series属性
    let setvice = pageData.chartsDrivingTimeBar.getOption().series;
    let seriesData = setvice[0].data;
    //在初始值上加一秒（约等于0.00027小时）
    seriesData[0] += 0.00027;
    if (data.drivingMode == 1) {
        seriesData[1] += 0.00027;
    } else {
        seriesData[2] += 0.00027;
    }

    pageData.chartsDrivingTimeBar.setOption({
        series: setvice
    });
}

//设置里程统计柱状图数据
function setMileageBarCharts(data) {
    //获取echarts实例中的series属性
    let setvice = pageData.chartsMileageBar.getOption().series;
    let seriesData = setvice[0].data;
    //总里程是否大于初始值
    if (data.mileage > 22869) {
        //新增里程
        let addNum = data.mileage - seriesData[2];
        if (data.drivingMode == 1) {
            seriesData[1] += addNum;
        } else {
            seriesData[0] += addNum;
        }
        seriesData[2] = data.mileage;
    } else {
        //小于初始值为  数据已经循环了一轮   从头开始了   就重新设置为初始值  
        seriesData = [9454.405, 13414.22, 22868.625];
    }

    pageData.chartsMileageBar.setOption({
        series: setvice
    });
}

//设置速度转速散点图数据
function setDrivingTimeAndMileageLineCharts(data) {
    //获取echarts实例中的series属性
    let setvice = pageData.chartsDrivingTimeAndMileageLine.getOption().series;
    let seriesData = setvice[0].data;
    seriesData.push([data.speed, data.engineSpeed]);

    pageData.chartsDrivingTimeAndMileageLine.setOption({
        series: setvice
    });
}

//设置地图数据
function setMapData(data) {
    //未初始化完毕时不设置数据
    if (!pageData.map || !pageData.mapMarker)
        return;

    // 设置车辆定位图标（服务器的经纬度是GPS坐标，需要加偏移转为高德的坐标，具体请百度）
    // 加偏移不违法，反偏移（从高德坐标转GPS貌似是违法的）
    let point = GpsConvert.Convert({ lng: data.longitude, lat: data.latitude });
    pageData.mapMarker.moveTo([point.lng, point.lat], {
        duration: 1000,
        delay: 500,
        autoRotation: true
    });
    // this.mapMaker.setAngle(data.Angle);
    pageData.mapMarker.show();
    pageData.map.setCenter([point.lng, point.lat]);
}