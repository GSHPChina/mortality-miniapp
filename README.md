# 死亡概率预测系统 - 抖音小程序版

## 项目简介

这是一个基于流行病学数据的个体死亡概率预测系统，已适配抖音小程序。

## 功能特点

- 100种死因精准分析
- 预计剩余寿命计算
- 死亡概率预测（1年/5年/10年/20年）
- 与同龄人风险对比
- 可改变因素分析

## 使用方法

1. 下载并安装 [抖音开发者工具](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/overview)

2. 打开抖音开发者工具，选择"导入项目"

3. 选择本项目文件夹 `C:\Users\GSHP\mortality-miniapp`

4. 在 `project.config.json` 中填入你的小程序 AppID

5. 点击"编译"即可预览

## 项目结构

```
mortality-miniapp/
├── app.js              # 小程序入口
├── app.json            # 小程序配置
├── app.ttss            # 全局样式
├── project.config.json # 项目配置
├── pages/
│   ├── index/          # 首页
│   ├── step1/          # 基本信息
│   ├── step2/          # 疾病史
│   ├── step3/          # 生活方式
│   ├── step4/          # 环境因素
│   └── result/         # 预测结果
└── utils/
    ├── config.js       # 配置参数
    └── calculator.js   # 计算引擎
```

## 发布流程

1. 在抖音开发者工具中点击"上传"
2. 填写版本号和更新说明
3. 登录 [抖音开放平台](https://open.douyin.com/) 提交审核
4. 审核通过后即可发布

## 数据来源

- 全球疾病负担研究（GBD 2019）
- WHO全球健康观察
- 中国死因监测数据集
- 中国国家癌症中心年报

## 免责声明

本工具基于统计模型和公开流行病学数据，仅供参考，不构成任何医学建议或临床诊断。个体健康状况请咨询专业医疗人员。
