//Jquery AKA AJAX searching patern

$(document).ready(function(){
//Products Search
	$("#productPullReq").keyup(function(){
		var productPullReq = $("#productPullReq").val();
		$.get("/products/search/" + productPullReq, function(results){
			$("#reqProductsOutPut").html(results);
		});
	});	

					//Category Search
		$("#pullCatNameReq").keyup(function(){
		var pullCatNameReq = $("#pullCatNameReq").val();
			$.get("/productsCategories/search/" + pullCatNameReq, function(results){
				$("#reqCategoriesOutPut").html(results);
				
			});
		});
				// sales search
		$("#pullProductsEarnings").keyup(function(){
		var pullProductsEarnings = $("pullProductsEarnings").val();
			$.get("/sales/search/" + pullProductsEarnings, function(results){
				$("#reqSumOfProductsEarningsOutPut").html(results);

			})
		})

});	

