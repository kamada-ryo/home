

// $("#date").datepicker({
//   //dateFormat...取得する日付の形式の設定
//   //dateFormat: 'yy年mm月dd日'
//   beforeShowDay: function(date){
//     if(date.getDay() == 0){
//       return [true,'sunday',''];
//     }
//   }
// });

//土日祝日
$.get("https://holidays-jp.github.io/api/v1/date.json", function(holidaysData) {
  $("#date").datepicker({
    beforeShowDay: function(date) {
      if (date.getDay() == 0) {
        return [true, 'day-sunday', null];
      } else if (date.getDay() == 6) {
        return [true, 'day-saturday', null];
      }

      var holidays = Object.keys(holidaysData);
      for (var i = 0; i < holidays.length; i++) {
        var holiday = new Date(Date.parse(holidays[i]));
        if (holiday.getYear() == date.getYear() &&
            holiday.getMonth() == date.getMonth() &&
            holiday.getDate() == date.getDate()) {
            return [true, 'day-holiday', null];
        }
      }

      return [true, 'day-weekday', null];
    }
  });
});

//定休日ありのもの
$.get("https://holidays-jp.github.io/api/v1/date.json", function(holidaysData) {
  $("#teikyu").datepicker({
    beforeShowDay:function(date){
      //日曜､土曜を判定し､classを設定し､色を変える
      if(date.getDay() == 0){
        //日曜
        return [true,'day-sunday',''];
      }else if(date.getDay() == 6){
        //土曜
        return [true,'day-saturday',''];
      }

      //毎週月曜､第3火曜日を定休日にする
      if(date.getDay() == 1){
        //月曜
        return [false,'',''];
      }else if(date.getDay() == 2 && date.getDate() > 14 && date.getDate() < 22){
        //第3火曜
        return [false,'',''];
      }
      
      //祝日にclassを設定し､色を変える
      let holidays = Object.keys(holidaysData);
      for (let i = 0; i < holidays.length; i++) {
        let holiday = new Date(Date.parse(holidays[i]));
        if (holiday.getYear() == date.getYear() &&
            holiday.getMonth() == date.getMonth() &&
            holiday.getDate() == date.getDate()) {
            return [true, 'day-holiday', ''];
        }
      }
      
      //上のもののうちどれにも当てはまらないものは通常の平日なのでそれをreturnする
      return [true,'',''];
    }
  });
});