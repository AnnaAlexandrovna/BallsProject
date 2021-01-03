//перечисляем типы с типом input, для них создается элемент с типом input (<input type:"button"> </input>)
const INPUT_TYPES = ["button", "text", "submit","color"];

  class formMaker{

  	arrOfPart = [];
  	mainParent = document.createElement("div");

    createMainParent(){
    this.mainParent.id = 'formBallInfo';
    this.mainParent.style.position = "absolute";
    this.mainParent.style.right = "2%";
    this.mainParent.style.top = "2%";
    this.mainParent.style.width = "32%";
    this.mainParent.style.background = "#ffffff";
    this.mainParent.style.border = "1px solid #555555";
    this.mainParent.style.opacity = 0.8;
    this.mainParent.style.zIndex = 5000;
    this.mainParent.style.boxShadow = "0px 0px 10px #555555";
    this.mainParent.style.padding = "5px";
    }

    
  	constructor(values){
      if (document.getElementById('formBallInfo')){
      document.getElementById('formBallInfo').remove();
      }
  		this.formContain = values;
      this.createMainParent();
      document.body.appendChild(this.mainParent);
  		this.makeForm(this.formContain, this.mainParent);
      // selectOption('formBallInfo', elem, opt)
  	}


  	makeForm(values, parent){
  		
  		 let partOfForm = this.makePart(values.type);
  	  	for(let val in values){
  	  	//если поле объекта - elements, то в нем содержится информация о дочерних элементах, необходимо рекурсивно вызывать makeForm 
  	  		if (val == 'elements'){
  	  			//поле elements представляет собой массив с дочерними элементами, для каждого элемента надо вызвать метод создания элемента
  	  			//в первоначальном объекте берем контейнер elements и для каждого объекта в нем создаем html элемент
  	  			for (let i = 0; i < values.elements.length; i++){
  	  				//для создания объекта необходимо передать информацию о создаваемом объекте и о его предке
  	  				this.makeForm(values[val][i], partOfForm);
  	  			}
  	  		}
  	  		//если поле объекта - innerHTML, нужно установить свойство innerHTML у элемента
  	  		else if (val == 'innerHTML'){
  	  			partOfForm.innerHTML = values[val];
  	  		} else if (val == 'divName'){
  	  			let part = document.createElement('div');
  	  			part.innerHTML = partOfForm.innerHTML + values[val];
  	  			parent.appendChild(part);
  	  		}
  	  		// оставшиеся параметры устанавливаем как атрибуты
  	  		else if (val != 'innerHTML' && val != 'divName') {
  	  			partOfForm.setAttribute( val, values[val]);
  	  		}
  	  	}
  	  		parent.appendChild(partOfForm);
  	}

  	makePart(type){
  		if (INPUT_TYPES.includes(type)) {
  		//создается элемент с типом input и указанным атрибутом из объекта (например, <input type:"button"></input>)
	      let part = document.createElement('input');
	      return part;
    	} 
    	else if (!type){
    		let part = document.createElement('option');
    		//из массива последний добавленный элемент является родителем
    		//this.arrOfPart[this.arrOfPart.length-1].appendChild(part);
    		return part;
    	}
	    else {
	    //создается элемент с типом из объекта (например, <legend></legend>)
	    	let part = document.createElement(type);
			return part;
	    }
  	}

  	//для установки значения в форму выбора, зная id формы, id выбора (select), innerHTML опций
  	selectOption(formId, elem, opt){
  		//перебираем все опции выбора согласно id формы и id select
  		for (let i = 0; i < document.forms[formId].elements[elem].options.length; i++){
  			//если innerHTML равен указанному в запросе значению, то меняем value селекта
  			if (document.forms[formId].elements[elem].options[i].innerHTML == opt){
  				document.forms[formId].elements[elem].value = document.forms[formId].elements[elem].options[i].value +'';
  				break;
  			}
  		}
  	}


  	getValuesOfOptions(formId){
  		let values = [];
  		//перебираем все элементы формы, согласно id
  		for(let i = 0; i < document.forms[formId].elements.length; i++){
  			//если ввод текста или выбор - надо записать в объект имя свойства и его значение
  			if(document.forms[formId].elements[i].type == 'text' || document.forms[formId].elements[i].type.startsWith('select') || document.forms[formId].elements[i].type.startsWith('color')){
  				let obj = {};
  				//имя свойства совпадает с id
  				obj.name = document.forms[formId].elements[i].id;
  				let val = document.forms[formId].elements[i].value;
  				//для текста сразу записываем значение, для селекта записываем innerHTML по значению
  				if (document.forms[formId].elements[i].type.startsWith('select')){
  					obj.value = document.forms[formId].elements[i].options[val].innerHTML;
  				} else if (document.forms[formId].elements[i].type == 'text'){
  					obj.value = val;
  				} else if (document.forms[formId].elements[i].type == 'color'){
            obj.value = val;
          }
  				values.push(obj);
  			}
  		}
  		//console.log(values);
  		return values;
  	}


  }

