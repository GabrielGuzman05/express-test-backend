const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
app.use(express.json())

app.use(cors())

app.use(bodyParser.urlencoded({
	extended: true
  }));

app.get('/', (req, res) => {
	res.send('Alive');
})

app.post('/', (req, res) => {
	console.log(req.body);
	console.log('Post done');
})

app.listen(port, () => {
	console.log('Live in port '+port);
})

app.post('/xmlgraph', (req, res) => {
	Navigate(req.body.mxGraphModel)
	console.log('Post done');
})

Navigate = function(graphModel){
	console.log(graphModel);
	console.log(graphModel[0].root);
	console.log();
	var nodes = [];
	var links = [];
	if (graphModel[0].root[0].mxCell.slice(2).length>=1){
	for (var element of graphModel[0].root[0].mxCell.slice(2)){
		
		if (element._attr.vertex != null){
			nodes.push(element);
		}else{
			links.push(element);
		}
	}
	}else{ 
		console.log("Diagrama Vacio");
	}
	console.log(graphModel[0].root[0].object.length);
	if (graphModel[0].root[0].object.length>=1){
		for (var element of graphModel[0].root[0].object){
			if (element.mxCell[0]._attr.vertex != null){
				nodes.push(element);
			}else{
				links.push(element);
			}
			
		}
	}else {console.log("No objetos personalizados");}
	console.log('Link:');
	console.log(links);
	console.log('Nodos:');
	console.log(nodes);
	console.log();
	
	for (var element of nodes){
		for (var auxLink of links){
			if(auxLink._attr.source._value==element._attr.id._value){
				for (var auxNode of nodes){
					if(auxLink._attr.target._value==auxNode._attr.id._value){
						var nodeA = element._attr.label?._value ?? element._attr.value._value;
						var nodeB = auxNode._attr.label?._value ?? auxNode._attr.value._value;
						console.log(nodeA+' --> '+nodeB);
					}
				}
				break;
			}
		}
		
		if(element._attr.UltimoElemento?._value){
			console.log('El '+element._attr.label._value+' es el ultimo elemento del diagrama');
			element._attr.UltimoElemento._value = false;
		}
	}
	
	console.log(graphModel[0].root[0].object[0]._attr.UltimoElemento?._value);
}