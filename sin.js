$(document).ready(function() {
	var Scale = false, Info = false;
	
	JXG.Options.axis.ticks.majorHeight = 5;
	JXG.Options.axis.ticks.insertTicks = false;
	JXG.Options.axis.ticks.ticksDistance = 1;
	
	var board = JXG.JSXGraph.initBoard('graph', {
		axis : true,
		zoom: {
               factorX: 1.25,factorY: 1.25,wheel: true,needshift: true,eps: 0.1
               },
		showCopyright : false,
		boundingbox : [-12, 6, 12, -6],
		showNavigation : false,
		keepaspectratio : false,
		scalable:true
	});
/*	xaxis = board.create('axis', [[0, 0], [1,0]], 
		  {name:'x', 
			withLabel: true, 
			label: {position: 'rt',  // possible values are 'lft', 'rt', 'top', 'bot'
					 offset: [-15, 20]   // (in pixels)
					 }
			});
   yaxis = board.create('axis', [[0, 0], [0,1]], 
		  {name:'y', 
			withLabel: true, 
			label: {position: 'top',  // possible values are 'lft', 'rt', 'top', 'bot'
					 offset: [-15, 300]   // (in pixels)
					 }
			});*/

	board.clearTraces();
	var defaultGraph = board.create('functiongraph', [
	function(t) {
		var A = $("#valueA").val();
		var B = $("#valueB").val();
		var C = $("#valueC").val();
		var D = $("#valueD").val();

		$("#equationSelector span").html(A + "Sin(" + B + "x)");
		return (A * Math.sin(B * t));
	}, -10, 10], {
		firstArrow : true,
		lastArrow : true
	});

	var point = board.create('point', [0, 0], {
		slideObject : defaultGraph,
		showInfobox : false
	});

	point.on('drag', function(e) {
		var x = Math.round(point.coords.usrCoords[1] * 100) / 100;
		var y = Math.round(point.coords.usrCoords[2] * 100) / 100;
		$("#coordinates span").html("( " + x + ", " + y + " )");
	});

	var id = $("select option:selected")[0].id;
	$("select").change(function(e) {

		id = $("select option:selected")[0].id;
		createGraph(id);
		

	});

	function createGraph(id) {

		var A = $("#valueA").val();
		var B = $("#valueB").val();
		var C = $("#valueC").val();
		var D = $("#valueD").val();

		var currentGraph;

		switch(id) {
			case '1':
				clearAll();
				$("#C").hide();
				$("#D").hide();
				currentGraph = board.create('functiongraph', [
				function(t) {
					return (A * Math.sin(B * t));
				}, -10, 10], {
					firstArrow : true,
					lastArrow : true
				});
				$("#equationSelector span").html("y = " + A + "sin(" + B + "x)");
				break;

			case '2':
				clearAll();
				$("#C").hide();
				$("#D").hide();
				currentGraph = board.create('functiongraph', [
				function(t) {
					return (A * Math.cos(B * t));
				}, -10, 10], {
					firstArrow : true,
					lastArrow : true
				});
				$("#equationSelector span").html("y = " + A + "cos(" + B + "x)");
				break;
			case '3':
				clearAll();
				$("#C").show();
				$("#D").hide();
				currentGraph = board.create('functiongraph', [
				function(t) {
					return (A * Math.sin(B * t - C));
				}, -10, 10], {
					firstArrow : true,
					lastArrow : true
				});
				$("#equationSelector span").html("y = " + A + "sin(" + B + "x-" + C + ")");
				break;
			case '4':
				clearAll();
				$("#C").show();
				$("#D").hide();
				currentGraph = board.create('functiongraph', [
				function(t) {
					return (A * Math.cos(B * t - C));
				}, -10, 10], {
					firstArrow : true,
					lastArrow : true
				});
				$("#equationSelector span").html("y = " + A + "cos(" + B + "x-" + C + ")");
				break;
			case '5':
				clearAll();
				$("#D").show();
				$("#C").hide();
				currentGraph = board.create('functiongraph', [
				function(t) {
					return ((A * Math.sin(B * t)) + D / 1);
				}, -10, 10], {
					firstArrow : true,
					lastArrow : true
				});
				$("#equationSelector span").html("y = " + A + "sin(" + B + "x)+ " + D);
				break;
			case '6':
				clearAll();
				$("#D").show();
				$("#C").hide();
				currentGraph = board.create('functiongraph', [
				function(t) {
					return ((A * Math.cos(B * t)) + D / 1);
				}, -10, 10], {
					firstArrow : true,
					lastArrow : true
				});
				$("#equationSelector span").html("y = " + A + "cos(" + B + "x)+ " + D);
				break;
			case '7':
				clearAll();
				$("#C").show();
				$("#D").show();
				currentGraph = board.create('functiongraph', [
				function(t) {
					return ((A * Math.sin(B * t - C)) + D / 1);
				}, -10, 10], {
					firstArrow : true,
					lastArrow : true
				});
				$("#equationSelector span").html("y = " + A + "sin(" + B + "x-" + C + ")+ " + D);
				break;
			case '8':
				clearAll();
				$("#C").show();
				$("#D").show();
				currentGraph = board.create('functiongraph', [
				function(t) {
					return ((A * Math.cos(B * t - C)) + D / 1);
				}, -10, 10], {
					firstArrow : true,
					lastArrow : true
				});
				$("#equationSelector span").html("y = " + A + "cos(" + B + "x-" + C + ")+ " + D);
				break;

		}
		if (Info == true){
			InfoOn();
		}
		var point1 = board.create('point', [0, 0], {
			slideObject : currentGraph,
			showInfobox : false
		});
		var x = Math.round(point1.coords.usrCoords[1] * 100) / 100;
		var y = Math.round(point1.coords.usrCoords[2] * 100) / 100;
		$("#coordinates span").html("( " + x + ", " + y + " )");
		point1.on('drag', function(e) {
			var x = Math.round(point1.coords.usrCoords[1] * 100) / 100;
			var y = Math.round(point1.coords.usrCoords[2] * 100) / 100;
			$("#coordinates span").html("( " + x + ", " + y + " )");
		});

	}

	function change() {
		//clearAll();
		createGraph(id);
		if (Info == true){
			InfoOn();
		}
	}

	function clearAll() {
		if (Scale == false) {

			//JXG.JSXGraph.freeBoard(board);
			board = JXG.JSXGraph.initBoard('graph', {
				axis : true,
				grid : false,
				zoom: {
               factorX: 1.25,factorY: 1.25,wheel: true,needshift: true,eps: 0.1
               },
				showCopyright : false,
				boundingbox : [-12, 6, 12, -6],
				keepaspectratio : true,
				showNavigation : false
			});
		} else {
			//JXG.JSXGraph.freeBoard(board);
			board = JXG.JSXGraph.initBoard('graph', {
				axis : false,
				grid : false,
				showCopyright : false,
				zoom: {
               factorX: 1.25,factorY: 1.25,wheel: true,needshift: true,eps: 0.1
               },
				boundingbox : [-12, 6, 12, -6],
				keepaspectratio : true,
				showNavigation : false
			});
			var xaxis = board.create('axis', [[0, 0], [1, 0]], {
				needsRegularUpdate : false,
				withLabel : true,
				ticks : {
					label : {
						offset : [-10, -10]
					},
					scale : Math.PI,
					scaleSymbol : '&#928;'
				}
			});

			var yaxis = board.create('axis', [[0, 0], [0, 1]], {
				needsRegularUpdate : false,
				ticks : {
					label : {
						offset : [10, 0]
					}
				}
			});

			var xTicks, bb, yTicks;
			xaxis.defaultTicks.ticksFunction = function() {
				return xTicks;
			};
			yaxis.defaultTicks.ticksFunction = function() {
				return yTicks;
			};
			board.fullUpdate();
			var setTicks = function() {
				bb = board.getBoundingBox();
				xTicksVal = Math.pow(10, Math.floor((Math.log(0.2 * (bb[2] - bb[0]))) / Math.LN10));
				xTicks = xTicksVal*0.5;
			
				
				yTicksVal = Math.pow(10, Math.floor((Math.log(0.6 * (bb[1] - bb[3]))) / Math.LN10));
				yTicks = yTicksVal;
				board.fullUpdate();

			}
			setTicks();
		}
		board.clearTraces();
	}


	$("#s").slider({

		range : true,
		min : -5,
		max : 5,
		step : 0.1,
		value : [1],
		slide : function(event, ui) {
			$("#valueA").val(ui.value);
			change();
		}
	});
	$("#t1").slider({

		range : true,
		min : -5,
		max : 5,
		step : 0.1,
		value : [1],
		slide : function(event, ui) {
			$("#valueB").val(ui.value);
			change();
		}
	});
	$("#u").slider({

		range : true,
		min : -5,
		max : 5,
		step : 0.1,
		value : [1],
		slide : function(event, ui) {
			$("#valueC").val(ui.value);
			change();
		}
	});
	$("#v").slider({

		range : true,
		min : -5,
		max : 5,
		step : 0.1,
		value : [1],
		slide : function(event, ui) {
			$("#valueD").val(ui.value);
			change();
		}
	});
/*	JXG.Options = JXG.deepCopy(JXG.Options, {
		showNavigation : false,
		scalable:true,

		navbar : {
			strokeColor : '#bbb',
			fillColor : 'none'
		},

		elements : {
			strokeColor : '#6BBA70',
			highlightStrokeColor : '#84e68a',
			strokeOpacity : 0.6,
		},

		point : {
			face : 'o',
			size : 4,
			fillColor : '#eeeeee',
			highlightFillColor : '#eeeeee',
			strokeColor : 'white',
			highlightStrokeColor : 'white',
			showInfobox : false
		}
	});*/

	$("#btnScale").click(function() {
                   

		if (Scale == false) {
			Scale = true;
			clearAll();
			createGraph(id);
		} else {
			Scale = false;
			clearAll();
			createGraph(id);
		}
		
		if (Info == true){
			InfoOn();
		}
	});

	$("#btnInfo").click(function() {
		
		
		if (Info == false) {
			Info = true;
			clearAll();
			createGraph(id);
			$(".inf").show();
			InfoOn();
		} else {
			Info = false;
			clearAll();
			createGraph(id);
			$(".inf").hide();
		}
		

	});

	function InfoOn() {
		var A = Math.abs($("#valueA").val());
		var B = Math.abs($("#valueB").val());
		var D = $("#valueD").val();
		
		var C = (2 * Math.PI) / B;
         if(id<=4){
         	console.log(A);
       	board.create('line', [[12, A], [-12, A]], {
			straightFirst : false,
			straightLast : false,
			isDraggable:false,
			strokeWidth : 2,
			dash : 2
		});
		board.create('line', [[12, -A], [-12, -A]], {
			straightFirst : false,
			straightLast : false,
			isDraggable:false,
			strokeWidth : 2,
			dash : 2
		});
		board.create('line', [[-8, 0], [-8, A]], {
			straightFirst : false,
			straightLast : false,
			isDraggable:false,
			strokeWidth : 2,
			firstArrow : true,
			lastArrow : true,
			strokeColor : '#000000',
			withLabel:true,
			label : {
						offset : [5, 25*A]
					},
			name : 'Amplitude'
			
		});
		board.create('line', [[0, -A - 0.2], [C, -A - 0.2]], {
			straightFirst : false,
			straightLast : false,
			strokeWidth : 2,
			firstArrow : true,
			lastArrow : true,
			strokeColor : '#000000',
			withLabel:true,
			label : {
						offset : [23*C, -15]
					},
			name : 'Period'
		});
       }
	  else{
	  		
		board.create('line', [[12,parseFloat(D)], [-12, parseFloat(D)]], {
			straightFirst : false,
			straightLast : false,
			isDraggable:false,
			strokeWidth : 2,
			dash : 2
		});
		console.log("A", A, "D", D,"typeOf(D)", typeof(D), "A+D", (parseInt(A)+parseInt(D)));		
		board.create('line', [[12, parseFloat(A)+parseFloat(D)], [-12, parseFloat(A)+parseFloat(D)]], {
			straightFirst : false,
			straightLast : false,
			isDraggable:false,
			strokeWidth : 2,
			dash : 2
		});
		board.create('line', [[12, -(parseFloat(A)-parseFloat(D))], [-12, -(parseFloat(A)-parseFloat(D))]], {
			straightFirst : false,
			straightLast : false,
			isDraggable:false,
			strokeWidth : 2,
			dash : 2
		});
		
		board.create('line', [[-8, parseFloat(D)], [-8, (parseFloat(A)+parseFloat(D))]], {
			straightFirst : false,
			straightLast : false,
			strokeWidth : 2,
			firstArrow : true,
			lastArrow : true,
			strokeColor : '#000000',
			withLabel:true,
			label : {
						offset : [5, 25*A]
					},
			name : 'Amplitude'
			
		});
		board.create('line', [[0, -(A-D) - 0.2], [C, -(A-D) - 0.2]], {
			straightFirst : false,
			straightLast : false,
			strokeWidth : 2,
			firstArrow : true,
			lastArrow : true,
			strokeColor : '#000000',
			withLabel:true,
			label : {
						offset : [23*C, -15]
					},
			name : 'Period'
		});
	  	
	  }
	  $("#amp").html(Math.round(A*100)/100);
	  $("#per").html(Math.round(C*100)/100);
	}
    $(window).resize(function(){
    	 board.setBoundingBox([-12, 6, 12, -7], false);
    	 board.fullUpdate();
    	 //board.updateRenderer();
    	
    });
});
