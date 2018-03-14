// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * 喝水，一次一杯
 * @param date
 * @param showWater
 */
function drinkWater(date, showWater) {

    let leftWater = showWater.innerHTML-1;
    saveWater(date,leftWater);
    showWater.innerHTML = leftWater;
}

/**
 * 今日剩余水杯数
 * @param date
 * @param callback
 */
function getLeftWater(date, callback) {

    chrome.storage.sync.get(date, (items) => {

        callback(chrome.runtime.lastError ? null : items[date]);
  })
}

/**
 * 保存剩余水杯数
 * @param date
 * @param leftWater
 */
function saveWater(date, leftWater) {
    let items = {};
    items[date] = leftWater;
    console.log(items);
    chrome.storage.sync.set(items);
}

document.addEventListener('DOMContentLoaded', () => {
    let showWater = document.getElementById('left-water');
    let dropdown = document.getElementById('dropdown');

    let date = getDate();

    getLeftWater(date,(leftWater) => {
        if(leftWater){
            // 展示剩余应喝的杯数
            console.log(showWater);
            showWater.innerHTML = leftWater;
        }else {
            // 初始化当天该喝水8杯
            saveWater(date,8);
        }
    });

    dropdown.addEventListener('click', () => {
        drinkWater(date, showWater);
    });
});

/**
 * 获取当前日期 YYYY-mm-dd
 * @returns {string}
 */
function getDate() {
    // 获取当前日期
    let date = new Date();

    // 获取当前月份
    let nowMonth = date.getMonth() + 1;

    // 获取当前是几号
    let strDate = date.getDate();

    // 添加分隔符“-”
    let seperator = "-";

    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }

    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    return date.getFullYear() + seperator + nowMonth + seperator + strDate;
}
