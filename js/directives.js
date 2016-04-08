angular.module('jinr').directive('drawingTools',function(TouchEventServise){
	return {
		link : function(scope, element, attrs){
			var canvas = element[0].querySelector('canvas'),
				context = canvas.getContext('2d'),
				isDrawing = false;
			 
			scope.loadImage().then(
			function(data){
				var img = new Image();
				img.src = data;
				img.onload = function(){
					context.drawImage(this, 0, 0, canvas.width, canvas.height);
					init();
				}
			},
			function(){
				context.clearRect(0, 0, canvas.width, canvas.height);
				init();
			});
			function init(){
				context.strokeStyle = "#3E59C1";
				context.lineJoin = "round";
				context.lineWidth = 5;
				canvas.addEventListener(TouchEventServise.startEvent,startDrawing);
				canvas.addEventListener(TouchEventServise.moveEvent, drawing);
				document.addEventListener(TouchEventServise.endEvent, stopDrawing)
			};

			function startDrawing(e){
				var bounds = e.target.getBoundingClientRect();
				if (!e.offsetX) e.offsetX = e.touches[0].pageX - bounds.left;
		   		if (!e.offsetY) e.offsetY = e.touches[0].pageY - bounds.top;

				isDrawing = true;
				
				context.beginPath();
				context.moveTo(e.offsetX, e.offsetY);
				
			};
			function drawing(e){
				if (isDrawing == true)
				{
					var bounds = e.target.getBoundingClientRect();
					if (!e.offsetX) e.offsetX = e.touches[0].pageX - bounds.left;
			   		if (!e.offsetY) e.offsetY = e.touches[0].pageY - bounds.top;
					
					// Рисуем линию до новой координаты
					context.lineTo(e.offsetX, e.offsetY);
					context.stroke();
				}
			};
			function stopDrawing(e){
				if (isDrawing == true){
					context.lineTo(e.offsetX+3, e.offsetY+3);
					context.stroke();
				}
				
				isDrawing = false;
			};
			
		},
		controller : function($scope, $element){

			var canvas = $element[0].querySelector('canvas');
			var context = canvas.getContext('2d');
			$scope.saveImage = function(){
				return new Promise(function(resolve, reject){

					var data = canvas.toDataURL();
					var clear = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAMgCAYAAAAz4JsCAAAgAElEQVR4Xu3YMREAAAwCseLfdG38kCrgQid2jgABAgQIECBAgAABAgQIECBAgEBYYOFsohEgQIAAAQIECBAgQIAAAQIECBA4A5YnIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBDXcAqMAACAASURBVAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAg79BnDQAACPNJREFUQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIGLD8AAECBAgQIECAAAECBAgQIECAQFrAgJWuRzgCBAgQIECAAAECBAgQIECAAAEDlh8gQIAAAQIECBAgQIAAAQIECBBICxiw0vUIR4AAAQIECBAgQIAAAQIECBAgYMDyAwQIECBAgAABAgQIECBAgAABAmkBA1a6HuEIECBAgAABAgQIECBAgAABAgQMWH6AAAECBAgQIECAAAECBAgQIEAgLWDAStcjHAECBAgQIECAAAECBAgQIECAgAHLDxAgQIAAAQIECBAgQIAAAQIECKQFDFjpeoQjQIAAAQIECBAgQIAAAQIECBAwYPkBAgQIECBAgAABAgQIECBAgACBtIABK12PcAQIECBAgAABAgQIECBAgAABAgYsP0CAAAECBAgQIECAAAECBAgQIJAWMGCl6xGOAAECBAgQIECAAAECBAgQIEDAgOUHCBAgQIAAAQIECBAgQIAAAQIE0gIGrHQ9whEgQIAAAQIECBAgQIAAAQIECBiw/AABAgQIECBAgAABAgQIECBAgEBawICVrkc4AgQIECBAgAABAgQIECBAgAABA5YfIECAAAECBAgQIECAAAECBAgQSAsYsNL1CEeAAAECBAgQIECAAAECBAgQIGDA8gMECBAgQIAAAQIECBAgQIAAAQJpAQNWuh7hCBAgQIAAAQIECBAgQIAAAQIEDFh+gAABAgQIECBAgAABAgQIECBAIC1gwErXIxwBAgQIECBAgAABAgQIECBAgIAByw8QIECAAAECBAgQIECAAAECBAikBQxY6XqEI0CAAAECBAgQIECAAAECBAgQMGD5AQIECBAgQIAAAQIECBAgQIAAgbSAAStdj3AECBAgQIAAAQIECBAgQIAAAQIGLD9AgAABAgQIECBAgAABAgQIECCQFjBgpesRjgABAgQIECBAgAABAgQIECBAwIDlBwgQIECAAAECBAgQIECAAAECBNICBqx0PcIRIECAAAECBAgQIECAAAECBAgYsPwAAQIECBAgQIAAAQIECBAgQIBAWsCAla5HOAIECBAgQIAAAQIECBAgQIAAAQOWHyBAgAABAgQIECBAgAABAgQIEEgLGLDS9QhHgAABAgQIECBAgAABAgQIECBgwPIDBAgQIECAAAECBAgQIECAAAECaQEDVroe4QgQIECAAAECBAgQIECAAAECBAxYfoAAAQIECBAgQIAAAQIECBAgQCAtYMBK1yMcAQIECBAgQIAAAQIECBAgQICAAcsPECBAgAABAgQIECBAgAABAgQIpAUMWOl6hCNAgAABAgQIECBAgAABAgQIEDBg+QECBAgQIECAAAECBAgQIECAAIG0gAErXY9wBAgQIECAAAECBAgQIECAAAECBiw/QIAAAQIECBAgQIAAAQIECBAgkBYwYKXrEY4AAQIECBAgQIAAAQIECBAgQMCA5QcIECBAgAABAgQIECBAgAABAgTSAgasdD3CESBAgAABAgQIECBAgAABAgQIPK2xAyGuFEgaAAAAAElFTkSuQmCC';
					console.log(data === clear);
					if (data === clear){
 						reject();
					}
 					else{
						localStorage.setItem($scope.currentObject.id, data);
						//saveAsImage(canvas.toDataURL("image/png"), 'GuestBook_sign_'+$scope.currentObject.title_en+'.png');
						resolve();
					}
					
				});
				
			};

			$scope.clearImage = function(){
				context.clearRect(0, 0, canvas.width, canvas.height);
				localStorage.removeItem($scope.currentObject.id);
			}
			$scope.loadImage = function(){
				var flag = true;
				return new Promise(function(resolve, reject){
					var data = localStorage.getItem($scope.currentObject.id);
					if (data)  resolve(data); else reject();
				});
			};
		},
		templateUrl : 'drawingToolsTpl.html'
	}

});

