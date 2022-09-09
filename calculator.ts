class Calculator {

    calculator: boolean
    decimal: boolean
    sign: string
    number1: string
    number2: string

    displayNumber: HTMLParagraphElement
    displaySign: HTMLParagraphElement
    onButton: HTMLButtonElement 
    ceButton: HTMLButtonElement 
    offButton: HTMLButtonElement 
    equalButton: HTMLButtonElement 
    numberButtons: NodeListOf<HTMLButtonElement>
    signButtons: NodeListOf<HTMLButtonElement>
    
    constructor() {
        
        this.calculator = false
        this.decimal = false
        this.sign = ""
        this.number1 = ""
        this.number2 = ""

        this.displayNumber = document.getElementById("displayNumber") as HTMLParagraphElement
        this.displayNumber.innerHTML = ""

        this.displaySign = document.getElementById("displaySign") as HTMLParagraphElement
        this.displaySign.innerHTML = ""

        this.onButton = document.getElementById("on") as HTMLButtonElement
        this.onButton.onclick = () => !this.calculator ? this._turnOn() : this._reset()
 
        window.onkeydown = (e: KeyboardEvent) => {
            const key: string = e.key;
            (key === "Enter" && !this.calculator) && this._turnOn()
        }
    }
    // TURN ON/OFF/CE
    _turnOn(): void {
        this.calculator = true
        this._reset()
        this._keyboardFunctions()
    }
    _reset(): void {
        if (!this.calculator) return
        this.displayNumber.innerHTML = "0"
        this.displaySign.innerHTML = ""
        this.decimal = true   
        this.sign = ""  
        this.number1 = ""
        this.number2 = ""  
    }
    _turnOff(): void {
        this.calculator = false
        this.displayNumber.innerHTML = ""
        this.displaySign.innerHTML = ""
        this.decimal = false
        this.sign = ""
        this.number1 = ""
        this.number2 = ""
    }
    // KEYBOARD
    _keyboardFunctions(): void { 
        if (!this.calculator) return
        /////////////////// BUTTONS //////////////////////////
        this.ceButton = document.getElementById("ce") as HTMLButtonElement
        this.offButton = document.getElementById("off") as HTMLButtonElement
        this.numberButtons = document.querySelectorAll("[data-number]")    
        this.signButtons = document.querySelectorAll("[data-operation]")
        this.equalButton = document.getElementById("equal") as HTMLButtonElement
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
        window.onkeydown = (e: KeyboardEvent) => {
            const numberPattern: RegExp = /\d+/g
            const key: string = e.key

            key.match(numberPattern) && this._getDisplayNumbers(key)
            
            if (key === "+" || key === "-" || key === "*" || key === "/") {
                this._getNumber1()
                this._getSign(key)
            }
            if (key === "Enter"){
                this._getNumber2()
                this._calculate(this.number1, this.number2)
            }
            if (this.decimal && (key === "," || key ===".")) {
                this.displayNumber.innerHTML === "0" && this._getDisplayNumbers("0")
                this._getDisplayNumbers(".")  
                this.decimal = false    
            }
            key ==="Escape" && this._turnOff()
                
            key ==="Backspace" && this._reset()          
        }  
    }
    // DISPLAYING NUMBERS 
    _getDisplayNumbers(numberPressed: string): void {
        if (!this.calculator) return
        if (this.displayNumber.innerHTML === "0" && numberPressed !== ".") this.displayNumber.innerHTML = numberPressed
        else this.displayNumber.innerHTML += numberPressed
            
        this.displaySign.innerHTML = ""  
    }
    // GETTING NUMBER1 AND NUMBER2
    _getSign(sign: string): void {
        this.sign = sign
        this.displaySign.innerHTML = sign
    }
    _getNumber1():void {
        if (!this.calculator) return
        this.number1 = this.displayNumber.innerHTML
        this.displayNumber.innerHTML=""
        this.number2 = this.displayNumber.innerHTML
        this.decimal = true
    }
    _getNumber2(): void {     
        if (!this.calculator) return  
        this.number2 === "" && (this.number2 = this.displayNumber.innerHTML)
        this.decimal = false  
    }
    // CALCULATING
    _calculate(n1: string, n2: string): void {
        if (!this.calculator) return
        if (this.number2 === "0" && this.sign === "/") this.displayNumber.innerHTML="ERROR"
            
        else {
            this.number1= eval(n1 + this.sign + n2)
            this.displayNumber.innerHTML = this.number1
            this.number1=this.number1.toString()
        }
    }
}
