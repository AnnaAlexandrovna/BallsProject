class List{
	select = null;
	preselect = null;
	values=null;
	tableInfo = null;

	constructor(values, tableInfo){
		this.values = values;
		this.tableInfo = tableInfo;
		if (document.getElementById('win')){
			document.getElementById('win').remove();
		}
		this.createWin();
		this.createTitleOfTable();
		this.createLines();
		this.events();
		//this.addListnersOfOwnEvent();
	}

	createWin(){
		this.win = document.createElement("DIV");
		this.win.id = 'win';
		this.win.style.position = "absolute";
		this.win.style.left = "2%";
		this.win.style.top = "2%";
		this.win.style.width = "32%";
		this.win.style.background = "#ffffff";
		this.win.style.border = "1px solid #555555";
		this.win.style.opacity = 0.8;
		this.win.style.zIndex = 5000;
		this.win.style.boxShadow = "0px 0px 10px #555555";
		this.win.style.padding = "5px";
		document.body.appendChild(this.win);
	}

// addListnersOfOwnEvent(){
// 	this.mainElement.addEventListener("Предвыбор элемента списка", function(event){console.log("Событие - Предвыбор элемента списка");});
// 	this.mainElement.addEventListener("Выбор элемента списка", function(event){console.log("Событие - Выбор элемента списка");});
// }

	createTitleOfTable(){ 
		this.mainElement = document.createElement("div");
		let rowOftable = '';
		//проверяем не пустой ли список, заполняем ключами объектов списка строки таблицы
		if (this.tableInfo.length){
			for(let i=0; i<this.tableInfo.length; i++){
				rowOftable = document.createElement("div");
				rowOftable.innerHTML = this.tableInfo[i]['title'];
				rowOftable.style.display = "inline-block";
				rowOftable.style.width = this.tableInfo[i]['width'];
				rowOftable.style["text-align"] = "center";
				this.mainElement.appendChild(rowOftable);
		}
		}
		this.mainElement.style.border = "1px solid #555555"; 
		this.mainElement.style.padding = '10';
		this.win.appendChild(this.mainElement);
	}

updateLines(){

	for (let i =0; i<this.values.length; i++){
		if (this.values[i].row.id == this.select){
			let row = document.querySelectorAll('[data-index]')[this.select];
			row.style.background = '#C00000';
			row.style.color = '#ffffff';
		} 
		else if (this.values[i].row.id == this.preselect){
			let row = document.querySelectorAll('[data-index]')[this.preselect];
			row.style.background = '#fce4d6';
		} else {
			let row = document.querySelectorAll('[data-index]')[this.values[i].row.id];
			row.style.background = '#ffffff';
         	row.style.color = 'black';
		}
	}


}

createLine(index){
	let newTableRow = document.createElement("div");
	newTableRow.dataset["index"]= index;
	newTableRow.dataset['action']='writeInfo';
	
	for (let i=0; i<this.tableInfo.length; i++){
		this.values[index].row = document.createElement("div");
		let field = this.tableInfo[i]["field"];
		this.values[index].row.innerHTML=this.values[index][field];
		this.values[index].row.style.display = "inline-block";
		this.values[index].row.style.width = this.tableInfo[i]["width"];
		this.values[index].row.style["text-align"] = "center";
		this.values[index].row.id = index;
		newTableRow.appendChild(this.values[index].row);
	}
	this.mainElement.appendChild(newTableRow);
}

writeInfo(){
	let logIngo = "";
	for(let i=0; i<this.tableInfo.length;i++){
		let title = this.tableInfo[i]['title'];
		let field = this.tableInfo[i]['field'];
		logIngo = logIngo + title + " - " + this.values[this.select][field] +"; ";
	}
	console.log(logIngo);
}

events(){
	this.mainElement.onmouseover = (event) =>{
		this.preselect = event.path[0].parentElement.dataset.index;
		let ownEvent = new Event ("Предвыбор элемента списка",{bubbles: true});
		//console.log(this.mainElement);
		this.mainElement.dispatchEvent(ownEvent);
		this.updateLines();
	}

	this.mainElement.onclick = (event) =>{
		this.select = event.path[0].parentElement.dataset.index;
		let ownEvent = new Event ("Выбор элемента списка",{bubbles: true});
		this.mainElement.dispatchEvent(ownEvent);
		this.updateLines();
		if (event.path[0].parentElement.dataset['action']=='writeInfo'){
		this.writeInfo();
	}
	}

	document.body.onkeydown = (event)=>{
		if(event.keyCode==38){
			this.preselect--;
			if(this.preselect<0){
				this.preselect=this.values.length;
			}
			let ownEvent = new Event ("Предвыбор элемента списка",{bubbles: true});
			this.mainElement.dispatchEvent(ownEvent);
			this.updateLines();
		}
		else if(event.keyCode==40){
			this.preselect++;
			if(this.preselect>this.values.length){
				this.preselect=0;
			}
			let ownEvent = new Event ("Предвыбор элемента списка",{bubbles: true});
			this.mainElement.dispatchEvent(ownEvent);
			this.updateLines();
		}
		else if(event.keyCode==13){
			this.select = this.preselect;
			this.updateLines();
			let ownEvent = new Event ("Выбор элемента списка",{bubbles: true});
			this.mainElement.dispatchEvent(ownEvent);
			this.writeInfo();
		}
	}
}

createLines(){
for(let i=0; i<this.values.length; i++){
	this.createLine(i);
}
}

	
}
