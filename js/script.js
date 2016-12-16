$(document).ready(function(){

	var City = 'shanghai';

	$('#main select[name=city]').change(function(event) {	
		$(' #wrapper1').remove();	
		var city = $(this).val();

		City = city;
		ajax();

	});

	function ajax(){
		$.ajax({
			url:'https://free-api.heweather.com/v5/forecast',
			type:'GET',
			dataType:'json',
			data:{key:'3ac44d1e27dd4922b48ce4cd68d41dd2',city:City}
		})
		.done(function(data){
			var basic = data.HeWeather5[0].basic;
			var forecast = data.HeWeather5[0].daily_forecast;
			var loc = (basic.update.loc).substring(10);
			var max = parseInt(forecast[0].tmp.max)
			var min = parseInt(forecast[0].tmp.min)
			var tmp  = parseInt((max + min) / 2) ;
			var state = forecast[0].cond.txt_d;
			var wind = forecast[0].wind.dir;
			var tstate = forecast[1].cond.txt_d;
			var tmax = parseInt(forecast[1].tmp.max);
			var tmin = parseInt(forecast[1].tmp.min);
			var lstate = forecast[2].cond.txt_d;
			var lmax = parseInt(forecast[2].tmp.max);
			var lmin = parseInt(forecast[2].tmp.min);
			var main = $('#main');
		
			$.each(data, function(index, val) {
				$('#main #wrapper1').remove();
				html = '<div id="wrapper1" class="wrapper">';
				html += '	<div class="nav">';
				html += '		<h1>' + basic.city + '</h1>';
				html += '	<p>' + loc + '发布</p>';
				html +=	'	</div>';
				html += '	<div id="pic"></div>';
				html += '	<div id="tem">';
				html += '		<p id="p1">' + tmp + '°</p>';
				html += '		<p id="p2">' + state + '</p>';
				html += '	</div>';
				html += '	<div id="circle">' + tmp + '度' + state + '</div>';
				html += '	<ul>';
				html += '		<li>';
				html += '			' + wind + '';
				html += '			<p>' + forecast[0].wind.sc + '级 </p>';
				html += '		</li>';
				html += '		<li>';
				html += '			降水概率';
				html += '			<p>' + forecast[0].pop + '</p>';
				html += '		</li>';
				html += '		<li>';
				html += '			相对湿度';
				html += '			<p>' + forecast[0].hum + '%</p>';
				html += '		</li>';
				html += '	</ul>';
				html += '	<div id="line"></div>';
				html += '	<div id="td" class="time">';
				html += '		今天';
				html += '		<p>' + state + '</p>';
				html += '		<p>' + min + '/' + max+ '</p>';
				html += '	</div>';
				html += '	<div id="tm" class="time">';
				html += '		明天';
				html += '		<p>' + tstate + '</p>';
				html += '		<p>' + tmin + '/' + tmax + '</p>';
				html += '	</div>';
				html += '	<div id="la" class="time">';
				html += '		后天';
				html += '		<p>' + lstate + '</p>';
				html += '		<p>' + lmin + '/' + lmax + '</p>';
				html += '	</div>';
				html +='</div>'
				// 追加到容器中
				main.append(html);
				if(state == '晴'){
					$('#pic').css('background-image','url(img/1.png)')
				} else if(state == '雨'){
					$('#pic').css('background-image','url(img/2.png)')
				} else if(state == '阴'){
					$('#pic').css('background-image','url(img/3.png)')
				}
		
			});
		
		})
		.fail(function(){
			// console.log("error");
		})
		.always(function(){
			// console.log("complete");
		})
	
	}
		setInterval(function(){
			$('#main').show('slow')	
			$('.loading').hide('slow');
				ajax();
			
		},3000);
});

	