angular.module('jinr').directive('jinrParticle',function(TouchEventServise, JINR_CONF){
	return {
		link : function( scope, element, attr ){

			var scene, camera, renderer, spotLight, controls, raycaster, particleObject = new THREE.Object3D(),
				sceneOptions = {
					width : window.innerWidth,
					height : window.innerHeight
				},
				sphereRadius = 3,
				spheres = [],
				isRendering = true,
				zoomCamera = false;

			
			if (scope.getData) 
				scope.getData().success(function(data){
				 	initScene(data);
				});
			scope.spheres = spheres;
			

			 // инициализация сцены
			 function initScene(data){
					
					scene = new THREE.Scene();
					camera = new THREE.PerspectiveCamera(35, sceneOptions.width / (sceneOptions.height), 0.6, 1000); // Define the perspective camera's attributes.
					camera.position.z = 45;
					
					attr.$observe('mode',function(val){
						if (val == 'normal'){
							zoomCamera = false;
							document.addEventListener(TouchEventServise.startEvent, onDocumentMouseDown, false);

						}
						else{
							zoomCamera = true;
							document.removeEventListener(TouchEventServise.startEvent, onDocumentMouseDown, false);							
						}
						
					});				
					

					renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ alpha: true }) : new THREE.CanvasRenderer({ alpha: true }); // Fallback to canvas renderer, if necessary.
					renderer.setClearColor(0xffffff, 0); // цвет сцены
			   		renderer.setSize(sceneOptions.width, sceneOptions.height); // размеры сцены
			   		 
			   		renderer.render(scene, camera);
			   		//var axes = new THREE.AxisHelper( 20 );
					//scene.add(axes);

					//свет
					light = new THREE.DirectionalLight( 0xffffff, 2, 70 );
				    scene.add(light);
			   		element[0].appendChild(renderer.domElement); // кидаем сцену на страницу

			   		var dX, dY;

			   		renderer.domElement.addEventListener('mousedown',function(e){ 
			   			 
			   			dX = e.offsetX;
			   			dY = e.offsetY;
			   		});
			   		renderer.domElement.addEventListener('mouseup',function(e){
		            	
		            	if (Math.abs(dX-e.offsetX)>20 || Math.abs(dY-e.offsetY)>20) return;
						
						var mouse = new THREE.Vector2();
						raycaster = new THREE.Raycaster();
		               // e.preventDefault();
		                mouse.x = ( e.offsetX / e.target.width ) * 2 - 1;
		                mouse.y = - ( e.offsetY / e.target.height ) * 2 + 1;
		                /* получил координаты мыши*/
		                raycaster.setFromCamera( mouse, camera );
						/*создал three.js - raycaster */
		                var intersects = raycaster.intersectObjects( spheres );
		 
		                if ( intersects.length > 0 ) {
		 
		                    if ( intersects != intersects[ 0 ].object ) {
		 
		                        INTERSECTED = intersects[ 0 ].object;
		                        //scene.remove(INTERSECTED);
		                        if (scope.chooseCurrentObject)  scope.$apply(scope.chooseCurrentObject(INTERSECTED.info));
		 
		                    }
		 
		                } else {
		 
		                    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
		 
		                    INTERSECTED = null;
		 
		                }
		 
		            });


		            for (var i in data){
		            	createSphere(data[i]);
		            }
		            
		            scene.add(particleObject);
		            //console.log(particleObject.quaternion);
		            renderer.render(scene, camera);
		            light.position.copy( camera.position );
				    animate();
				}

				// создание частицы

				function createSphere(item){

			    	var sphereGeometry = new THREE.SphereGeometry(sphereRadius,50,50);
			    	var texture = new THREE.ImageUtils.loadTexture(item.texture);
			    	var sphereMaterial = new THREE.MeshPhongMaterial({
			    		color: 0x777777,
			    		shininess : 100,
			    		//emissive : 0x111111,
			    		//wireframe : true,
			    		//needsUpdate : true,
			    		//_needsUpdate : true,
			    		metal : true,
			    		map: texture,

			    	});

			    	var lS = localStorage.getItem(item.id);
			    	if (lS) sphereMaterial.color.setHex(JINR_CONF.BRIGHT_HEX);

			    	sphereMaterial.needsUpdate = true;
			    	sphereMaterial._needsUpdate = true;
			    	
			    	var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
			    	sphere.name = item.id;
			    	if (item.position){
			    		sphere.position.x = item.position[0];
				    	sphere.position.y = item.position[1];
				    	sphere.position.z = item.position[2];
				    }
			    	if (item.rotation) {
			    		sphere.rotation.x = item.rotation[0] * Math.PI / 180;
			    		sphere.rotation.y = item.rotation[1] * Math.PI / 180;
			    		sphere.rotation.z = item.rotation[2] * Math.PI / 180;
			    	}
			    	 
			    	sphere.info = item;
			    	particleObject.add(sphere);
			    	spheres.push(sphere);
			    }

			    var Animation = {
			    		objectRotation : function(){
			    			var drag = 0.95, minDelta = 0.3;
							if (deltaX < -minDelta || deltaX > minDelta)
								deltaX *= drag;
							else
								deltaX = deltaX;

							if (deltaY < -minDelta || deltaY > minDelta)
								deltaY *= drag;
							else
							{
								deltaY = deltaY;
								deltaX = deltaX;
							}

							handleRotation();
				    	},
				    	cameraZooming : function(){
				    		if (zoomCamera) {
								if ((camera.position.x>-20)&&(camera.position.z<70)){
									camera.position.x -=2.5;
									camera.position.z += 2;
								}
								else{
									isRendering = false;
								}
							}
							else{
									isRendering = true;
									if ((camera.position.x<0)&&(camera.position.z>45)){
										camera.position.x +=2.5; 
										camera.position.z -= 2;
									}
								}
				    	}

			    }
				// render tick
				function animate() {
				   
					Animation.objectRotation();
					Animation.cameraZooming();
					if (isRendering) renderer.render(scene, camera);
					requestAnimationFrame( animate );
				}

				//for rotation
				var deltaX = 0,
					deltaY = 0;
				var rotationSpeed = 2;
				var mouseDown = false;
				var rotateStartPoint = new THREE.Vector3(0, 0, 1);
				var rotateEndPoint = new THREE.Vector3(0, 0, 1);
				var curQuaternion;
				var windowHalfX = window.innerWidth / 2;
				var windowHalfY = window.innerHeight / 2;
				var lastMoveTimestamp,
					moveReleaseTimeDelta = 50;
				var startPoint = {
					x: 0,
					y: 0
				};
				
				document.addEventListener(TouchEventServise.startEvent, onDocumentMouseDown, false);
				function onDocumentMouseDown(e)
				{
					if (!e.offsetX) e.offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
			   		if (!e.offsetY) e.offsetY = e.touches[0].pageY - e.touches[0].target.offsetTop;
					//e.preventDefault();

					document.addEventListener(TouchEventServise.moveEvent, onDocumentMouseMove, false);
					document.addEventListener(TouchEventServise.endEvent, onDocumentMouseUp, false);

					mouseDown = true;

					startPoint = {
						x: e.offsetX,
						y: e.offsetY
					};

					rotateStartPoint = rotateEndPoint = projectOnTrackball(0, 0);
				}

				function onDocumentMouseMove(e)
				{
					if (!e.offsetX) e.offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
			   		if (!e.offsetY) e.offsetY = e.touches[0].pageY - e.touches[0].target.offsetTop;

					deltaX = e.offsetX - startPoint.x;
					deltaY = e.offsetY - startPoint.y;

					handleRotation();

					startPoint.x = e.offsetX;
					startPoint.y = e.offsetY;

					lastMoveTimestamp = new Date();
				}

				function onDocumentMouseUp(e)
				{
					//var data= new Date();
					if (!e.offsetX) e.offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
			   			if (!e.offsetY) e.offsetY = e.touches[0].pageY - e.touches[0].target.offsetTop;

					if (new Date().getTime() - lastMoveTimestamp.getTime() > moveReleaseTimeDelta)
					{
						deltaX = e.offsetX - startPoint.x;
						deltaY = e.offsetY - startPoint.y;
					}

					mouseDown = false;

					document.removeEventListener(TouchEventServise.moveEvent, onDocumentMouseMove, false);
					document.removeEventListener(TouchEventServise.endEvent, onDocumentMouseUp, false);
				}

				function projectOnTrackball(touchX, touchY)
				{
					var mouseOnBall = new THREE.Vector3();

					mouseOnBall.set(
						clamp(touchX / windowHalfX, -1, 1), clamp(-touchY / windowHalfY, -1, 1),
						0.0
					);

					var length = mouseOnBall.length();

					if (length > 1.0)
					{
						mouseOnBall.normalize();
					}
					else
					{
						mouseOnBall.z = Math.sqrt(1.0 - length * length);
					}

					return mouseOnBall;
				}

				function rotateMatrix(rotateStart, rotateEnd)
				{
					var axis = new THREE.Vector3(),
						quaternion = new THREE.Quaternion();

					var angle = Math.acos(rotateStart.dot(rotateEnd) / rotateStart.length() / rotateEnd.length());

					if (angle)
					{
						axis.crossVectors(rotateStart, rotateEnd).normalize();
						angle *= rotationSpeed;
						quaternion.setFromAxisAngle(axis, angle);
					}
					return quaternion;
				}

				function clamp(value, min, max)
				{
					return Math.min(Math.max(value, min), max);
				}


				function handleRotation()
				{
					rotateEndPoint = projectOnTrackball(deltaX, deltaY);
					var rotateQuaternion = rotateMatrix(rotateStartPoint, rotateEndPoint);
					curQuaternion = particleObject.quaternion;
					curQuaternion.multiplyQuaternions(rotateQuaternion, curQuaternion);
					curQuaternion.normalize();
					particleObject.setRotationFromQuaternion(curQuaternion);
					rotateEndPoint = rotateStartPoint;
				};


		}
		 
	}
});





 

 

