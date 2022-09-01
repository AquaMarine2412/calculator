class Calculator {

    constructor() {
        
        this.calculator = false
        this.decimal = false
        this.sign = ""
        this.number1 = ""
        this.number2 = ""

        this.displayNumber = document.getElementById("displayNumber")
        this.displayNumber.innerHTML = ""

        this.displaySign = document.getElementById("displaySign")
        this.displaySign.innerHTML = ""

        this.onButton = document.getElementById("on")
        this.onButton.onclick = () => !this.calculator ? this._turnOn() : this._reset()
 
        this.keyboard = document.body
        this.keyboard.onkeydown = (e) => (e.key === "Enter" && !this.calculator) && this._turnOn()     
        }
        // TURN ON/OFF/CE
        _turnOn() {
            this.calculator = true
            this._reset()
            this._keyboardFunctions()
        }
        _reset(){
            if (!this.calculator) return
            this.displayNumber.innerHTML = "0"
            this.displaySign.innerHTML = ""
            this.decimal = true   
            this.sign = ""  
            this.number1 = ""
            this.number2 = ""  
        }
        _turnOff(){
            this.calculator = false
            this.displayNumber.innerHTML = ""
            this.displaySign.innerHTML = ""
            this.decimal = false
            this.sign = ""
            this.number1 = ""
            this.number2 = ""
        }
        // KEYBOARD
        _keyboardFunctions(){ 
            if (!this.calculator) return
            /////////////////// BUTTONS //////////////////////////
            this.ceButton = document.getElementById("ce")
            this.offButton = document.getElementById("off")
            this.numberButtons = document.querySelectorAll("[data-number]")     
            this.signButtons = document.querySelectorAll("[data-operation]")
            this.equalButton = document.getElementById("equal")
            //////////////////////////////// FUNCTIONS /////////////////////
            // OFF/CE BUTTONS FUNCTION
            this.ceButton.onclick = () => this._reset()
            this.offButton.onclick = () => this._turnOff()
            // NUMERIC BUTTONS FUNCTION
            this.numberButtons.forEach(button => {button.onclick = () => {
                if(button.innerHTML !== ".") this._getDisplayNumbers(button.innerHTML)
                else { 
                    if (!this.decimal) return
                    this._getDisplayNumbers(button.innerHTML)
                    this.decimal = false
                }
            }})
            // ARITHMETIC OPERATORS FUNCTION
            this.signButtons.forEach(sign => {sign.onclick = () => {
                this._getNumber1() 
                this._getSign(sign.innerHTML)
            }})
            // _calculate BUTTON FUNCTION
            this.equalButton.onclick = () => {          
                    this._getNumber2()
                    this._calculate(this.number1, this.number2)
            }
            // NUM KEY INPUT FUNCTIONS
            this.keyboard.onkeydown = (e) => {
                const numberPattern = /\d+/g
                const key = e.key

                key.match(numberPattern) && this._getDisplayNumbers(key)
                
                if (key === "+" || key === "-" || key === "*" || key === "/") {
                    this._getNumber1()
                    this._getSign(key)
                }
                else if (key === "Enter"){
                    this._getNumber2()
                    this._calculate(this.number1, this.number2)
                }
                else if (this.decimal && (key === "," || key ===".")) {
                    this.displayNumber.innerHTML === "0" && this._getDisplayNumbers(0)
                    this._getDisplayNumbers(".")  
                    this.decimal = false    
                }
                key ==="Escape" && this._turnOff()
                    
                key ==="Backspace" && this._reset()          
            }  
        }
    // DISPLAYING NUMBERS 
    _getDisplayNumbers (numberPressed){
        if (!this.calculator) return
        if (this.displayNumber.innerHTML === "0" && numberPressed !== ".") this.displayNumber.innerHTML = numberPressed

        else this.displayNumber.innerHTML += numberPressed
            
        this.displaySign.innerHTML = ""  
    }
    // GETTING NUMBER1 AND NUMBER2
    _getSign(sign){
        this.sign = sign
        this.displaySign.innerHTML = sign
    }
    _getNumber1(){
        if (!this.calculator) return
        this.number1 = this.displayNumber.innerHTML
        this.displayNumber.innerHTML=""
        this.number2=this.displayNumber.innerHTML
        this.decimal = true
    }
    _getNumber2(){     
        if (!this.calculator) return  
        this.number2 === "" && (this.number2 = this.displayNumber.innerHTML)
        this.decimal = false  
    }
    // CALCULATING
    _calculate(n1, n2){
        if (!this.calculator) return
        if (this.number2 === 0 && this.sign === "/") this.displayNumber.innerHTML="ERROR"
            
        else {
            this.number1= eval(n1 + this.sign + n2)
            this.displayNumber.innerHTML = this.number1
            this.number1=this.number1.toString()
        }
    }
}
