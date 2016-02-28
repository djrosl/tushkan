var calendarUtil = {

	// Возвращат количество дней в месяце по конкретному году		
	getDaysInMonth: function(m, y) {
		var days = [31, (y % 4 == 0 && y % 100 != 0 || y % 400 == 0)?29:28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		return days[m-1];
	},
	
	displayAvailableDays: function(daySelector, monthSelector, yearSelector){	
		var monthNum = parseInt($(monthSelector).val());
		if(monthNum && parseInt($(yearSelector).val())){					
			var days_in_month = this.getDaysInMonth(monthNum, $(yearSelector).val());	
			var diff = $(daySelector + ' option').size() - 32;									
			var indx = days_in_month + diff;		

			$(daySelector + ' option').slice(0, indx + 1).removeClass('hidden-for-calendar');
			$(daySelector + ' option').slice(indx + 1).addClass('hidden-for-calendar');					
			if(parseInt($(daySelector).val()) > days_in_month) {
				$(daySelector).val(days_in_month);
			}
		} else {
			$('option',daySelector).slice(0, indx).removeClass('hidden-for-calendar');
		}		
	},

	setAvailableDays: function(daySelector, monthSelector, yearSelector){
		var $this = this;				
		$this.displayAvailableDays(daySelector, monthSelector, yearSelector);					
		$("select").filter(monthSelector +','+ yearSelector).on('change',(function(){				
			$this.displayAvailableDays(daySelector, monthSelector, yearSelector);					
		}));
	}
}