$(document).ready(function(){
	//全选、全不选、反选
	$("#selectAll").click(function(){
		$("[type='checkbox']").each(function(){
			$(this).get(0).checked = true;
		});
	});
	$("#unSelect").click(function(){
		$("[type='checkbox']").each(function () {
			$(this).removeAttr("checked");
		})
	});
	$("#reverse").click(function(){
		$("[type='checkbox']").each(function () {
			if($(this).is(':checked')) {
				$(this).removeAttr("checked");
			} else {
				$(this).get(0).checked = true;
			}
		})
	});

	//地区二级联动
	var allCities = new Map();
	allCities.set("--请选择--", new Array("--请选择--"));
	allCities.set("上海", new Array("--请选择--","杨浦","嘉定","静安","黄浦","徐汇"));
	allCities.set("内蒙", new Array("--请选择--","包头","呼和浩特","赤峰","乌海","东胜"));
	allCities.set("广东", new Array("--请选择--","广州","深圳","珠海","佛山","茂名"));

	$("#province").change(function(){
		var province = $("#province").val();
		var cities = allCities.get(province);
		$("#city").empty();
		for (i in cities) {
			$("#city").append('<option value="' + cities[i] + '">' + cities[i] + '</option>');
		}
	});

	//月日二级联动
	for (var i = 1940; i <= 2015; i++) {
		$("#year").append('<option value="' + i + '">' + i + '</option>');
	};
	for (var i = 1; i <= 12; i++) {
		$("#month").append('<option value="' + i + '">' + i + '</option>');
	};
	function changeDays(e){
		var year = $("#year").val();
		var month = $("#month").val();
		$("#day").empty();
		$("#day").append('<option value="--请选择--">--请选择--</option>');
		var days = 30;
		if (month == 2) {
			if (year%2==0) {
				days--;
			} else {
				days = 28;
			}
		} else if (month == 1|3|5|7|8|10|12) {
			days++;
		}
		for (var i = 1; i <= days; i++) {
			$("#day").append('<option value="' + i + '">' + i + '</option>');
		};
	}
	$("#month").on('change', changeDays);
	$("#year").on('change', changeDays);
});