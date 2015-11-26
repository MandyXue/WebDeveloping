function deleteDr(clickTd){  
	var tr = $(clickTd).parent().parent();
	tr.remove();
}

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

	//填表
	$("#submit").click(function(e){
		var username = $("[id='username']").val();
		var email = $("[id='email']").val();
		var password = $("[id='password']").val();
		var password2 = $("[id='password2']").val();
		if (username == "" || email == "" || password2 == "" || password == "") {
			$('#myModal1').modal('show');
		} else {
			if (password2 != password) {
				alert("两次密码输入不一致");
			} else {
				//show table
				$("#result").show();
				//scroll
	            $("html, body").animate({
	                scrollTop: $(document).height()
	            }, "slow");
	            //get info
				//通过名字获取  getElementsByName
				var gender = "未选择";
				var obj = document.getElementsByName("gender");
			    for(var i=0; i<obj.length; i ++){
			        if(obj[i].checked){
			            gender = obj[i].value;
			        }
			    }
				var province = $("[id='province']").val();
				var city = $("[id='city']").val();
				var year = $("[id='year']").val();
				var month = $("[id='month']").val();
				var day = $("[id='day']").val();
				var hobby = "";
				$("[type='checkbox']").each(function () {
					if ($(this).get(0).checked == true) {
						hobby = hobby + $(this).val() + " ";
					};
				});
				var lines = $("#tbody tr").length;
				//print info
				$("#tbody").append('<tr>'+
										'<td>'+username+'</td>'+
										'<td>'+email+'</td>'+
										'<td>'+gender+'</td>'+
										'<td>'+province+'省（直辖市）'+city+'市（区）'+'</td>'+
										'<td>'+year+'年'+month+'月'+day+'日'+'</td>'+
										'<td>'+hobby+'</td>'+
										'<td><button type="button" class="btn btn-danger btn-sm" id="delete" onclick="deleteDr(this);">删除此条</button></td>'+
									'</tr>');
			}
		}
	});
});

