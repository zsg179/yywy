<template>
    <div class="container">
        <div class="header">
            <img src="">
        </div>

        <div class="tabs">
            <van-tabs animated type="card">
                <van-tab title="子女教育金">
                    <div class="tip">
                        预计需要<span class="tip-num">30万</span>元
                    </div>
                    <div class="zn-main">
                        <div class="in-wrapper">
                            <div class="in">
                                <div class="in-per-month">
                                    <div class="in-title">
                                        每月投入（元）
                                    </div>
                                    <!-- 步进器 -->
                                    <div class="in-stepper">
                                        <van-stepper v-model="znInMonth" step="100" theme="round" min="100" max="9900" disable-input />
                                    </div>
                                </div>
                                <!-- 分割线 -->
                                <div class="divider"></div>
                                <div class="in-time">
                                    <div class="in-title">
                                        投入时间
                                    </div>
                                    <!-- 隐藏的选择器 -->
                                    <van-popup v-model="popupShow" get-container="html" position="bottom" :style="{ height: '40%' }">
                                        <van-picker
                                        title="请选择"
                                        show-toolbar
                                        :columns="timeList"
                                        @confirm="confirm"
                                        @cancel="hiden"
                                        />
                                    </van-popup>
                                    <!-- 投入时间 -->
                                    <div class="in-time-picker">
                                        <van-field
                                            :value="inTime"
                                            is-link
                                            arrow-direction="down"
                                            @click="pop"
                                            readonly
                                            input-align="center"
                                        /> 
                                    </div>
                                </div>
                            </div>
                            <!-- 总投入金额 -->
                            <div class="in-total">
                                总投入<span class="in-total-num">{{totalInNum}}</span>元
                            </div>
                        </div>
                        <div class="out-wrapper">
                            <div class="out-title">
                                到期共领（元）
                            </div>
                            <div class="out-num">
                                {{totalOutNum}}
                            </div>
                            <div class="out-more">
                                多领<span class="out-more-num">{{totalOutNum-totalInNum}}</span>元
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="info-wrapper">
                            <div class="sex-wrapper">
                                <div class="info-label">
                                    我是
                                </div>
                                <!-- 隐藏的选择器 -->
                                <van-popup v-model="sexPopShow" get-container="html" position="bottom" :style="{ height: '40%' }">
                                    <van-picker
                                    title="请选择"
                                    show-toolbar
                                    :columns="sexList"
                                    @confirm="sexConfirm"
                                    @cancel="sexHiden"
                                    />
                                </van-popup>
                                <!-- 性别 -->
                                <div class="sex-picker">
                                    <van-field
                                        :value="sex"
                                        is-link
                                        arrow-direction="down"
                                        @click="sexPop"
                                        readonly
                                        input-align="right"
                                    /> 
                                </div>
                            </div>
                            <div class="age-wrapper">
                                <div class="info-label">今年</div>
                                <!-- 隐藏的选择器 -->
                                <van-popup v-model="agePopShow" get-container="html" position="bottom" :style="{ height: '40%' }">
                                    <van-picker
                                    title="请选择"
                                    show-toolbar
                                    :columns="ageList"
                                    @confirm="ageConfirm"
                                    @cancel="ageHiden"
                                    />
                                </van-popup>
                                <!-- 年龄 -->
                                <div class="age-picker">
                                    <van-field
                                        :value="age"
                                        is-link
                                        arrow-direction="down"
                                        @click="agePop"
                                        readonly
                                        input-align="right"
                                    /> 
                                </div>
                                <div class="age-unit">岁</div>
                            </div>
                        </div>
                        <div class="profit-wrapper">
                            <van-radio-group v-model="profitLevel" direction="horizontal">
                                <van-radio name="1" @click="getTotalInNum()">低收益</van-radio>
                                <van-radio name="2" @click="cal()">中收益</van-radio>
                                <van-radio name="3" @click="cal()">高收益</van-radio>
                            </van-radio-group>
                        </div>
                        <div class="end-time">
                            在&nbsp;
                            <!-- 步进器 -->
                            <div class="time-stepper">
                                <van-stepper v-model="endAge" step="1" theme="round" min="50" max="105"  />
                            </div>
                            &nbsp;岁时领取
                        </div>
                    </div>
                </van-tab>
                <van-tab title="个人养老金">
                    <div class="tip">
                        预计需要<span class="tip-num">80万</span>元
                    </div>
                </van-tab>
                <van-tab title="风险预备金">
                    <div class="tip">
                        预计需要<span class="tip-num">20万</span>元
                    </div>
                </van-tab>
            </van-tabs>

            <div class="btn">
                <div class="btn-share" @click="showShare = true">
                    分享
                </div>
                <!-- 隐藏的分享面板 -->
                <van-share-sheet
                    v-model="showShare"
                    :options="options"
                />
                <div class="btn-next">
                    点我，开立薪愿账户
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dj:20000,//趸交
            znInMonth: 600,//每月追加费用
            inTime: "5年",//追加时间（年）
            zjAgeStart: 26,//开始追加时年度末年龄
            zjAgeEnd: 30,//结束追加时年度末年龄
            bdnd: 1,//保单年度
            ndmAge: 0,//被保险人年度末年龄
            lastValue: 0,//上年度末保单账户价值
            accountValue: 0,//账户价值
            nh1: 0.025,//低档收益率
            nh2: 0.045,//中档收益率
            nh3: 0.06,//高档收益率
            yh1: 11.8652555881659,//低档月系数
            yh2: 11.7612756549171,//中档月系数
            yh3: 11.6854040962615,//高档月系数
            bxTime: 106,//保险期间
            bflq: 0,//部分领取
            njlq: 0,//年金领取
            totalInNum: 100000,//总投入费用
            totalOutNum: 498020,//到期可领费用
            popupShow: false,
            timeList: [
                "1年",
                "2年",
                "3年",
                "5年",
                "10年"
            ],
            sex: "女士",//性别
            sexPopShow: false,
            sexList: [
                "男士",
                "女士"
            ],
            age: "25",//年龄
            agePopShow: false,
            ageList: [
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "28",
                "29",
                "30",
                "31",
                "32",
                "33",
                "34",
                "35",
                "36",
                "37",
                "38",
                "39",
                "40",
                "41",
                "42",
                "43",
                "44",
                "45",
                "46",
                "47",
                "48",
                "49",
                "50",
                "51",
                "52",
                "53",
                "54",
                "55"
            ],
            profitLevel: "2",//收益档次
            endAge: 55,//领取时间
            showShare: false,
            options:[
                { name: '微信好友', icon: 'wechat' },
                { name: '朋友圈', icon: require("../assets/img/wechat-circle.png") },
            ]
        }
    },
    methods:{
        test(){
            alert(this.profitLevel)
        },
        //保单测算
        cal(){
            //收益档次计算
            var nh,yh;
            if(this.profitLevel == "1"){
                nh = this.nh1;
                yh = this.yh1;
            }else if(this.profitLevel == "2"){
                nh = this.nh2;
                yh = this.yh2;
            }else{
                nh = this.nh3;
                yh = this.yh3;
            }
            
            for (this.getNdmAge(); this.ndmAge <= this.endAge; this.getBdnd(),this.getNdmAge()) {
                Math.round(this.calNdmAccountValue(nh, yh));
            }
            alert("总价值："+this.lastValue)
        },
        //计算年度末保单账户价值
        calNdmAccountValue(nh, yh){
            if (this.bdnd == 0) {
                return this.lastValue = 0;
            }
            if (this.calAccountValue(nh, yh) <= 0) {
                return this.lastValue = 0;
            }
            this.lastValue = (this.lastValue + this.getDJ() * 0.98 + yh / 12 * this.getZjYear() * (this.bdnd <= 3 ? 0.98 : 0.99) - this.njlq) * (1 + nh) - this.bflq;
            return this.lastValue;
        },
        //计算账户价值
        calAccountValue(nh, yh){
            //追加方式按月计算
            this.accountValue = (this.lastValue + this.getDJ() * 0.98 + (yh / 12 * this.getZjYear() * (this.bdnd <= 3 ? 0.98 : 0.99))) * (1 + nh) - this.bflq - this.njlq;
            return this.accountValue;
        },
        //计算总投入费用
        getTotalInNum(){
            //趸交+累计追缴
            this.totalInNum = this.dj + this.inTime.slice(0,this.inTime.length-1) * 12 * this.znInMonth
            return this.totalInNum;
        },
        //计算被保险人年度末年龄
        getNdmAge(){
            this.ndmAge = this.ndmAge > (this.bxTime-1) ? 0 : (this.bdnd == 1 ? this.age + 1 : this.ndmAge + 1);
            return this.ndmAge;
        },
        //计算保单年度
        getBdnd(){
            this.bdnd = this.bdnd > (this.bxTime-1) ? 0 : this.bdnd + 1;
            return this.bdnd;
        },
        //计算每年追加保费,追加方式按月计算
        getZjYear(){
            return 12 * ((this.ndmAge >= this.zjAgeStart && this.ndmAge <= this.zjAgeEnd) ? this.znInMonth : 0);
        },
        //计算趸交保费
        getDJ(){
            this.dj = this.bdnd > 1 ? 0 : this.dj;
            return this.dj;
        },
        pop() {
            this.popupShow = true;
        },
        hiden() {
            this.popupShow = false;
        },
        confirm(val) {
            this.inTime = val;
            this.popupShow = false;
        },
        sexPop() {
            this.sexPopShow = true;
        },
        sexHiden() {
            this.sexPopShow = false;
        },
        sexConfirm(val) {
            this.sex = val;
            this.sexPopShow = false;
        },
        agePop() {
            this.agePopShow = true;
        },
        ageHiden() {
            this.agePopShow = false;
        },
        ageConfirm(val) {
            this.age = val;
            this.agePopShow = false;
        }
    }
}
</script>
<style lang="less">
@import '../assets/css/yywy.css';
</style>
<style scoped>
.tabs >>> .van-tabs__wrap{
    border-radius: 10px;
}
</style>