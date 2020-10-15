<template >
  <div class="home" v-if="flag">
    <dv-loading>大智学院论文检测系统 Loading...</dv-loading>
  </div>
  <div class="home" v-else>
    <dv-full-screen-container>
      <el-row>
        <el-col :span="8">
          <dv-decoration-8 :reverse="true" style="width:100%;height:40px;" />
        </el-col>
        <el-col :span="8">
          <dv-decoration-11 style="width:100%;height:50px;">
            <span class="title">大智学院论文检测系统</span>
          </dv-decoration-11>
        </el-col>
        <el-col :span="8">
          <dv-decoration-8 style="width:100%;height:40px;" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="search">
          <el-input
            maxlength="10"
            show-word-limit
            placeholder="请输入关键字"
            size="small"
            v-model="keywords"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="3" class="search">
          <div>
            <el-select v-model="keywords_1" size="small" clearable placeholder="请选择专业">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!--
        <el-col :span="3" class="search">
          <div>
            <el-select v-model="keywords_2" size="small" clearable placeholder="请选择方向">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        -->
        <el-col :span="2" class="search">
          <el-tooltip class="item" effect="dark" content="搜索" placement="bottom">
            <el-button size="small" icon="el-icon-search" circle @click="search"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="重置" placement="bottom">
            <el-button size="small" icon="el-icon-refresh" circle @click="reset"></el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="4">
          <dv-decoration-3 style="width:100%;height:30px;" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <dv-decoration-10 style="width:100%;height:5px;margin:10px 0" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <dv-border-box-8>
            <dv-decoration-6 style="width:100%;height:20px;" />
            <span class="title_s">论文排名</span>

            <dv-scroll-ranking-board :config="config" style="width:90%;height:800px;margin:0 auto" />
          </dv-border-box-8>
        </el-col>
        <el-col :span="3">
          <dv-water-level-pond :config="sum" style="width:100%;height:220px;margin:0 auto" />
          <dv-water-level-pond :config="excellent" style="width:100%;height:220px;margin:0 auto" />
        </el-col>
        <el-col :span="10">
          <dv-border-box-13>
            <div id="chart_major" style="width:100%;height:440px;margin:0 auto"></div>
            <!--<dv-charts :option="chart" style="width:450px;height:300px;margin:0 auto" />-->
          </dv-border-box-13>
        </el-col>
        <el-col :span="7">
          <dv-border-box-1>
            <div
              id="wordcloud"
              style="width:100%;height:440px;margin:0 auto;padding:10px;box-sizing: border-box"
            ></div>
          </dv-border-box-1>
        </el-col>
        <el-col :span="8">
          <dv-border-box-3>
            <dv-scroll-board
              :config="config_2"
              style="width:100%;height:400px;box-sizing: border-box;"
            />
          </dv-border-box-3>
        </el-col>

        <el-col :span="6">
          <dv-border-box-8 :reverse="true">
            <dv-capsule-chart :config="config_1" style="width:100%;height:400px;margin:0 auto" />
          </dv-border-box-8>
        </el-col>
      </el-row>
    </dv-full-screen-container>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import wordCloud from "echarts-wordcloud";
import Qs from "qs";
export default {
  data() {
    return {
      flag: true,
      clouddata: [],
      lw_sum: "",
      lw_excellent: "",
      sum: {
        data: [1000],
        formatter: "{value}篇",
      },
      excellent: {
        data: [1000],
        formatter: "{value}篇",
      },
      chart_major_data: [
        { name: "单片机", value: 93 },
        { name: "网站", value: 32 },
        { name: "可视化", value: 65 },
        { name: "app", value: 44 },
        { name: "算法", value: 52 },
      ],
      chart: {
        series: [
          {
            type: "pie",
            data: [
              { name: "网站", value: 93 },
              { name: "单片机", value: 32 },
              { name: "可视化", value: 65 },
              { name: "app", value: 44 },
              { name: "算法", value: 52 },
            ],
            style: {
              color: "#fff",
            },
            insideLabel: {
              show: true,
            },
          },
        ],
      },
      keywords: "",
      keywords_1: "",
      keywords_2: "",
      options1: [
        {
          value: "网站",
          label: "网站",
        },
        {
          value: "单片机",
          label: "单片机",
        },
        {
          value: "app",
          label: "app",
        },
      ],
      options: [
        {
          value: 1,
          label: "电子科学与技术",
        },
        {
          value: 2,
          label: "计算机科学与技术",
        },
        {
          value: 3,
          label: "电子信息工程",
        },
        {
          value: 4,
          label: "信息工程",
        },
      ],
      config: {
        data: [
          {
            name: "漯河",
            value: 29,
          },
        ],
        unit: "分",
      },
      config_1: {
        data: [
          {
            name: "电子信息工程",
            value: 45,
          },
          {
            name: "电子科学与技术",
            value: 49,
          },
          {
            name: "大数据与数据科学",
            value: 36,
          },
          {
            name: "信息工程",
            value: 40,
          },
          {
            name: "计算机科学与技术",
            value: 60,
          },
        ],
        digitalFlopStyle: {
          fontSize: 15,
        },
        showValue: true,
        unit: "个",
      },
      config_2: {
        header: ["名字", "论文题目", "专业"],
        data: [],
      },
    };
  },
  methods: {
    search() {
      var that = this;
      var title = that.keywords;
      var title1 = that.keywords_1;
      var title2 = that.keywords_2;
      let data = {
        title: title,
        major: title1,
        category: title2,
      };
      if (title == "") {
        that.$message.error("请输入关键字！");
      } else {
        that.axios
          .post("/search", Qs.stringify(data), { emulateJSON: true })
          .then((res) => {
            let lw_data = res.data.lw20;
            let lw_excel = res.data.lw_excel;
            let lw_sum=res.data.lw_sum;
            let lw_excellent=res.data.lw_excel_sum;
            let list = [];
            let list_excel = [];
            for (let i = 0; i < lw_data.length; i++) {
              list.push({ name: lw_data[i][0], value: lw_data[i][1] });
            }
            for (let i = 0; i < lw_excel.length; i++) {
              list_excel.push([lw_excel[i][0], lw_excel[i][1], lw_excel[i][2]]);
            }
            that.sum = {
              data: [lw_sum],
              formatter: "论文{value}篇",
            };
            that.excellent = {
              data: [lw_excellent],
              formatter: "优秀论文{value}篇",
            };
            that.config = { data: list, unit: "分" };
            that.config_2 = {
              data: list_excel,
              header: ["名字", "论文题目", "专业"],
              columnWidth: [70, 300, 240],
              evenRowBGC: "rgb(7, 3, 24)",
              headerBGC: "#1370fb",
              carousel: "page",
            };
          })
          .catch((err) => {
            //请求失败就会捕获报错信息
            console.log(err);
          });
      }
    },
    draw_chart_major() {
      let myChart = this.$echarts.init(document.getElementById("chart_major"));
      // eslint-disable-next-line no-unused-vars
      let innerFontColor = "#FFFFFF";
      // eslint-disable-next-line no-unused-vars
      let outerFontColor = "#666666";
      // eslint-disable-next-line no-unused-vars
      let scale = 1;
      let echartData = {
        inner: [
          {
            name: "电子信息工程",
            value: 45,
          },
          {
            name: "电子科学与技术",
            value: 49,
          },
          {
            name: "大数据与数据科学",
            value: 36,
          },
          {
            name: "信息工程",
            value: 40,
          },
          {
            name: "计算机科学与技术",
            value: 60,
          },
        ],
        outer: this.chart_major_data,
      };

      let legend1 = echartData.inner.map((v) => v.name);
      let legend2 = echartData.outer.map((v) => v.name);
      // eslint-disable-next-line no-unused-vars
      let legendData = [...legend1, ...legend2];

      let option = {
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#FFEA01",
          "#B8D07C",
          "#fca4bb",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "专业",
            type: "pie",
            radius: [0, "35%"],
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 1,
              },
            },
            label: {
              normal: {
                position: "inner",
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: echartData.inner,
          },
          {
            name: "论文主题",
            type: "pie",
            radius: ["45%", "55%"],
            data: echartData.outer,
            labelLine: {
              normal: {
                length: 20,
                length2: 140,
                lineStyle: {
                  color: "#fff",
                },
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  return (
                    "{icon|●}{name|" +
                    params.name +
                    "}{percent|" +
                    params.percent.toFixed(1) +
                    "%}{value|" +
                    params.value +
                    "}"
                  );
                },
                padding: [0, -130, 25, -130],
                rich: {
                  color: "#333",
                  icon: {
                    fontSize: 16,
                  },
                  name: {
                    fontSize: 14,
                    padding: [0, 5, 0, 5],
                    color: "#fff",
                  },
                  percent: {
                    color: "#fff",
                    padding: [0, 5, 0, 0],
                  },
                  value: {
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#fff",
                  },
                },
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    draw_wordcloud() {
      let myChart = this.$echarts.init(document.getElementById("wordcloud"));
      let option = {
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "wordCloud",
            gridSize: 6,
            shape: "diamond",
            sizeRange: [12, 50],
            width: 800,
            height: 500,
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: this.clouddata,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    get_wordcloud() {
      var that = this;
      that.axios
        .get("/get_wordcloud")
        .then((res) => {
          let data = res.data;
          that.clouddata = [];
          that.chart_major_data = [];
          for (let i = 0; i < data.length; i++) {
            that.clouddata.push({ name: data[i][0], value: data[i][1] });
          }
          for (let x = 0; x < 6; x++) {
            that.chart_major_data.push({ name: data[x][0], value: data[x][1] });
          }
        })
        .catch((err) => {
          //请求失败就会捕获报错信息
          console.log(err);
        });
    },
    get_lwsum() {
      var that = this;
      that.axios
        .get("/getlw_sum")
        .then((res) => {
          let data = res.data;
          let lw_sum = data[0][0][0];
          let lw_excellent = data[1][0][0];
          that.sum = {
            data: [lw_sum],
            formatter: "论文{value}篇",
          };
          that.excellent = {
            data: [lw_excellent],
            formatter: "优秀论文{value}篇",
          };
        })
        .catch((err) => {
          //请求失败就会捕获报错信息
          console.log(err);
        });
    },
    get_lwlist() {
      var that = this;
      that.axios
        .get("/getlw")
        .then((res) => {
          let data = res.data;
          that.config_2.data = [];
          let list = [];
          for (let i = 0; i < data.length; i++) {
            list.push([data[i][1], data[i][2], data[i][4]]);
          }
          that.config_2 = {
            data: list,
            header: ["名字", "论文题目", "专业"],
            columnWidth: [70, 300, 240],
            evenRowBGC: "rgb(7, 3, 24)",
            headerBGC: "#1370fb",
            carousel: "page",
          };
        })
        .catch((err) => {
          //请求失败就会捕获报错信息
          console.log(err);
        });
    },
    get_lwlist_10() {
      var that = this;
      that.axios
        .get("/getlw_10")
        .then((res) => {
          let data = res.data;
          that.config.data = [];
          let list = [];
          for (let i = 0; i < data.length; i++) {
            list.push({ name: data[i][2], value: data[i][3] });
          }
          that.config = { data: list, unit: "分" };
        })
        .catch((err) => {
          //请求失败就会捕获报错信息
          console.log(err);
        });
    },
    reset() {
      var that = this;
      that.keywords_1 = that.keywords = that.keywords_2 = "";
      that.get_lwlist();
      that.get_lwlist_10();
      that.get_wordcloud();
      that.get_lwsum();
      that.draw_wordcloud();
      that.draw_chart_major();
      that.$message.success("刷新成功！");
    },
  },

  created() {
    var that = this;
    that.get_lwlist();
    that.get_lwlist_10();
    that.get_wordcloud();
    that.get_lwsum();
    setTimeout(function () {
      that.flag = false;
    }, 1000);
  },
  mounted() {
    var that = this;
    setTimeout(function () {
      that.draw_wordcloud();
      that.draw_chart_major();
    }, 2000);
  },
};
</script>
<style scoped>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: rgb(7, 3, 24);
  color: white;
}
.title {
  color: white;
  font-size: 1rem;
}
@media screen and (max-width: 600px) {
  .title {
    color: white;
    font-size: 0.6rem;
  }
}
.title_s {
  position: relative;
  left: 20px;
  top: 10px;
}
.search {
  margin: 0 5px;
}
</style>
